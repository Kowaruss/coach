// Функция для форматирования чисел с разделителями тысяч
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

class ComplitsGame {
    constructor() {
        this.complitsText = document.getElementById('complitsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.bets = [25, 50, 75, 100, 200];
        this.dozensMultipliers = {
            1: 136,
            2: 140, 
            3: 120
        };
        this.sixLineMultipliers = {
            'first': 46,
            'last': 30,
            'other': 50
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
        
        // Случайная ставка из массива
        const bet = this.bets[Math.floor(Math.random() * this.bets.length)];
        
        let complitText = '';
        let stake = 0;
        let payoutText = '';
        
        if (randomNumber === 1) {
            // Комплит дюжины
            const complit = Math.floor(Math.random() * 3) + 1;
            complitText = `Комплит ${complit} дюжины<br>по ${bet}`;
            stake = formatNumber(this.dozensMultipliers[complit] * bet);
            payoutText = `комплит выпавшего номера по ${bet}`;
        } else {
            // Комплит six line
            const sixLineType = this.getRandomSixLineType();
            complitText = `Комплит six line<br>по ${bet}`;
            
            if (sixLineType === 'first') {
                stake = formatNumber(this.sixLineMultipliers.first * bet);
            } else if (sixLineType === 'last') {
                stake = formatNumber(this.sixLineMultipliers.last * bet);
            } else {
                stake = formatNumber(this.sixLineMultipliers.other * bet);
            }
            
            payoutText = `комплит выпавшего номера по ${bet}`;
        }
        
        // Формируем текст
        this.complitsText.innerHTML = complitText;
        
        // Формируем ответ
        this.answerElement.innerHTML = `<span class="label">Ставка:</span> ${stake}<br><span class="label">Выплата:</span> ${payoutText}`;
        
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    getRandomSixLineType() {
        const types = ['first', 'last', 'other', 'other', 'other', 'other'];
        return types[Math.floor(Math.random() * types.length)];
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
