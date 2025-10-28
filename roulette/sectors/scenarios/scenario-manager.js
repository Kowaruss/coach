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
            new TierCalculationScenario(),
            new OrphalinsCalculationScenario(), // Добавляем Орфалайнс
            new ComingSoonScenario(4) // Остается Шпиль как заглушка
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
