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
    
    generateExample() {
        // Выбираем случайную покерную комбинацию с весом
        const combination = PokerCommon.getWeightedCombination(this.pokerCombinations);
        
        // Выбираем случайный тип закрытия
        const closeType = this.closeTypes[Math.floor(Math.random() * this.closeTypes.length)];
        
        // Генерируем анте
        const ante = PokerCommon.generateAnte();
        
        // Рассчитываем блаинд и анте+бет
        const blind = ante * combination.blindMultiplier;
        const anteBet = ante * closeType.multiplier;
        
        // Формируем текст
        this.pokerText.innerHTML = `Сочи покер<br>Комбинация "${combination.name}"<br>Анте ${ante}<br>${closeType.name}`;
        
        // Формируем ответ
        this.answerElement.innerHTML = `
            <span class="label">Блаинд:</span><br>${PokerCommon.formatNumber(blind)}<br>
            <span class="label">Анте + Бет:</span><br>${PokerCommon.formatNumber(anteBet)}
        `;
        
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
    new SochiPokerGame();
});
