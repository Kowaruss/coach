class OasisPokerGame {
    constructor() {
        this.pokerText = document.getElementById('pokerText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Покерные комбинации для оазис покера (коэффициенты +1 к русскому)
        this.pokerCombinations = [
            { name: "Пара", multiplier: 3 },          // 2+1
            { name: "Две пары", multiplier: 5 },      // 4+1
            { name: "Тройка", multiplier: 7 },        // 6+1
            { name: "Стрит", multiplier: 9 },         // 8+1
            { name: "Флеш", multiplier: 11 },         // 10+1
            { name: "Фулл хаус", multiplier: 15 },    // 14+1
            { name: "Каре", multiplier: 41 },         // 40+1
            { name: "Стрит флеш", multiplier: 101 },  // 100+1
            { name: "Флеш рояль", multiplier: 201 }   // 200+1
        ];
        
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
        // Выбираем случайную покерную комбинацию
        const combination = this.pokerCombinations[Math.floor(Math.random() * this.pokerCombinations.length)];
        
        // Генерируем анте Y (от 15 до 300, кратно 5)
        const y = this.generateAnte();
        
        // Формируем текст
        this.pokerText.innerHTML = `Комбинация "${combination.name}"<br>Анте ${y}`;
        
        // Рассчитываем ответ R = Y * коэффициент комбинации
        const r = y * combination.multiplier;
        
        // Формируем ответ
        this.answerElement.innerHTML = `<span class="label">Ответ:</span><br>${this.formatNumber(r)}`;
        
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    generateAnte() {
        // Генерируем число от 15 до 300, кратное 5
        const min = 15;
        const max = 300;
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
    new OasisPokerGame();
});
