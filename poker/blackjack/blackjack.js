class BlackjackGame {
    constructor() {
        this.blackjackText = document.getElementById('blackjackText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
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
        // Генерируем ставку (от 10 до 500, кратно 5)
        const bet = this.generateBet();
        
        // Формируем текст
        this.blackjackText.innerHTML = `Вычисли выплату по BJ.<br>Ставка ${bet}`;
        
        // Рассчитываем выплату: ставка × 1.5
        const payout = bet * 1.5;
        
        // Формируем ответ
        this.answerElement.innerHTML = `<span class="label">Ответ:</span><br>${this.formatNumber(payout)}`;
        
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    generateBet() {
        // Генерируем число от 10 до 500, кратное 5
        const min = 10;
        const max = 500;
        const step = 5;
        const range = (max - min) / step;
        return min + (Math.floor(Math.random() * (range + 1)) * step);
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.generateExample();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BlackjackGame();
});
