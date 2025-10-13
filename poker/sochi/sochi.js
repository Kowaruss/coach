class SochiPokerGame {
    constructor() {
        this.pokerText = document.getElementById('pokerText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Покерные комбинации для сочи покера
        this.pokerCombinations = [
            { name: "Пара", blindMultiplier: 0 },
            { name: "Две пары", blindMultiplier: 0 },
            { name: "Тройка", blindMultiplier: 0 },
            { name: "Стрит", blindMultiplier: 1 },
            { name: "Флеш", blindMultiplier: 1.5 },
            { name: "Фулл хаус", blindMultiplier: 3 },
            { name: "Каре", blindMultiplier: 10 },
            { name: "Стрит флеш", blindMultiplier: 50 },
            { name: "Роял флеш", blindMultiplier: 500 }
        ];
        
        // Варианты закрытия
        this.closeTypes = [
            { name: "закрылись до флопа по максимуму", multiplier: 5 },
            { name: "закрылись на флопе по максимуму", multiplier: 3 },
            { name: "закрылись после ривера", multiplier: 2 }
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
    
    getWeightedCombination() {
        // Создаем массив с весами: 4, 4, 4, 4, 3, 3, 2, 1, 1
        const weights = [4, 4, 4, 4, 3, 3, 2, 1, 1];
        
        // Создаем взвешенный массив
        let weightedArray = [];
        this.pokerCombinations.forEach((combination, index) => {
            const weight = weights[index] || 1;
            for (let i = 0; i < weight; i++) {
                weightedArray.push(combination);
            }
        });
        
        // Выбираем случайную комбинацию из взвешенного массива
        return weightedArray[Math.floor(Math.random() * weightedArray.length)];
    }
    
    generateExample() {
        // Выбираем случайную покерную комбинацию С ВЕСОМ
        const combination = this.getWeightedCombination();
        
        // Выбираем случайный тип закрытия
        const closeType = this.closeTypes[Math.floor(Math.random() * this.closeTypes.length)];
        
        // Генерируем анте Y (от 15 до 200, кратно 5)
        const y = this.generateAnte();
        
        // Формируем текст
        this.pokerText.innerHTML = `Сочи покер<br>Комбинация "${combination.name}"<br>Анте ${y}<br>${closeType.name}`;
        
        // Рассчитываем блаинд и анте+бет
        const blind = y * combination.blindMultiplier;
        const anteBet = y * closeType.multiplier;
        
        // Формируем ответ
        this.answerElement.innerHTML = `
            <span class="label">Блаинд:</span><br>${this.formatNumber(blind)}<br>
            <span class="label">Анте + Бет:</span><br>${this.formatNumber(anteBet)}
        `;
        
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    generateAnte() {
        // Генерируем число от 15 до 200, кратное 5
        const min = 15;
        const max = 200;
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
    new SochiPokerGame();
});
