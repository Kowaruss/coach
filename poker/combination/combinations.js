class PokerCombinations {
    constructor() {
        this.timeSlider = document.getElementById('timeSlider');
        this.timeValue = document.getElementById('timeValue');
        this.topCards = document.getElementById('topCards');
        this.middleGroup1 = document.getElementById('middleGroup1');
        this.middleGroup2 = document.getElementById('middleGroup2');
        this.answer = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.suits = ['♥', '♦', '♣', '♠'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = [];
        
        this.setupEventListeners();
        this.generateNewExample();
    }
    
    setupEventListeners() {
        this.timeSlider.addEventListener('input', () => {
            this.timeValue.textContent = this.timeSlider.value;
        });
        
        this.actionBtn.addEventListener('click', () => {
            this.handleActionButton();
        });
    }
    
    generateDeck() {
        this.deck = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.deck.push({ rank, suit });
            }
        }
    }
    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    generateNewExample() {
        this.generateDeck();
        this.shuffleDeck();
        
        const selectedCards = this.deck.slice(0, 7);
        this.displayCards(selectedCards);
        this.startTimer();
    }
    
    displayCards(cards) {
        // Очищаем предыдущие карты
        this.topCards.innerHTML = '';
        this.middleGroup1.innerHTML = '';
        this.middleGroup2.innerHTML = '';
        
        // Верхние 2 карты
        for (let i = 0; i < 2; i++) {
            const card = this.createCardElement(cards[i]);
            this.topCards.appendChild(card);
        }
        
        // Средние 5 карт (3 + 2)
        for (let i = 2; i < 5; i++) {
            const card = this.createCardElement(cards[i]);
            this.middleGroup1.appendChild(card);
        }
        for (let i = 5; i < 7; i++) {
            const card = this.createCardElement(cards[i]);
            this.middleGroup2.appendChild(card);
        }
        
        this.currentCards = cards;
        this.answer.classList.remove('show');
        this.answer.textContent = '';
    }
    
    createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = `${card.rank}${card.suit}`;
        return cardElement;
    }
    
    startTimer() {
        const time = parseInt(this.timeSlider.value) * 1000;
        
        setTimeout(() => {
            this.flipCards();
        }, time);
    }
    
    flipCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.add('back');
            card.textContent = '🂠';
        });
    }
    
    showCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach((card, index) => {
            card.classList.remove('back');
            const cardData = this.currentCards[index];
            card.textContent = `${cardData.rank}${cardData.suit}`;
        });
    }
    
    handleActionButton() {
        if (this.actionBtn.textContent === 'Покажи ответ') {
            this.showCards();
            const combination = this.detectCombination(this.currentCards);
            this.answer.textContent = combination;
            this.answer.classList.add('show');
            this.actionBtn.textContent = 'Следующий пример';
        } else {
            this.generateNewExample();
            this.actionBtn.textContent = 'Покажи ответ';
        }
    }
    
    detectCombination(cards) {
        // Заглушка - здесь будет логика определения покерных комбинаций
        // Пока возвращаем случайную комбинацию для демонстрации
        const combinations = [
            "Нет игры",
            "Пара двоек",
            "Две пары",
            "Сет троек", 
            "Стрит",
            "Флеш",
            "Фулл-хаус",
            "Каре",
            "Стрит-флеш",
            "Флеш-рояль"
        ];
        
        return combinations[Math.floor(Math.random() * combinations.length)];
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PokerCombinations();
});
