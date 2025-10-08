// Общие функции для всех видов покера
class PokerCommon {
    // Генерация анте (от 15 до 200, кратно 5)
    static generateAnte() {
        const min = 15;
        const max = 200;
        const step = 5;
        const range = (max - min) / step;
        return min + (Math.floor(Math.random() * (range + 1)) * step);
    }

    // Форматирование чисел с разделителями тысяч
    static formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // Взвешенный выбор комбинации
    static getWeightedCombination(combinations) {
        // Создаем массив с весами: 4, 4, 4, 4, 3, 3, 2, 1, 1
        const weights = [4, 4, 4, 4, 3, 3, 2, 1, 1];
        
        // Создаем взвешенный массив
        let weightedArray = [];
        combinations.forEach((combination, index) => {
            const weight = weights[index] || 1;
            for (let i = 0; i < weight; i++) {
                weightedArray.push(combination);
            }
        });
        
        // Выбираем случайную комбинацию из взвешенного массива
        return weightedArray[Math.floor(Math.random() * weightedArray.length)];
    }

    // Базовая инициализация страницы покера
    static initPokerPage(pokerCombinations, calculateAnswer) {
        const pokerText = document.getElementById('pokerText');
        const answerElement = document.getElementById('answer');
        const actionBtn = document.getElementById('actionBtn');
        
        const actionButton = new ActionButton(
            actionBtn,
            () => answerElement.classList.add('show'),
            () => generateExample()
        );

        function generateExample() {
            // Выбираем случайную покерную комбинацию с весом
            const combination = PokerCommon.getWeightedCombination(pokerCombinations);
            
            // Генерируем анте
            const ante = PokerCommon.generateAnte();
            
            // Вызываем callback для расчёта ответа
            const result = calculateAnswer(combination, ante);
            
            // Формируем текст
            pokerText.innerHTML = result.text;
            
            // Формируем ответ
            answerElement.innerHTML = result.answer;
            
            answerElement.classList.remove('show');
            actionButton.reset();
        }

        // Начинаем с первого примера
        generateExample();
    }
}
