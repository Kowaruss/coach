class CashPaymentsGame {
    constructor() {
        this.cashPaymentsText = document.getElementById('cashPaymentsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
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

        do {

            // Z
            z = Math.floor(Math.random() * 181) + 170;

            // X
            x = this.getWeightedX();

            // yRaw всегда меньше z
            yRaw = Math.floor(Math.random() * (z - 1)) + 1;

            // Y
            y = this.roundY(yRaw * x, x);

            // если округление увеличило значение — пересчитать
            if ((y / x) > z) {
                continue;
            }

            answerValue = z - (y / x);

        } while (answerValue < 0);

        this.cashPaymentsText.innerHTML =
            `Выплата ${z} цвет по ${x}<br>через ${y}`;

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
