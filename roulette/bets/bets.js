class BetsGame {
    constructor() {
        this.contentText = document.getElementById('contentText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.chip1 = document.getElementById('chip1');
        this.chip2 = document.getElementById('chip2');
        this.currentNumber = 1;
        
        // Позиции фишек
        this.chipPositions = {
            str2: { top: '50%', left: '50%' },   // Центр - для chip1
            str3: { top: '50%', left: '30%' }    // Левее - для chip2
        };
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        // УБИРАЕМ вызов positionChip - позиции уже заданы в HTML!
        // this.positionChip('chip1', 'str2');
        // this.positionChip('chip2', 'str3');
    }
    
    // Оставляем метод для будущего использования
    positionChip(chipId, positionName) {
        const chip = document.getElementById(chipId);
        if (chip && this.chipPositions[positionName]) {
            const pos = this.chipPositions[positionName];
            chip.style.top = pos.top;
            chip.style.left = pos.left;
            // УБИРАЕМ transform!
        }
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
