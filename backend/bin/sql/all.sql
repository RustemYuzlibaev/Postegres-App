CREATE TABLE account
(
    id SERIAL PRIMARY KEY,
    "usernameHash" CHARACTER(64),
    "passwordHash" CHARACTER(64),
    "sessionId" CHARACTER(36),
    balance INTEGER NOT NULL
);

CREATE TABLE characteristic
(
    id SERIAL PRIMARY KEY,
    "charType" VARCHAR NOT NULL,
    "charValue" VARCHAR NOT NULL
);

CREATE TABLE generation
(
    id SERIAL PRIMARY KEY,
    expiration TIMESTAMP NOT NULL
);

CREATE TABLE item
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    date TIMESTAMP NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "saleValue" INTEGER NOT NULL,
    FOREIGN KEY ("generationId") REFERENCES generation(id)
);



CREATE TABLE itemChar
(
    "charId" INTEGER,
    "itemId" INTEGER,
    FOREIGN KEY ("charId") REFERENCES characteristic(id),
    FOREIGN KEY ("itemId") REFERENCES item(id)
);

CREATE TABLE accountItem
(
    "accountId" INTEGER REFERENCES account(id),
    "itemId" INTEGER REFERENCES item(id),
    PRIMARY KEY ("accountId", "itemId")
);
