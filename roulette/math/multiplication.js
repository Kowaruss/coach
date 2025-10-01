class MultiplicationGame {
    constructor() {
        this.a = 0;
        this.b = 0;
        this.answerVisible = false;
        this.multipliers = [35, 25, 17, 11, 8, 5];
        
        this.exampleElement = document.getElementById('example');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.radioGroup = document.getElementById('radioGroup');
        
        this.init();
    }
    
    init() {
        this.generateExample();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.actionBtn.addEventListener('click', () => {
            if (this.answerVisible) {
                this.nextExample();
            } else {
                this.showAnswer();
            }
        });
        
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
        
        this.b = Math.floor(Math.random() * 19) + 2; // от 2 до 20
        
        this.exampleElement.textContent = `${this.a} × ${this.b}`;
        this.answerElement.textContent = (this.a * this.b).toString();
        this.answerElement.classList.remove('show');
        this.answerVisible = false;
        
        this.updateButton();
    }
    
   showAnswer() {
    this.answerElement.classList.add('show');
    this.answerVisible = true;
    this.updateButton();
}
    
   nextExample() {
    this.generateExample();
}
    
  updateButton() {
    if (this.answerVisible) {
        this.actionBtn.textContent = 'Следующий пример';
        this.actionBtn.classList.remove('show-answer');
        this.actionBtn.classList.add('next-example');
    } else {
        this.actionBtn.textContent = 'Покажи ответ';
        this.actionBtn.classList.remove('next-example');
        this.actionBtn.classList.add('show-answer');
    }
}
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new MultiplicationGame();
});
