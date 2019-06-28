const { Router } = require('express');
const AccountTable = require('../account/table');
const AccountItemTable = require('../accountItem/table');
const { hash } = require('../account/helper');
const Session = require('../account/session');
const { setSession, authenticatedAccount } = require('./helper');
const { getItemWithCharacteristics } = require('../item/helper');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
            if (!account) {
                return AccountTable.storeAccount({
                    usernameHash,
                    passwordHash,
                });
            } else {
                const err = new Error('This username has already been taken');

                err.statusCode = 409;

                throw err;
            }
        })
        .then(() => {
            return setSession({ username, res });
        })
        .then(({ message }) => res.json({ message }))
        .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
            if (account && account.passwordHash === hash(password)) {
                const { sessionId } = account;

                return setSession({ username, res, sessionId });
            } else {
                const err = new Error('Incorrect username/password');

                err.statusCode = 400;

                throw err;
            }
        })
        .then(({ message }) => res.json({ message }))
        .catch(err => next(err));
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username),
    })
        .then(() => {
            res.clearCookie('sessionString');
            res.json({ message: 'successful logout' });
        })
        .catch(error => next(error));
});

router.get('/authenticated', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ authenticated }) => res.json({ authenticated }))
        .catch(error => next(error));
});

router.get('/items', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {
            return AccountItemTable.getAccountItems({
                accountId: account.id,
            });
        })
        .then(({ accountItems }) => {
            return Promise.all(
                accountItems.map(accountItem => {
                    return getItemWithCharacteristics({
                        itemId: accountItem.itemId,
                    });
                }),
            );
        })
        .then(items => {
            res.json({ items });
        })

        .catch(err => next(err));
});

router.get('/info', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account, username }) => {
            res.json({ info: { balance: account.balance, username } });
        })
        .catch(error => next(error));
});

router.post('/settings', (req, res, next) => {
    let { currentUsername, nextUsername } = req.body;

    usernameHash = hash(currentUsername);
    nextUsername = hash(nextUsername);

    AccountTable.getAccount({ usernameHash }).then(({ account }) => {
        if (!account) {
            const err = new Error('Such user not found');
            err.statusCode = 500;
            throw err;
        } else {
            return AccountTable.changeName({
                accountId: account.id,
                newName: nextUsername,
            });
        }
    });
});

module.exports = router;
