class WheelGame {
    // ... остальной код без изменений ...
    
    nextExample() {
        // Выбираем случайный индекс от 2 до 38
        const zIndex = Math.floor(Math.random() * 37) + 2; // 2-38
        const z = this.wheelNumbers[zIndex];
        
        // Рассчитываем индексы соседей
        const indexMinus2 = (zIndex - 2 + this.wheelNumbers.length) % this.wheelNumbers.length;
        const indexMinus1 = (zIndex - 1 + this.wheelNumbers.length) % this.wheelNumbers.length;
        const indexPlus1 = (zIndex + 1) % this.wheelNumbers.length;
        const indexPlus2 = (zIndex + 2) % this.wheelNumbers.length;
        
        // Получаем соседей
        const neighbor1 = this.wheelNumbers[indexMinus2];
        const neighbor2 = this.wheelNumbers[indexMinus1];
        const neighbor3 = this.wheelNumbers[indexPlus1];
        const neighbor4 = this.wheelNumbers[indexPlus2];
        
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
    
    // ... остальной код без изменений ...
}
