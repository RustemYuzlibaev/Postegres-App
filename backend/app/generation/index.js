const { REFRESH_RATE, SECONDS } = require('../config');
const Item = require('../item');

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }

    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));
        const msUtilExpiration =
            Math.random() < 0.5
                ? refreshRate - expirationPeriod
                : refreshRate + expirationPeriod;

        return new Date(Date.now() + msUtilExpiration);
    }

    newItem() {
        if (Date.now() > this.expiration) {
            throw new Error(`This generation expired on ${this.expiration}`);
        }

        return new Item({ generationId: this.generationId });
    }
}

module.exports = Generation;
