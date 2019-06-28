const Generation = require('./index');
const GenerationTable = require('./table');

class GenerationEngine {
    constructor() {
        this.generation = null;
        this.timer = null;
    }

    start() {
        this.buildNewGeneration();
    }

    stop() {
        clearTimeout(this.timer);
    }

    clearTableEvery30sec() {
        GenerationTable.clearTable();
    }

    buildNewGeneration() {
        const generation = new Generation();

        GenerationTable.storeGeneration(generation)
            .then(({ generationId }) => {
                this.generation = generation;
                this.generation.generationId = generationId;

                console.log('new generation', this.generation);

                setTimeout(this.clearTableEvery30sec, 30000);

                this.timer = setTimeout(
                    () => this.buildNewGeneration(),
                    this.generation.expiration.getTime() - Date.now(),
                );
            })
            .catch(error => console.error(error));
    }
}

module.exports = GenerationEngine;
