class ScenarioManager {
    getRandomScenario() {
        const mode = this.getSelectedMode();
        
        if (mode === 'playsBy') {
            console.log('Selected: Variant 1 (100%) - играет по');
            return new SectorToStakeScenario();
        } 
        else if (mode === 'playsOn') {
            console.log('Selected: Variant 2 (100%) - играет на');
            return this.getRandomVariant2Scenario();
        }
        else { // mixed
            const isVariant1 = Math.random() > 0.5;
            if (isVariant1) {
                console.log('Selected: Variant 1 (50%) - вперемешку');
                return new SectorToStakeScenario();
            } else {
                console.log('Selected: Variant 2 (50%) - вперемешку');
                return this.getRandomVariant2Scenario();
            }
        }
    }
    
    getSelectedMode() {
        const selected = document.querySelector('input[name="mode"]:checked');
        return selected ? selected.value : 'mixed';
    }
    
    getRandomVariant2Scenario() {
        const scenarioIndex = Math.floor(Math.random() * 4);
        switch(scenarioIndex) {
            case 0: 
                return new VoisinCalculationScenario();
            case 1: 
                return new TierCalculationScenario();
            case 2: 
                return new ComingSoonScenario(3);
            case 3: 
                return new ComingSoonScenario(4);
        }
    }
}
