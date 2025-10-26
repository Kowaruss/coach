class VoisinScenario {
    constructor() {
        this.name = "Вуазен";
        this.number = 1;
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
