// Функция для форматирования чисел с разделителями тысяч
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

class ComplitsGame {
    constructor() {
        this.complitsText = document.getElementById('complitsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.bets = [25, 50, 75, 100, 200];
        
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
        const randomNumber = Math.floor(Math.random() * 7) + 1;
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
            case 5:
                scenario = generateScenario5(bet);
                break;
            case 6:
                scenario = generateScenario6(bet);
                break;
            case 7:
                scenario = generateScenario7(bet);
                break;
        }
        
        this.complitsText.innerHTML = scenario.text;
        this.answerElement.innerHTML = scenario.answer;
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
    new ComplitsGame();
});
