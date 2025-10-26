class ScenarioManager {
    constructor() {
        this.scenarios = [
            new SectorToStakeScenario(),    // Сценарий 1 (старый)
            new VoisinCalculationScenario(), // Сценарий 2.1
            new TierCalculationScenario(),   // Сценарий 2.2
            new ComingSoonScenario(3),       // Сценарий 3
            new ComingSoonScenario(4)        // Сценарий 4
        ];
    }
    
    getRandomScenario() {
        return this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
    }
}
