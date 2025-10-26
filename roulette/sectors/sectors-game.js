console.log('=== SECTORS DEBUG ===');
console.log('sectors-game.js loaded');

// Проверка загрузки зависимостей
console.log('ScenarioManager:', typeof ScenarioManager);
console.log('SectorToStakeScenario:', typeof SectorToStakeScenario);
console.log('VoisinCalculationScenario:', typeof VoisinCalculationScenario);

// Проверка DOM
console.log('sectorsText:', document.getElementById('sectorsText'));
console.log('actionBtn:', document.getElementById('actionBtn'));

// УБРАТЬ ЭТУ ЧАСТЬ:
// class SectorsGame {
//     // остальной код...

// ОСТАВИТЬ ТОЛЬКО ЭТО:
class SectorsGame {
    constructor() {
        this.sectorsText = document.getElementById('sectorsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.scenarioManager = new ScenarioManager();
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.init();
    }
    
    init() {
        this.generateExample();
    }
    
    generateExample() {
        const scenario = this.scenarioManager.getRandomScenario();
        const { question, answer } = scenario.generate();
        
        this.sectorsText.innerHTML = question;
        this.answerElement.innerHTML = answer;
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.generateExample();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SectorsGame();
});
