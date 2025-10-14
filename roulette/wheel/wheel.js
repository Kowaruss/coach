class WheelGame {
    constructor() {
        this.content = document.getElementById('content');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Массив чисел рулетки
        this.wheelNumbers = [
            3, 26, 0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 
            8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 
            35, 3, 26, 0, 32
        ];
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.init();
    }
    
    init() {
        this.nextExample();
    }
    
    nextExample() {
        // Выбираем случайный индекс от 0 до 38
        const randomIndex = Math.floor(Math.random() * 39); // 0-38
        const z = this.wheelNumbers[randomIndex];
        
        // Рассчитываем соседей
        const neighbor1 = z - 2;
        const neighbor2 = z - 1;
        const neighbor3 = z + 1;
        const neighbor4 = z + 2;
        
        // Формируем контент
        this.content.innerHTML = `
            <div class="wheel-text">
                Вспомни соседей по часовой стрелке<br>
                Соседи номера "${z}"
            </div>
        `;
        
        // Формируем ответ
        this.answerElement.innerHTML = `${neighbor1} ${neighbor2} ${neighbor3} ${neighbor4}`;
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WheelGame();
});
