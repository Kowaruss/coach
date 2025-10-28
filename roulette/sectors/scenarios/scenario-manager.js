class ScenarioManager {
    constructor() {
        this.stakeScenarios = [
            new VoisinStakeScenario(),
            new TierStakeScenario(),
            new OrphalinsStakeScenario(),
            new SpielStakeScenario()
        ];
        
        this.calculationScenarios = [
            new VoisinCalculationScenario(),
            new TierCalculationScenario()
        ];
        
        this.comingSoonScenarios = [
            new ComingSoonScenario(3),
            new ComingSoonScenario(4)
        ];
    }
    
    getRandomScenario(mode = 'mixed') {
        if (mode === 'playsBy') {
            // Только "играет по" сценарии
            return this.stakeScenarios[Math.floor(Math.random() * this.stakeScenarios.length)];
        } else if (mode === 'playsOn') {
            // Только "играет на" сценарии
            return this.calculationScenarios[Math.floor(Math.random() * this.calculationScenarios.length)];
        } else {
            // Вперемешку все сценарии
            const allScenarios = [...this.stakeScenarios, ...this.calculationScenarios, ...this.comingSoonScenarios];
            return allScenarios[Math.floor(Math.random() * allScenarios.length)];
        }
    }
}
