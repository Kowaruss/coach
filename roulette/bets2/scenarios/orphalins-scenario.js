class OrphalinsScenario {
    constructor() {
        this.name = "Орфалайнс";
        this.number = 3;
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
