class BetTrainer {
    constructor() {
        this.calculator = new BetCalculator();
        this.imageSelector = new ImageSelector();
        this.currentResult = null;
        this.answerShown = false;
        
        // Настройки по умолчанию
        this.settings = {
            roulette: 'all',
            neighbors: 'all'
        };
        
        this.initializeElements();
        this.setupEventListeners();
        this.generateNewExample();
    }
    
    initializeElements() {
        this.rouletteInfo = document.getElementById('rouletteInfo');
        this.imageContainer = document.getElementById('imageContainer');
        this.answer = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalCloseBtn = document.getElementById('modalCloseBtn');
        
        // Элементы настроек
        this.rouletteRadios = document.querySelectorAll('input[name="roulette"]');
        this.neighborsRadios = document.querySelectorAll('input[name="neighbors"]');
    }
    
    setupEventListeners() {
        this.actionBtn.addEventListener('click', () => {
            this.handleActionButton();
        });
        
        // Кнопка настроек
        this.settingsBtn.addEventListener('click', () => {
            this.openSettings();
        });
        
        // Закрытие модалки
        this.modalCloseBtn.addEventListener('click', () => {
            this.closeSettings();
        });
        
        // Закрытие по клику на оверлей
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeSettings();
            }
        });
        
        // Изменение настроек
        this.rouletteRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.roulette = e.target.value;
                this.calculator.setRouletteFilter(this.settings.roulette);
            });
        });
        
        this.neighborsRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.neighbors = e.target.value;
                this.calculator.setNeighborsFilter(this.settings.neighbors);
                this.imageSelector.setNeighborsFilter(this.settings.neighbors);
            });
        });
    }
    
    openSettings() {
        this.modalOverlay.classList.add('show');
    }
    
    closeSettings() {
        this.modalOverlay.classList.remove('show');
        // Генерируем новый пример с новыми настройками
        this.generateNewExample();
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
            <div class="answer-line"><span class="answer-green">Играет по:</span> <span class="answer-black">${playPrice}</span></div>
            <div class="answer-line"><span class="answer-green">Сдача со ставки:</span> <span class="answer-black">${additionalBet}</span></div>
            <div class="answer-line"><span class="answer-green">Сдача с превышений:</span> <span class="answer-black">${excessChange}</span></div>
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
