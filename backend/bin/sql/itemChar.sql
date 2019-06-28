CREATE TABLE itemChar
(
    "charId" INTEGER,
    "itemId" INTEGER,
    FOREIGN KEY ("charId") REFERENCES characteristic(id),
    FOREIGN KEY ("itemId") REFERENCES item(id)
);