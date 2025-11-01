class BetTrainer {
    constructor() {
        this.calculator = new BetCalculator();
        this.imageSelector = new ImageSelector();
        this.currentResult = null;
        this.answerShown = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.generateNewExample();
    }
    
    initializeElements() {
        this.rouletteInfo = document.getElementById('rouletteInfo');
        this.imageContainer = document.getElementById('imageContainer');
        this.answer = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
    }
    
    setupEventListeners() {
        this.actionBtn.addEventListener('click', () => {
            this.handleActionButton();
        });
    }
    
    generateNewExample() {
        this.currentResult = this.calculator.calculateBet();
        this.currentResult.imageName = this.imageSelector.getRandomImage(this.currentResult.neighborCount);
        
        this.displayQuestion();
        this.hideAnswer();
        this.actionBtn.classList.remove('next-example');
        this.actionBtn.classList.add('show-answer');
    }
    
    displayQuestion() {
        const { roulette, neighborCount, totalBet } = this.currentResult;
        
        this.rouletteInfo.innerHTML = `
            <div class="roulette-line">Рулетка <span class="roulette-red">${roulette.name}</span></div>
            <div class="bet-line">Ставка ${totalBet} на ${neighborCount} соседей</div>
        `;
        
        if (this.currentResult.imageName) {
            this.imageContainer.innerHTML = `
                <img src="${this.imageSelector.getImagePath(this.currentResult.imageName)}" 
                     alt="Схема ставок для ${neighborCount} соседей">
            `;
        }
    }
    
    displayAnswer() {
        const { roulette, playPrice, additionalBet, neighborCount, imageName } = this.currentResult;
        
        const excessChange = this.calculator.calculateExcessChange(
            roulette, playPrice, neighborCount, imageName
        );
        
        this.answer.innerHTML = `
            <div class="answer-line answer-green">Играет по: ${playPrice}</div>
            <div class="answer-line answer-green">Сдача со ставки: ${additionalBet}</div>
            <div class="answer-line answer-green">Сдача с превышений: ${excessChange}</div>
        `;
        
        this.answer.classList.add('show');
    }
    
    hideAnswer() {
        this.answer.classList.remove('show');
        this.answer.innerHTML = '';
        this.answerShown = false;
        this.actionBtn.textContent = 'Покажи ответ';
    }
    
    handleActionButton() {
        if (!this.answerShown) {
            this.displayAnswer();
            this.answerShown = true;
            this.actionBtn.textContent = 'Следующий пример';
            this.actionBtn.classList.remove('show-answer');
            this.actionBtn.classList.add('next-example');
        } else {
            this.generateNewExample();
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new BetTrainer();
});
