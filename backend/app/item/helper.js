const pool = require('../../databasePool');
const ItemTable = require('./table');
const Item = require('./index');

const getItemWithCharacteristics = ({ itemId }) => {
    return Promise.all([
        ItemTable.getItem({ itemId }),
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "charType", "charValue" 
                  FROM characteristic
                  INNER JOIN itemChar ON characteristic.id = itemChar."charId"
                  WHERE itemChar."itemId" = $1`,
                [itemId],
                (err, res) => {
                    if (err) return reject(err);

                    resolve(res.rows);
                },
            );
        }),
    ])
        .then(([item, itemChars]) => {
            return new Item({
                ...item,
                // name: item.name,
                // date: item.date,
                // generationId: item.generationId,
                itemId,
                characteristics: itemChars,
            });
        })
        .catch(err => console.error(err));
};

const getPublicItems = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            // `SELECT id FROM item
            //  WHERE "isPublic" = TRUE`
            `SELECT * FROM get_public_items`,
            (err, res) => {
                if (err) return reject(err);

                const publicItemRows = res.rows;

                Promise.all(
                    publicItemRows.map(({ id }) =>
                        getItemWithCharacteristics({ itemId: id }),
                    ),
                )
                    .then(items => resolve({ items }))
                    .catch(error => reject(error));
            },
        );
    });
};

const getPublicItemsToConsole = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM showPublicItems()`, (err, res) => {
            if (err) return reject(err);

            resolve(res.rows);
        });
    });
};

module.exports = {
    getItemWithCharacteristics,
    getPublicItems,
    getPublicItemsToConsole,
};
