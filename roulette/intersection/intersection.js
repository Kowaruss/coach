class IntersectionGame {
    constructor() {
        this.content = document.getElementById('content');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Варианты с x,y и коэффициентами
        this.variants = [
            { id: 1, x: 4, y: 6, coefficient: 15 },
            { id: 2, x: 5, y: 6, coefficient: 25 },
            { id: 3, x: 5, y: 9, coefficient: 10 },
            { id: 4, x: 4, y: 9, coefficient: 6 },
            { id: 5, x: 5, y: 8, coefficient: 16 },
            { id: 6, x: 6, y: 9, coefficient: 12 },
            { id: 7, x: 34, y: 36, coefficient: 9 },
            { id: 8, x: 35, y: 36, coefficient: 15 },
            { id: 9, x: 1, y: 3, coefficient: 13 },
            { id: 10, x: 1, y: 2, coefficient: 22 },
            { id: 11, x: 0, y: 1, coefficient: 9 },
            { id: 12, x: 0, y: 2, coefficient: 12 }
        ];
        
        // Возможные значения для z и h
        this.betValues = [25, 50, 75, 100];
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.init();
    }
    
    init() {
        this.nextExample();
    }
    
    getRandomBetValues() {
        let z, h;
        do {
            z = this.betValues[Math.floor(Math.random() * this.betValues.length)];
            h = this.betValues[Math.floor(Math.random() * this.betValues.length)];
        } while (z + h <= 100);
        
        return { z, h };
    }
    
    nextExample() {
        // Выбираем случайный вариант
        const variant = this.variants[Math.floor(Math.random() * this.variants.length)];
        
        // Выбираем z и h
        const { z, h } = this.getRandomBetValues();
        
        // Рассчитываем сдачу
        const q = (z + h) - 100;
        const payout = variant.coefficient * q;
        
        // Формируем контент
        this.content.innerHTML = `
            <div class="complit-text">
                Рулетка 1 - 100<br>
                Комплит "${variant.x}" по "${z}",<br>
                комплит "${variant.y}" по "${h}"
            </div>
            <div class="intersection-image">
                <img src="${variant.id}.jpg" alt="Вариант ${variant.id}">
            </div>
        `;
        
        // Формируем ответ
        this.answerElement.innerHTML = `Сдача с пересечения: ${this.formatNumber(payout)}`;
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new IntersectionGame();
});
