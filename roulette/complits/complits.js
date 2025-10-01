class ComplitsGame {
    constructor() {
        this.complitsText = document.getElementById('complitsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.bets = [25, 50, 75, 100, 200];
        this.multipliers = {
            1: 136,
            2: 140, 
            3: 120
        };
        
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
        // Случайное число от 1 до 7 (выпавший номер)
        const randomNumber = Math.floor(Math.random() * 7) + 1;
        
        // Случайный комплит от 1 до 3
        const complit = Math.floor(Math.random() * 3) + 1;
        
        // Случайная ставка из массива
        const bet = this.bets[Math.floor(Math.random() * this.bets.length)];
        
        // Формируем текст
        this.complitsText.innerHTML = `Комплит ${complit} дюжины<br>по ${bet}`;
        
        // Рассчитываем ставку
        const stake = Math.round(this.multipliers[complit] * bet * 100) / 100;
        
        // Формируем ответ
        this.answerElement.innerHTML = `<span class="label">Ставка:</span> ${stake}<br><span class="label">Выплата:</span> комплит выпавшего номера по ${bet}`;
        
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
    new ComplitsGame();
});
