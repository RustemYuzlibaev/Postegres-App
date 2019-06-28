CREATE TABLE item(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(64),
    date            TIMESTAMP NOT NULL,
    "isPublic"      BOOLEAN NOT NULL, 
    "saleValue"     INTEGER NOT NULL,
    FOREIGN KEY ("generationId") REFERENCES generation(id)
)