class PokerCombinations {
    constructor() {
        this.timeSlider = document.getElementById('timeSlider');
        this.timeValue = document.getElementById('timeValue');
        this.topCards = document.getElementById('topCards');
        this.bottomGroup1 = document.getElementById('bottomGroup1');
        this.bottomGroup2 = document.getElementById('bottomGroup2');
        this.answer = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
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
    
    displayCards(cards) {
        this.topCards.innerHTML = '';
        this.bottomGroup1.innerHTML = '';
        this.bottomGroup2.innerHTML = '';
        
        // Верхние 2 карты
        for (let i = 0; i < 2; i++) {
            const card = this.createCardElement(cards[i]);
            this.topCards.appendChild(card);
        }
        
        // Нижние 5 карт (3 + 2)
        for (let i = 2; i < 5; i++) {
            const card = this.createCardElement(cards[i]);
            this.bottomGroup1.appendChild(card);
        }
        for (let i = 5; i < 7; i++) {
            const card = this.createCardElement(cards[i]);
            this.bottomGroup2.appendChild(card);
        }
        
        this.currentCards = cards;
        this.answer.classList.remove('show');
        this.answer.textContent = '';
        this.actionBtn.textContent = 'Покажи ответ';
    }
    
    createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        const suitSymbols = {
            'hearts': '♥',
            'diamonds': '♦', 
            'clubs': '♣',
            'spades': '♠'
        };
        
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
        
        return cardElement;
    }
    
    startTimer() {
        const time = parseInt(this.timeSlider.value) * 1000;
        this.timer = setTimeout(() => {
            this.flipCards();
        }, time);
    }
    
    flipCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.add('back');
        });
    }
    
    showCards() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('back');
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
            clearTimeout(this.timer);
            this.generateNewExample();
        }
    }
    
    getRankValue(rank) {
        if (rank === 'A') return 14;
        if (rank === 'K') return 13;
        if (rank === 'Q') return 12;
        if (rank === 'J') return 11;
        return parseInt(rank);
    }
}
