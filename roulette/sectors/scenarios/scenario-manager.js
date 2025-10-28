class ScenarioManager {
    constructor() {
        this.stakeScenarios = [ // "играет по" - 4 сценария
            new VoisinStakeScenario(),
            new TierStakeScenario(),
            new OrphalinsStakeScenario(),
            new SpielStakeScenario()
        ];
        
        this.calculationScenarios = [ // "играет на" - 4 сценария
            new VoisinCalculationScenario(),
            new TierCalculationScenario(),
            new ComingSoonScenario(3), // Пока заглушки
            new ComingSoonScenario(4)
        ];
    }
    
    getRandomScenario(mode = 'mixed') {
        if (mode === 'playsBy') {
            return this.stakeScenarios[Math.floor(Math.random() * this.stakeScenarios.length)];
        } else if (mode === 'playsOn') {
            return this.calculationScenarios[Math.floor(Math.random() * this.calculationScenarios.length)];
        } else {
            const allScenarios = [...this.stakeScenarios, ...this.calculationScenarios];
            return allScenarios[Math.floor(Math.random() * allScenarios.length)];
        }
    }
}
