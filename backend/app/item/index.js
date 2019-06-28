const CHARACTERISTICS = require('../../data/characteristics');

const DEFAULT_PROPERTIES = {
    itemId: undefined,
    name: 'unnamed',
    //generationId: undefined,
    isPublic: false,
    saleValue: 0,
    get date() {
        return new Date();
    },
    get randomCharacteristics() {
        const characteristics = [];

        CHARACTERISTICS.forEach(CHAR => {
            const charType = CHAR.type;
            const charValues = CHAR.values;

            const charValue =
                charValues[Math.floor(Math.random() * charValues.length)];

            characteristics.push({ charType, charValue });
        });

        return characteristics;
    },
};

class Item {
    constructor({
        itemId,
        name,
        date,
        characteristics,
        //generationId,
        isPublic,
        saleValue,
    } = {}) {
        (this.itemId = itemId || DEFAULT_PROPERTIES.itemId),
            (this.name = name || DEFAULT_PROPERTIES.name);
        this.date = date || DEFAULT_PROPERTIES.date;
        this.characteristics =
            characteristics || DEFAULT_PROPERTIES.randomCharacteristics;
        //this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
        this.isPublic = isPublic || DEFAULT_PROPERTIES.isPublic;
        this.saleValue = saleValue || DEFAULT_PROPERTIES.saleValue;
    }
}

module.exports = Item;
