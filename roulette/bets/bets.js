class BetsGame {
    constructor() {
        this.contentText = document.getElementById('contentText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        // Получаем все 19 фишек
        this.chip1 = document.getElementById('chip1');
        this.chip2 = document.getElementById('chip2');
        this.chip3 = document.getElementById('chip3');
        this.chip4 = document.getElementById('chip4');
        this.chip5 = document.getElementById('chip5');
        this.chip6 = document.getElementById('chip6');
        this.chip7 = document.getElementById('chip7');
        this.chip8 = document.getElementById('chip8');
        this.chip9 = document.getElementById('chip9');
        this.chip10 = document.getElementById('chip10');
        this.chip11 = document.getElementById('chip11');
        this.chip12 = document.getElementById('chip12');
        this.chip13 = document.getElementById('chip13');
        this.chip14 = document.getElementById('chip14');
        this.chip15 = document.getElementById('chip15');
        this.chip16 = document.getElementById('chip16');
        this.chip17 = document.getElementById('chip17');
        this.chip18 = document.getElementById('chip18');
        this.chip19 = document.getElementById('chip19');
        this.currentNumber = 1;
        
        // Базовый размер для среднего ряда
        this.baseSize = 15;
        
        // Сохраняем позиции фишек с информацией о смещении
        this.chipPositions = {
            // Верхний ряд (сдвиг на 45% вверх) - размер: 15% - 3% = 12%
            str2_up3: { top: '8%', left: '50%', sizeOffset: -3 },      // chip16
            sp0_2_up3: { top: '8%', left: '35%', sizeOffset: -3 },     // chip17
            sp2_5_up3: { top: '8%', left: '65%', sizeOffset: -3 },     // chip18
            
            // Верхний ряд (сдвиг на 30% вверх) - размер: 15% - 2% = 13%
            str2_up2: { top: '20%', left: '50%', sizeOffset: -2 },     // chip10
            sp0_2_up2: { top: '20%', left: '35%', sizeOffset: -2 },    // chip11
            sp2_5_up2: { top: '20%', left: '65%', sizeOffset: -2 },    // chip12
            
            // Верхний ряд (сдвиг на 15% вверх) - размер: 15% - 1% = 14%
            str2_up: { top: '35%', left: '50%', sizeOffset: -1 },      // chip7
            sp0_2_up: { top: '35%', left: '35%', sizeOffset: -1 },     // chip8
            sp2_5_up: { top: '35%', left: '65%', sizeOffset: -1 },     // chip9
            
            // Средний ряд - размер: 15%
            str2: { top: '50%', left: '50%', sizeOffset: 0 },         // chip1
            sp0_2: { top: '50%', left: '35%', sizeOffset: 0 },        // chip2
            sp2_5: { top: '50%', left: '65%', sizeOffset: 0 },        // chip3
            
            // Фишка со сдвигом 40% влево от центра - размер: 15%
            str2_left: { top: '50%', left: '20%', sizeOffset: 0 },    // chip19
            
            // Нижний ряд (сдвиг на 15% вниз) - размер: 15% + 1% = 16%
            str2_down: { top: '65%', left: '50%', sizeOffset: 1 },    // chip4
            sp0_2_down: { top: '65%', left: '35%', sizeOffset: 1 },   // chip5
            sp2_5_down: { top: '65%', left: '65%', sizeOffset: 1 },   // chip6
            
            // Нижний ряд (сдвиг на 32% вниз) - размер: 15% + 2% = 17%
            str2_down2: { top: '82%', left: '50%', sizeOffset: 2 },   // chip13
            sp0_2_down2: { top: '82%', left: '35%', sizeOffset: 2 },  // chip14
            sp2_5_down2: { top: '82%', left: '65%', sizeOffset: 2 }   // chip15
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
        // Позиционируем все 19 фишек
        this.positionChip('chip16', 'str2_up3');
        this.positionChip('chip17', 'sp0_2_up3');
        this.positionChip('chip18', 'sp2_5_up3');
        
        this.positionChip('chip10', 'str2_up2');
        this.positionChip('chip11', 'sp0_2_up2');
        this.positionChip('chip12', 'sp2_5_up2');
        
        this.positionChip('chip7', 'str2_up');
        this.positionChip('chip8', 'sp0_2_up');
        this.positionChip('chip9', 'sp2_5_up');
        
        this.positionChip('chip1', 'str2');
        this.positionChip('chip2', 'sp0_2');
        this.positionChip('chip3', 'sp2_5');
        
        this.positionChip('chip19', 'str2_left');
        
        this.positionChip('chip4', 'str2_down');
        this.positionChip('chip5', 'sp0_2_down');
        this.positionChip('chip6', 'sp2_5_down');
        
        this.positionChip('chip13', 'str2_down2');
        this.positionChip('chip14', 'sp0_2_down2');
        this.positionChip('chip15', 'sp2_5_down2');
    }
    
    // Универсальный метод для позиционирования фишки
    positionChip(chipId, positionName) {
        const chip = document.getElementById(chipId);
        if (chip && this.chipPositions[positionName]) {
            const pos = this.chipPositions[positionName];
            chip.style.top = pos.top;
            chip.style.left = pos.left;
            
            // Устанавливаем размер в зависимости от смещения
            const size = this.baseSize + pos.sizeOffset;
            chip.style.width = `${size}%`;
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
