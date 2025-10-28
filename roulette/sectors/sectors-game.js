class SectorsGame {
    constructor() {
        this.sectorsText = document.getElementById('sectorsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.scenarioManager = new ScenarioManager();
        this.currentScenario = null;
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.setupModeControls();
        this.init();
    }
    
    init() {
        this.generateExample();
    }
    
    setupModeControls() {
        const modeInputs = document.querySelectorAll('input[name="mode"]');
        modeInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.generateExample();
            });
        });
    }
    
    getSelectedMode() {
        const selectedInput = document.querySelector('input[name="mode"]:checked');
        return selectedInput ? selectedInput.value : 'mixed';
    }
    
    generateExample() {
        const mode = this.getSelectedMode();
        this.currentScenario = this.scenarioManager.getRandomScenario(mode);
        
        const { question, answer } = this.currentScenario.generate();
        
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
