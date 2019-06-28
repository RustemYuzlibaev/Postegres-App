const pool = require('../../databasePool');
const ItemCharTable = require('../itemChar/table');

class ItemTable {
    static storeItem(item) {
        const { name, date, isPublic, saleValue } = item;

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO item(date, name, "isPublic", "saleValue") 
                VALUES($1, $2, $3, $4) RETURNING id`,
                [date, name, isPublic, saleValue],
                (err, res) => {
                    if (err) return reject(err);

                    const itemId = res.rows[0].id;

                    Promise.all(
                        item.characteristics.map(({ charType, charValue }) => {
                            return ItemCharTable.storeItemChar({
                                itemId,
                                charType,
                                charValue,
                            });
                        }),
                    )
                        .then(() => resolve({ itemId }))
                        .catch(err => reject(err));
                },
            );
        });
    }

    static getItem({ itemId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT date, name, "isPublic", "saleValue" 
                 FROM item 
                 WHERE item.id = $1`,
                [itemId],
                (err, res) => {
                    if (err) return reject(err);

                    if (res.rows.length === 0)
                        return reject(new Error('No item'));

                    resolve(res.rows[0]);
                },
            );
        });
    }

    static updateItem({ itemId, name, isPublic, saleValue }) {
        const settingMap = { name, isPublic, saleValue };

        const validQueries = Object.entries(settingMap).filter(
            ([settingKey, settingValue]) => {
                if (settingValue !== undefined) {
                    return new Promise((resolve, reject) => {
                        pool.query(
                            `UPDATE item 
                            SET "${settingKey}" = $1
                            WHERE id = $2`,
                            [settingValue, itemId],
                            (err, res) => {
                                if (err) return reject(err);

                                resolve();
                            },
                        );
                    });
                }
            },
        );

        return Promise.all(validQueries);
    }
}

module.exports = ItemTable;
