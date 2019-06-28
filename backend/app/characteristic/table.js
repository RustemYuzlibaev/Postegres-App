const pool = require('../../databasePool');

class CharTable {
    static getCharId({ charType, charValue }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT id FROM characteristic WHERE "charType" = $1 AND "charValue" = $2',
                [charType, charValue],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve({ charId: res.rows[0].id });
                },
            );
        });
    }
}

module.exports = CharTable;
