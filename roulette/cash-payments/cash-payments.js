class CashPaymentsGame {
    constructor() {
        this.cashPaymentsText = document.getElementById('cashPaymentsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.xValues = [2, 5, 25, 50, 125];
        
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
        // Z - случайное число от 170 до 350
        const z = Math.floor(Math.random() * 181) + 170; // 170-350
        
        // X - случайное значение из массива
        const x = this.xValues[Math.floor(Math.random() * this.xValues.length)];
        
        // Y - случайное число от 199 до 340, умноженное на X и округленное
        const yRaw = Math.floor(Math.random() * 142) + 199; // 199-340
        const y = this.roundY(yRaw * x, x);
        
        // Формируем текст
        this.cashPaymentsText.textContent = `Выплата ${z} цвет по ${x} через ${y}`;
        
        // Рассчитываем ответ
        const answerValue = z - (y / x);
        
        // Формируем ответ
        this.answerElement.innerHTML = `<span class="label">Ответ:</span><br>${z} – (${y} / ${x}) = ${this.formatNumber(answerValue.toFixed(2))}`;
        
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    roundY(y, x) {
        if (x === 2 || x === 5) {
            return Math.floor(y / 50) * 50; // до ближайшего кратного 50 в меньшую сторону
        } else if (x === 25 || x === 50) {
            return Math.floor(y / 100) * 100; // до ближайшего кратного 100 в меньшую сторону
        } else if (x === 125) {
            return Math.floor(y / 500) * 500; // до ближайшего кратного 500 в меньшую сторону
        }
        return y;
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
    new CashPaymentsGame();
});
