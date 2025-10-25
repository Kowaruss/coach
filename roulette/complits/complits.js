// Функция для форматирования чисел с разделителями тысяч
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

class ComplitsGame {
    constructor() {
        this.complitsText = document.getElementById('complitsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.minusBtn = document.querySelector('.minus-btn');
        this.plusBtn = document.querySelector('.plus-btn');
        
        this.bets = [25, 50, 75, 100, 200];
        this.currentFontSize = 1.4; // начальный размер шрифта в em
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.init();
    }
    
    init() {
        this.generateExample();
        this.initFontControls();
    }
    
    initFontControls() {
        this.minusBtn.addEventListener('click', () => {
            this.decreaseFontSize();
        });
        
        this.plusBtn.addEventListener('click', () => {
            this.increaseFontSize();
        });
        
        this.updateFontSize();
    }
    
    increaseFontSize() {
        if (this.currentFontSize < 2.5) {
            this.currentFontSize += 0.1;
            this.updateFontSize();
        }
    }
    
    decreaseFontSize() {
        if (this.currentFontSize > 0.8) {
            this.currentFontSize -= 0.1;
            this.updateFontSize();
        }
    }
    
    updateFontSize() {
        this.complitsText.style.fontSize = `${this.currentFontSize}em`;
    }
    
    generateExample() {
        const randomNumber = Math.floor(Math.random() * 4) + 1; // Только 1-4
        const bet = this.bets[Math.floor(Math.random() * this.bets.length)];
        
        let scenario;
        switch(randomNumber) {
            case 1:
                scenario = generateScenario1(bet);
                break;
            case 2:
                scenario = generateScenario2(bet);
                break;
            case 3:
                scenario = generateScenario3(bet);
                break;
            case 4:
                scenario = generateScenario4(bet);
                break;
        }
        
        this.complitsText.innerHTML = scenario.text;
        this.answerElement.innerHTML = scenario.answer;
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
        
        // Обновляем размер шрифта для нового вопроса
        this.updateFontSize();
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.generateExample();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ComplitsGame();
});
