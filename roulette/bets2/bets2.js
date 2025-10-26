class Bets2Game {
    constructor() {
        this.betsContent = document.getElementById('betsContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
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
        // Выбор варианта 1 или 2
        const variantNumber = Math.random() > 0.5 ? 1 : 2;
        this.currentVariant = variantNumber === 1 ? new Variant1() : new Variant2();
        
        this.currentScenario = this.currentVariant.getRandomScenario();
        
        this.betsContent.innerHTML = `Вариант ${this.currentVariant.number}<br>${this.currentScenario.name}`;
        this.answerElement.innerHTML = '';
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    showAnswer() {
        this.answerElement.innerHTML = `Ответ: Вариант ${this.currentVariant.number}<br>сценарий ${this.currentScenario.number}`;
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.generateExample();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Bets2Game();
});
