class BetsGame {
    constructor() {
        this.contentText = document.getElementById('contentText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        // Получаем все 9 фишек
        this.chip1 = document.getElementById('chip1');
        this.chip2 = document.getElementById('chip2');
        this.chip3 = document.getElementById('chip3');
        this.chip4 = document.getElementById('chip4');
        this.chip5 = document.getElementById('chip5');
        this.chip6 = document.getElementById('chip6');
        this.chip7 = document.getElementById('chip7');
        this.chip8 = document.getElementById('chip8');
        this.chip9 = document.getElementById('chip9');
        this.currentNumber = 1;
        
        // Сохраняем позиции фишек
        this.chipPositions = {
            // Верхний ряд (сдвиг на 15% вверх)
            str2_up: { top: '35%', left: '50%' },     // chip7
            sp0_2_up: { top: '35%', left: '35%' },    // chip8
            sp2_5_up: { top: '35%', left: '65%' },    // chip9
            
            // Средний ряд
            str2: { top: '50%', left: '50%' },        // chip1
            sp0_2: { top: '50%', left: '35%' },       // chip2
            sp2_5: { top: '50%', left: '65%' },       // chip3
            
            // Нижний ряд (сдвиг на 15% вниз)
            str2_down: { top: '65%', left: '50%' },   // chip4
            sp0_2_down: { top: '65%', left: '35%' },  // chip5
            sp2_5_down: { top: '65%', left: '65%' }   // chip6
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
        // Позиционируем все 9 фишек
        this.positionChip('chip7', 'str2_up');
        this.positionChip('chip8', 'sp0_2_up');
        this.positionChip('chip9', 'sp2_5_up');
        
        this.positionChip('chip1', 'str2');
        this.positionChip('chip2', 'sp0_2');
        this.positionChip('chip3', 'sp2_5');
        
        this.positionChip('chip4', 'str2_down');
        this.positionChip('chip5', 'sp0_2_down');
        this.positionChip('chip6', 'sp2_5_down');
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
