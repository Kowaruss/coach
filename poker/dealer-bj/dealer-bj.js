class DealerBJTrainer {
    constructor() {
        this.timeSlider = document.getElementById('timeSlider');
        this.timeValue = document.getElementById('timeValue');
        this.dealerCards = document.getElementById('dealerCards');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.result = document.getElementById('result');
        
        this.deck = [];
        this.dealerHand = [];
        this.isRunning = false;
        this.intervalId = null;
        this.currentInterval = 1000;
        
        this.setupEventListeners();
        this.resetGame();
    }
    
    setupEventListeners() {
        this.timeSlider.addEventListener('input', () => {
            this.timeValue.textContent = this.timeSlider.value;
            this.currentInterval = parseFloat(this.timeSlider.value) * 1000;
        });
        
        this.startBtn.addEventListener('click', () => {
            this.startGame();
        });
        
        this.stopBtn.addEventListener('click', () => {
            this.stopGame();
        });
    }
    
    generateDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        this.deck = [];
        // 6 колод
        for (let deck = 0; deck < 6; deck++) {
            for (let suit of suits) {
                for (let rank of ranks) {
                    this.deck.push({ rank, suit });
                }
            }
        }
        this.shuffleDeck();
    }
    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    startGame() {
        if (this.isRunning) return;
        
        this.resetGame();
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        
        // Раздаем первую карту дилеру
        this.addCardToDealer();
        
        // Запускаем интервал добавления карт
        this.intervalId = setInterval(() => {
            this.addCardToDealer();
        }, this.currentInterval);
    }
    
    stopGame() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        clearInterval(this.intervalId);
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        this.showResult();
    }
    
    addCardToDealer() {
        if (this.deck.length === 0) {
            this.generateDeck();
        }
        
        const card = this.deck.pop();
        this.dealerHand.push(card);
        this.displayDealerCards();
        
        const totalScore = this.calculateScore();
        
        // Автоматическая остановка при переборе
        if (totalScore > 21) {
            setTimeout(() => {
                this.stopGame();
            }, 100);
        }
    }
    
    calculateScore() {
        let score = 0;
        let aces = 0;
        
        for (let card of this.dealerHand) {
            if (card.rank === 'A') {
                aces++;
                score += 11;
            } else if (['K', 'Q', 'J'].includes(card.rank)) {
                score += 10;
            } else {
                score += parseInt(card.rank);
            }
        }
        
        // Корректировка тузов
        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }
        
        return score;
    }
    
    displayDealerCards() {
        this.dealerCards.innerHTML = '';
        
        this.dealerHand.forEach((card) => {
            const cardElement = this.createCardElement(card);
            this.dealerCards.appendChild(cardElement);
        });
    }
    
    createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card new-card';
        
        const suitSymbols = {
            'hearts': '♥',
            'diamonds': '♦', 
            'clubs': '♣',
            'spades': '♠'
        };
        
        // ВСЕ карты открыты (рубашкой вниз)
        cardElement.innerHTML = `
            <div class="card-content">
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit">${suitSymbols[card.suit]}</div>
            </div>
        `;
        
        if (card.suit === 'hearts' || card.suit === 'diamonds') {
            cardElement.classList.add('red');
        } else {
            cardElement.classList.add('black');
        }
        
        // Убираем анимацию после завершения
        setTimeout(() => {
            cardElement.classList.remove('new-card');
        }, 300);
        
        return cardElement;
    }
    
    showResult() {
        const totalScore = this.calculateScore();
        
        if (totalScore > 21) {
            this.result.textContent = 'Перебор!';
            this.result.className = 'result fail';
        } else if (totalScore >= 17 && totalScore <= 21) {
            this.result.textContent = 'Успех!';
            this.result.className = 'result success';
        } else {
            this.result.textContent = 'Можно было набрать еще';
            this.result.className = 'result fail';
        }
    }
    
    resetGame() {
        this.dealerHand = [];
        this.generateDeck();
        this.displayDealerCards();
        this.result.textContent = '';
        this.result.className = 'result';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new DealerBJTrainer();
});
