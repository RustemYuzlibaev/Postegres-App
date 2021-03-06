const pool = require('../../databasePool');
const { STARTING_BALANCE } = require('../config');

class AccountTable {
    static storeAccount({ usernameHash, passwordHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO account("usernameHash", "passwordHash", balance) 
                VALUES($1, $2, $3)`,
                [usernameHash, passwordHash, STARTING_BALANCE],
                (err, res) => {
                    if (err) return reject(err);

                    resolve();
                },
            );
        });
    }

    static getAccount({ usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, "passwordHash", "sessionId", balance 
                 FROM account 
                 WHERE "usernameHash" = $1`,
                [usernameHash],
                (err, res) => {
                    if (err) return reject(err);

                    resolve({ account: res.rows[0] });
                },
            );
        });
    }

    static updateSessionId({ sessionId, usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE account SET "sessionId" = $1 
                 WHERE "usernameHash" = $2`,
                [sessionId, usernameHash],
                (err, response) => {
                    if (err) return reject(err);

                    resolve();
                },
            );
        });
    }

    static updateBalance({ accountId, value }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `begin;
                    UPDATE account 
                    SET balance = balance + $1 
                    WHERE id = $2;
                 commit;
                 `,
                [value, accountId],
                (err, res) => {
                    if (err) return reject(err);

                    resolve();
                },
            );
        });
    }

    static changeName({ accountId, newName }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE account
                 SET "usernameHash" = $1
                 WHERE id = $2
                `,
                [newName, accountId],
                (err, res) => {
                    if (err) return reject(err);

                    resolve();
                },
            );
        });
    }
}

module.exports = AccountTable;
