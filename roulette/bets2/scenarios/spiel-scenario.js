class SpielScenario {
    constructor() {
        this.name = "Шпиль";
        this.number = 4;
    }
    
    generate() {
        return {
            question: "",
            scenarioName: this.name
        };
    }
    
    getAnswer() {
        return this.number;
    }
}
