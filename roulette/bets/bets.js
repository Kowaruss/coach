class BetsGame {
    constructor() {
        this.contentText = document.getElementById('contentText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.chip1 = document.getElementById('chip1');
        this.chip2 = document.getElementById('chip2');
        this.chip3 = document.getElementById('chip3');
        this.currentNumber = 1;
        
        // Сохраняем позиции фишек
        this.chipPositions = {
            str2: { top: '50%', left: '50%' },   // Для chip1
            sp0_2: { top: '50%', left: '35%' },  // Для chip2
            sp0_3: { top: '50%', left: '65%' }   // Для chip3 (15% вправо от центра)
        };
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        // Позиционируем фишки после загрузки
        this.positionChips();
    }
    
    positionChips() {
        // Позиционируем все фишки
        this.positionChip('chip1', 'str2');
        this.positionChip('chip2', 'sp0_2');
        this.positionChip('chip3', 'sp0_3');
    }
    
    // Универсальный метод для позиционирования фишки
    positionChip(chipId, positionName) {
        const chip = document.getElementById(chipId);
        if (chip && this.chipPositions[positionName]) {
            const pos = this.chipPositions[positionName];
            chip.style.top = pos.top;
            chip.style.left = pos.left;
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
