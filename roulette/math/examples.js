class ExamplesGame {
    constructor() {
        this.multipliers = [35, 25, 17, 11, 8, 5];
        this.answerVisible = false;
        this.currentFontSize = 1.4; // начальный размер шрифта в em
        this.userFontSize = null; // размер, выбранный пользователем
        
        this.exampleElement = document.getElementById('exampleFormula');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        this.minusBtn = document.querySelector('.minus-btn');
        this.plusBtn = document.querySelector('.plus-btn');
        
        this.init();
    }
    
    init() {
        this.generateExample();
        this.setupEventListeners();
        this.updateFontSize();
    }
    
    setupEventListeners() {
        this.actionBtn.addEventListener('click', () => {
            if (this.answerVisible) {
                this.nextExample();
            } else {
                this.showAnswer();
            }
        });
        
        this.minusBtn.addEventListener('click', () => {
            this.decreaseFontSize();
        });
        
        this.plusBtn.addEventListener('click', () => {
            this.increaseFontSize();
        });
        
        // Автоматическая регулировка размера только если пользователь не менял шрифт
        window.addEventListener('resize', () => {
            if (!this.userFontSize) {
                this.adjustFontSizeIfNeeded();
            }
        });
    }
    
    generateExample() {
        // Создаем копию массива и перемешиваем
        const shuffledMultipliers = [...this.multipliers].sort(() => Math.random() - 0.5);
        
        // Берем первые 3 уникальных значения
        const selectedMultipliers = shuffledMultipliers.slice(0, 3);
        
        // Генерируем случайные числа от 2 до 20 для каждого множителя
        const randomNumbers = [
            Math.floor(Math.random() * 19) + 2,
            Math.floor(Math.random() * 19) + 2,
            Math.floor(Math.random() * 19) + 2
        ];
        
        // Формируем пример
        const exampleParts = selectedMultipliers.map((multiplier, index) => {
            return `(${multiplier} × ${randomNumbers[index]})`;
        });
        
        this.example = exampleParts.join(' + ');
        this.calculateAnswer(selectedMultipliers, randomNumbers);
        
        this.exampleElement.textContent = this.example;
        this.answerElement.classList.remove('show');
        this.answerVisible = false;
        
        // Автоматическая регулировка только если пользователь не менял шрифт
        if (!this.userFontSize) {
            setTimeout(() => {
                this.adjustFontSizeIfNeeded();
            }, 100);
        }
        
        this.updateButton();
    }
    
    adjustFontSizeIfNeeded() {
        // Автоматическая регулировка работает только если пользователь не менял шрифт
        if (this.userFontSize) return;
        
        const container = this.exampleElement.parentElement;
        const exampleWidth = this.exampleElement.scrollWidth;
        const containerWidth = container.clientWidth;
        
        // Если пример шире контейнера, уменьшаем шрифт
        if (exampleWidth > containerWidth && this.currentFontSize > 0.8) {
            const scaleFactor = containerWidth / exampleWidth * 0.9; // 0.9 для запаса
            this.currentFontSize = Math.max(0.8, this.currentFontSize * scaleFactor);
            this.updateFontSize();
        }
    }
    
    calculateAnswer(multipliers, numbers) {
        let total = 0;
        for (let i = 0; i < multipliers.length; i++) {
            total += multipliers[i] * numbers[i];
        }
        this.answer = total;
        this.answerElement.textContent = this.answer.toString();
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
        this.answerVisible = true;
        this.updateButton();
    }
    
    nextExample() {
        // Если пользователь менял шрифт, сохраняем его выбор
        // Если нет - сбрасываем к автоматическому режиму
        if (!this.userFontSize) {
            this.currentFontSize = 1.4;
        }
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
    
    increaseFontSize() {
        if (this.currentFontSize < 2.5) {
            this.currentFontSize += 0.1;
            this.userFontSize = this.currentFontSize; // сохраняем выбор пользователя
            this.updateFontSize();
        }
    }
    
    decreaseFontSize() {
        if (this.currentFontSize > 0.8) {
            this.currentFontSize -= 0.1;
            this.userFontSize = this.currentFontSize; // сохраняем выбор пользователя
            this.updateFontSize();
        }
    }
    
    updateFontSize() {
        this.exampleElement.style.fontSize = `${this.currentFontSize}em`;
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ExamplesGame();
});
