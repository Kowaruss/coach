class TexasPokerGame {
    constructor() {
        this.pokerText = document.getElementById('pokerText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Покерные комбинации для техасского покера
        this.pokerCombinations = [
            { name: "Пара", multiplier: 3 },
            { name: "Две пары", multiplier: 3 },
            { name: "Тройка", multiplier: 3 },
            { name: "Стрит", multiplier: 3 },
            { name: "Флеш", multiplier: 4 },
            { name: "Фулл хаус", multiplier: 5 },
            { name: "Каре", multiplier: 12 },
            { name: "Стрит флеш", multiplier: 22 },
            { name: "Роял флеш", multiplier: 102 }
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
    new TexasPokerGame();
});
