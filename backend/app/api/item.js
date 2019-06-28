const { Router } = require('express');
const ItemTable = require('../item/table');
const AccountItemTable = require('../accountItem/table');
const { authenticatedAccount } = require('./helper');
const { getPublicItems, getPublicItemsToConsole } = require('../item/helper');
const AccountTable = require('../account/table');

const router = new Router();

router.get('/new', (req, res, next) => {
    let accountId, item;

    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {
            accountId = account.id;

            item = req.app.locals.engine.generation.newItem();

            return ItemTable.storeItem(item);
        })
        .then(({ itemId }) => {
            item.itemId = itemId;

            return AccountItemTable.storeAccountItem({ accountId, itemId });
        })
        .then(() => res.json({ item }))
        .catch(error => next(error));
});

router.put('/update', (req, res, next) => {
    const { itemId, name, isPublic, saleValue } = req.body;

    ItemTable.updateItem({ itemId, name, isPublic, saleValue })
        .then(() => res.json({ message: 'successfully updated item' }))
        .catch(err => next(err));
});

router.get('/public-items', (req, res, next) => {
    getPublicItems()
        .then(({ items }) => {
            res.json({ items });
        })
        .catch(error => next(error));
});

router.get('/public-items-to-console', (req, res, next) => {
    getPublicItemsToConsole()
        .then(items => res.json(items))
        .catch(error => next(error));
});

router.post('/buy', (req, res, next) => {
    const { itemId, saleValue } = req.body;
    let buyerId;

    ItemTable.getItem({ itemId })
        .then(item => {
            if (item.saleValue !== saleValue) {
                throw new Error('Sale value is not correct');
            }

            if (!item.isPublic) {
                throw new Error('Item must be public');
            }

            return authenticatedAccount({
                sessionString: req.cookies.sessionString,
            });
        })
        .then(({ account, authenticated }) => {
            if (!authenticated) {
                throw new Error('Unauthenticated');
            }

            if (saleValue > account.balance) {
                throw new Error('Sale value exceeds balance');
            }

            buyerId = account.id;

            return AccountItemTable.getItemAccount({ itemId });
        })
        .then(({ accountId }) => {
            if (accountId === buyerId) {
                throw new Error('Cannot buy your own item!');
            }

            console.log(buyerId);

            const sellerId = accountId;

            Promise.all([
                AccountTable.updateBalance({
                    accountId: buyerId,
                    value: -saleValue,
                }),
                AccountTable.updateBalance({
                    accountId: sellerId,
                    value: saleValue,
                }),
                AccountItemTable.updateItemAccount({
                    itemId,
                    accountId: buyerId,
                }),
                ItemTable.updateItem({
                    itemId,
                    isPublic: false,
                }),
            ]);
        })
        .then(() => res.json({ message: 'success' }))
        .catch(error => next(error));
});

module.exports = router;
