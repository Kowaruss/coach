class Variant2 {
    constructor() {
        this.number = 2;
        this.scenarios = [
            new VoisinScenario(),
            new TierScenario(),
            new OrphalinsScenario(), 
            new SpielScenario()
        ];
    }
    
    getRandomScenario() {
        return this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
    }
}
