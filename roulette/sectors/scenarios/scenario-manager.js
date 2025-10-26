class ScenarioManager {
    constructor() {
        console.log('=== SCENARIO MANAGER DEBUG ===');
    }
    
    getRandomScenario() {
        // Уровень 1: Вариант 1 (50%) или Вариант 2 (50%)
        const isVariant1 = Math.random() > 0.5;
        
        if (isVariant1) {
            console.log('Selected: Variant 1 (SectorToStakeScenario)');
            return new SectorToStakeScenario(); // Старый сценарий
        } else {
            // Уровень 2: В варианте 2 выбираем один из 4 сценариев (по 25%)
            const scenarioIndex = Math.floor(Math.random() * 4);
            let scenario;
            
            switch(scenarioIndex) {
                case 0:
                    scenario = new VoisinCalculationScenario();
                    break;
                case 1:
                    scenario = new TierCalculationScenario();
                    break;
                case 2:
                    scenario = new ComingSoonScenario(3);
                    break;
                case 3:
                    scenario = new ComingSoonScenario(4);
                    break;
            }
            
            console.log('Selected: Variant 2, Scenario', scenarioIndex + 1, scenario.constructor.name);
            return scenario;
        }
    }
}
