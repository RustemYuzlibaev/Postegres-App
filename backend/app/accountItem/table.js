const pool = require('../../databasePool');

class AccountItemTable {
    static storeAccountItem({ accountId, itemId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO accountItem("accountId", "itemId") VALUES($1, $2)',
                [accountId, itemId],
                (err, res) => {
                    if (err) return reject(err);

                    resolve();
                },
            );
        });
    }

    static getAccountItems({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT "itemId" FROM accountItem WHERE "accountId" = $1',
                [accountId],
                (err, res) => {
                    if (err) return reject(err);

                    resolve({ accountItems: res.rows });
                },
            );
        });
    }

    static async getItemAccount({ itemId }) {
        try {
            const res = await pool.query(
                `SELECT "accountId" FROM accountItem
                    WHERE "itemId" = $1`,
                [itemId],
            );
            console.log(res.rows[0]);

            return { accountId: res.rows[0].accountId };
        } catch (error) {
            console.log(error);
        }
    }

    static async updateItemAccount({ itemId, accountId }) {
        try {
            const res = await pool.query(
                `UPDATE accountItem 
                 SET "accountId" = $1 
                 WHERE "itemId" = $2`,
                [accountId, itemId],
            );
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AccountItemTable;
