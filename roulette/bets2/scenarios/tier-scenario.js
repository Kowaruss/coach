class TierScenario {
    constructor() {
        this.name = "Тьер";
        this.number = 2;
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
