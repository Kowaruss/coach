class CashPaymentsGame {
    constructor() {
        this.cashPaymentsText = document.getElementById('cashPaymentsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Группы номиналов с весами
        this.valueGroups = [
            {
                weight: 10, // 10 из 17
                values: [2, 5] // случайный из этих двух
            },
            {
                weight: 4,  // 4 из 17  
                values: [25] // всегда 25
            },
            {
                weight: 3,  // 3 из 17
                values: [50, 125] // случайный из этих двух
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
    
    // Взвешенный выбор группы и номинала
    getWeightedX() {
        // Создаем взвешенный массив групп
        let weightedGroups = [];
        this.valueGroups.forEach(group => {
            for (let i = 0; i < group.weight; i++) {
                weightedGroups.push(group);
            }
        });
        
        // Выбираем случайную группу
        const selectedGroup = weightedGroups[Math.floor(Math.random() * weightedGroups.length)];
        
        // Выбираем случайный номинал из группы
        return selectedGroup.values[Math.floor(Math.random() * selectedGroup.values.length)];
    }
    
    generateExample() {
        // Z - случайное число от 170 до 350
        const z = Math.floor(Math.random() * 181) + 170; // 170-350
        
        // X - взвешенный выбор номинала
        const x = this.getWeightedX();
        
        // Y - случайное число от 199 до Z-50, умноженное на X и округленное
        const yRaw = Math.floor(Math.random() * (z - 50 - 199 + 1)) + 199; // 199 до Z-50
        const y = this.roundY(yRaw * x, x);
        
        // Формируем текст
        this.cashPaymentsText.innerHTML = `Выплата ${z} цвет по ${x}<br>через ${y}`;
        
        // Рассчитываем ответ
        const answerValue = z - (y / x);
        
        // Формируем ответ (целое число)
        this.answerElement.innerHTML = `<span class="label">Ответ:</span><br>${Math.round(answerValue)}`;
        
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    roundY(y, x) {
        if (x === 2 || x === 5) {
            return Math.floor(y / 50) * 50;
        } else if (x === 25 || x === 50) {
            return Math.floor(y / 100) * 100;
        } else if (x === 125) {
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
