class ComingSoonScenario {
    constructor(scenarioNumber) {
        this.scenarioNumber = scenarioNumber;
    }
    
    generate() {
        return {
            question: `Выпал сценарий ${this.scenarioNumber}`,
            answer: `Сценарий ${this.scenarioNumber} в разработке`
        };
    }
}
