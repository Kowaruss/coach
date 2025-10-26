class Bets2Game {
    constructor() {
        this.betsContent = document.getElementById('betsContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.variantManager = new VariantManager();
        this.currentVariant = null;
        this.currentScenario = null;
        
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
        this.currentVariant = this.variantManager.getRandomVariant();
        this.currentScenario = this.currentVariant.getRandomScenario();
        
        const { question, scenarioName } = this.currentScenario.generate();
        this.betsContent.innerHTML = `Вариант ${this.currentVariant.number}<br>${scenarioName}`;
        this.answerElement.innerHTML = '';
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    showAnswer() {
        const answer = this.currentScenario.getAnswer();
        this.answerElement.innerHTML = `Ответ: Вариант ${this.currentVariant.number}<br>сценарий ${answer}`;
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.generateExample();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Bets2Game();
});
