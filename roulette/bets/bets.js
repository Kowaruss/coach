class BetsGame {
    constructor() {
        this.contentText = document.getElementById('contentText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.chip1 = document.getElementById('chip1');
        this.chip2 = document.getElementById('chip2');
        this.currentNumber = 1;
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        // Позиционируем фишки после загрузки
        this.positionChips();
    }
    
    positionChips() {
        // Центр для первой фишки
        this.chip1.style.top = '50%';
        this.chip1.style.left = '50%';
        
        // Левее для второй фишки
        this.chip2.style.top = '50%';
        this.chip2.style.left = '30%';
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.currentNumber++;
        this.contentText.textContent = `Тут будет фото ${this.currentNumber}`;
        this.answerElement.textContent = this.currentNumber;
        this.answerElement.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BetsGame();
});
