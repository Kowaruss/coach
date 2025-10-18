class BetsGame {
    constructor() {
        this.contentText = document.getElementById('contentText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.chip = document.getElementById('chip');
        this.currentNumber = 1;
        
        // Позиции фишки
        this.chipPositions = {
            str2: { top: '50%', left: '50%' } // Текущая позиция по центру
        };
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.saveCurrentPositionAsStr2();
    }
    
    // Сохраняем текущую позицию как str2
    saveCurrentPositionAsStr2() {
        const rect = this.chip.getBoundingClientRect();
        const containerRect = document.getElementById('rouletteContainer').getBoundingClientRect();
        
        // Рассчитываем позицию в процентах относительно контейнера
        const topPercent = ((rect.top - containerRect.top) / containerRect.height) * 100;
        const leftPercent = ((rect.left - containerRect.left) / containerRect.width) * 100;
        
        this.chipPositions.str2 = {
            top: `${topPercent}%`,
            left: `${leftPercent}%`
        };
        
        console.log('Позиция str2 сохранена:', this.chipPositions.str2);
    }
    
    // Позиционируем фишку в сохраненную позицию
    positionChip(positionName) {
        if (this.chipPositions[positionName]) {
            const pos = this.chipPositions[positionName];
            this.chip.style.top = pos.top;
            this.chip.style.left = pos.left;
            this.chip.style.transform = 'translate(0, 0)'; // Убираем центрирование
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
        
        // При следующем примере можно использовать сохраненную позицию
        // this.positionChip('str2');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BetsGame();
});
