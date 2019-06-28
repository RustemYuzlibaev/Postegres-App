const pool = require('../databasePool');
const CHARACTERISTICS = require('../data/characteristics');

CHARACTERISTICS.forEach(CHAR => {
    const charType = CHAR.type;
    const charValues = CHAR.values;

    charValues.forEach(charValue => {
        pool.query(
            `INSERT INTO characteristic("charType", "charValue") VALUES($1, $2) RETURNING id`,
            [charType, charValue],
            (err, res) => {
                if (err) console.error(err);

                const charId = res.rows[0].id;

                console.log(`Inserted char - id: ${charId}`);
            },
        );
    });
});
