CREATE TABLE accountItem
(
    "accountId" INTEGER REFERENCES account(id),
    "itemId" INTEGER REFERENCES item(id),
    PRIMARY KEY ("accountId", "itemId")
);