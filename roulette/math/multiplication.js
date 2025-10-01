class MultiplicationGame {
    constructor() {
        this.a = 0;
        this.b = 0;
        this.multipliers = [35, 25, 17, 11, 8, 5];
        
        this.exampleElement = document.getElementById('example');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.radioGroup = document.getElementById('radioGroup');
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.init();
    }
    
    init() {
        this.generateExample();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.radioGroup.addEventListener('change', () => {
            this.nextExample();
        });
    }
    
    getSelectedMultiplier() {
        const selected = document.querySelector('input[name="multiplier"]:checked');
        return selected.value;
    }
    
    generateExample() {
        const selected = this.getSelectedMultiplier();
        
        if (selected === 'all') {
            this.a = this.multipliers[Math.floor(Math.random() * this.multipliers.length)];
        } else {
            this.a = parseInt(selected);
        }
        
        this.b = Math.floor(Math.random() * 19) + 2;
        
        this.exampleElement.textContent = `${this.a} × ${this.b}`;
        this.answerElement.textContent = (this.a * this.b).toString();
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
    new MultiplicationGame();
});
