const pool = require('../../databasePool');
const TraitTable = require('../characteristic/table');

class ItemCharTable {
    static storeItemChar({ itemId, charType, charValue }) {
        return new Promise((resolve, reject) => {
            TraitTable.getCharId({ charType, charValue }).then(({ charId }) => {
                pool.query(
                    'INSERT INTO itemChar("charId", "itemId") VALUES ($1, $2)',
                    [charId, itemId],
                    (err, res) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    },
                );
            });
        });
    }
}

module.exports = ItemCharTable;
