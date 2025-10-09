// Конфигурации покеров
const pokerConfigs = {
    russian: {
        name: "Русский покер",
        combinations: [
            { name: "Пара", multiplier: 2 },
            { name: "Две пары", multiplier: 4 },
            { name: "Тройка", multiplier: 6 },
            { name: "Стрит", multiplier: 8 },
            { name: "Флеш", multiplier: 10 },
            { name: "Фулл хаус", multiplier: 14 },
            { name: "Каре", multiplier: 40 },
            { name: "Стрит флеш", multiplier: 100 },
            { name: "Флеш рояль", multiplier: 200 }
        ],
        calculateAnswer: function(combination, ante) {
            const payout = ante * combination.multiplier;
            return {
                text: `Русский покер<br>Комбинация "${combination.name}"<br>Анте ${ante}`,
                answer: `<span class="label">Ответ:</span><br>${PokerCommon.formatNumber(payout)}`
            };
        }
    },
    oasis: {
        name: "Оазис покер",
        combinations: [
            { name: "Пара", multiplier: 3 },
            { name: "Две пары", multiplier: 5 },
            { name: "Тройка", multiplier: 7 },
            { name: "Стрит", multiplier: 9 },
            { name: "Флеш", multiplier: 11 },
            { name: "Фулл хаус", multiplier: 15 },
            { name: "Каре", multiplier: 41 },
            { name: "Стрит флеш", multiplier: 101 },
            { name: "Флеш рояль", multiplier: 201 }
        ],
        calculateAnswer: function(combination, ante) {
            const payout = ante * combination.multiplier;
            return {
                text: `Оазис покер<br>Комбинация "${combination.name}"<br>Анте ${ante}`,
                answer: `<span class="label">Ответ:</span><br>${PokerCommon.formatNumber(payout)}`
            };
        }
    },
    texas: {
        name: "Техасский покер",
        combinations: [
            { name: "Пара", multiplier: 3 },
            { name: "Две пары", multiplier: 3 },
            { name: "Тройка", multiplier: 3 },
            { name: "Стрит", multiplier: 3 },
            { name: "Флеш", multiplier: 4 },
            { name: "Фулл хаус", multiplier: 5 },
            { name: "Каре", multiplier: 12 },
            { name: "Стрит флеш", multiplier: 22 },
            { name: "Роял флеш", multiplier: 102 }
        ],
        calculateAnswer: function(combination, ante) {
            const payout = ante * combination.multiplier;
            return {
                text: `Техасский покер<br>Комбинация "${combination.name}"<br>Анте ${ante}`,
                answer: `<span class="label">Ответ:</span><br>${PokerCommon.formatNumber(payout)}`
            };
        }
    },
    sochi: {
        name: "Сочи покер",
        combinations: [
            { name: "Пара", blindMultiplier: 0 },
            { name: "Две пары", blindMultiplier: 0 },
            { name: "Тройка", blindMultiplier: 0 },
            { name: "Стрит", blindMultiplier: 1 },
            { name: "Флеш", blindMultiplier: 1.5 },
            { name: "Фулл хаус", blindMultiplier: 3 },
            { name: "Каре", blindMultiplier: 10 },
            { name: "Стрит флеш", blindMultiplier: 50 },
            { name: "Роял флеш", blindMultiplier: 500 }
        ],
        calculateAnswer: function(combination, ante) {
            const closeTypes = [
                { name: "закрылись до флопа по максимуму", multiplier: 5 },
                { name: "закрылись на флопе по максимуму", multiplier: 3 },
                { name: "закрылись после ривера", multiplier: 2 }
            ];
            
            const closeType = closeTypes[Math.floor(Math.random() * closeTypes.length)];
            const blind = ante * combination.blindMultiplier;
            const anteBet = ante * closeType.multiplier;
            
            return {
                text: `Сочи покер<br>Комбинация "${combination.name}"<br>Анте ${ante}<br>${closeType.name}`,
                answer: `
                    <span class="label">Блаинд:</span><br>${PokerCommon.formatNumber(blind)}<br>
                    <span class="label">Анте + Бет:</span><br>${PokerCommon.formatNumber(anteBet)}
                `
            };
        }
    }
};

class UniversalPokerGame {
    constructor() {
        this.pokerText = document.getElementById('pokerText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.pokerTypeInputs = document.querySelectorAll('input[name="pokerType"]');
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        // Слушаем изменения выбора покера
        this.pokerTypeInputs.forEach(input => {
            input.addEventListener('change', () => this.nextExample());
        });
        
        this.init();
    }
    
    init() {
        this.generateExample();
    }
    
    getSelectedPokerType() {
        const selected = Array.from(this.pokerTypeInputs).find(input => input.checked);
        return selected ? selected.value : 'russian';
    }
    
    getRandomPokerType() {
        const types = ['russian', 'oasis', 'texas', 'sochi'];
        return types[Math.floor(Math.random() * types.length)];
    }
    
    generateExample() {
        const pokerType = this.getSelectedPokerType();
        const config = pokerType === 'mixed' 
            ? pokerConfigs[this.getRandomPokerType()]
            : pokerConfigs[pokerType];
        
        const combination = PokerCommon.getWeightedCombination(config.combinations);
        const ante = PokerCommon.generateAnte();
        const result = config.calculateAnswer(combination, ante);
        
        this.pokerText.innerHTML = result.text;
        this.answerElement.innerHTML = result.answer;
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
    new UniversalPokerGame();
});
