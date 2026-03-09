class CashPaymentsGame {
    constructor() {
        this.cashPaymentsText = document.getElementById('cashPaymentsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Группы номиналов с весами
        this.valueGroups = [
            {
                weight: 10,
                values: [2, 5]
            },
            {
                weight: 4,
                values: [25]
            },
            {
                weight: 3,
                values: [50, 125]
            }
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
    
    // Взвешенный выбор номинала
    getWeightedX() {
        let weightedGroups = [];
        
        this.valueGroups.forEach(group => {
            for (let i = 0; i < group.weight; i++) {
                weightedGroups.push(group);
            }
        });
        
        const selectedGroup = weightedGroups[Math.floor(Math.random() * weightedGroups.length)];
        
        return selectedGroup.values[Math.floor(Math.random() * selectedGroup.values.length)];
    }
    
    generateExample() {
        let z, x, yRaw, y, answerValue;

        // Генерируем пока ответ не станет >= 0
        do {
            // Z - случайное число от 170 до 350
            z = Math.floor(Math.random() * 181) + 170;

            // X - взвешенный выбор
            x = this.getWeightedX();

            // YRaw
            yRaw = Math.floor(Math.random() * (z - 50 - 199 + 1)) + 199;

            // Y
            y = this.roundY(yRaw * x, x);

            // Ответ
            answerValue = z - (y / x);

        } while (answerValue < 0);

        // Текст примера
        this.cashPaymentsText.innerHTML = `Выплата ${z} цвет по ${x}<br>через ${y}`;

        // Ответ
        this.answerElement.innerHTML =
            `<span class="label">Ответ:</span><br>${Math.round(answerValue)}`;

        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    roundY(y, x) {
        if (x === 2 || x === 5) {
            return Math.floor(y / 50) * 50;
        } 
        else if (x === 25 || x === 50) {
            return Math.floor(y / 100) * 100;
        } 
        else if (x === 125) {
            return Math.floor(y / 500) * 500;
        }
        
        return y;
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
