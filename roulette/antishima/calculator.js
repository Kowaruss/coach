class BetCalculator {
    constructor() {
        this.rouletteTypes = [
            { name: '1-100', min: 1, max: 100, step: 5, playRange: { min: 35, max: 95 } },
            { name: '5-200', min: 5, max: 200, step: 5, playRange: { min: 70, max: 195 } },
            { name: '25-500', min: 25, max: 500, step: 25, playRange: { min: 175, max: 495 } }
        ];
        
        this.neighborCounts = [3, 4, 5];
        
        // Методы расчета для каждой картинки
        this.excessCalculationMethods = {
            '3_1.jpg': this.calculateExcess3_1.bind(this),
            '3_2.jpg': this.calculateExcess3_2.bind(this),
            '3_3.jpg': this.calculateExcess3_2.bind(this), // такая же логика как 3_2
            '3_4.jpg': this.calculateExcess3_4.bind(this),
            // Добавьте другие картинки по мере необходимости
        };
    }
    
    // Базовый метод-заглушка (возвращает 0)
    calculateExcessDefault(roulette, playPrice, neighborCount) {
        return 0;
    }
    
    // Метод для картинки 3_1.jpg
    calculateExcess3_1(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        // 2 × почём_играет - лимит
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) {
            total += diff1 * 2;
        }
        
        // 3 × почём_играет - лимит
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) {
            total += diff2 * 3;
        }
        
        return total;
    }
    
    // Метод для картинки 3_2.jpg
    calculateExcess3_2(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        // 2 × почём_играет - лимит
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) {
            total += diff1 * 4;  // умножаем на 4
        }
        
        // 3 × почём_играет - лимит
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) {
            total += diff2;  // добавляем без умножения
        }
        
        return total;
    }
    
    // Метод для картинки 3_4.jpg
    calculateExcess3_4(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        // 2 × почём_играет - лимит
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) {
            total += diff1 * 4;  // умножаем на 4
        }
        
        // 3 × почём_играет - лимит
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) {
            total += diff2;
        }
        
        return total;
    }
    
    // Основной метод расчета сдачи с превышений
    calculateExcessChange(roulette, playPrice, neighborCount, imageName) {
        const calculationMethod = this.excessCalculationMethods[imageName] || this.calculateExcessDefault;
        return calculationMethod(roulette, playPrice, neighborCount);
    }
    
    // Остальные методы без изменений
    getRandomRoulette() {
        return this.rouletteTypes[Math.floor(Math.random() * this.rouletteTypes.length)];
    }
    
    getRandomNeighborCount() {
        return this.neighborCounts[Math.floor(Math.random() * this.neighborCounts.length)];
    }
    
    generatePlayPrice(roulette) {
        const { playRange, step } = roulette;
        const steps = Math.floor((playRange.max - playRange.min) / step) + 1;
        const randomStep = Math.floor(Math.random() * steps);
        return playRange.min + randomStep * step;
    }
    
    generateAdditionalBet(roulette, neighborCount) {
        let min, max, step;
        
        if (roulette.name === '25-500') {
            step = 25;
            min = 0;
            max = neighborCount * 125 - 25;
        } else {
            step = 5;
            min = 0;
            max = neighborCount * 25 - 5;
        }
        
        const steps = Math.floor((max - min) / step) + 1;
        const randomStep = Math.floor(Math.random() * steps);
        return min + randomStep * step;
    }
    
    getRouletteLimit(rouletteName) {
        switch(rouletteName) {
            case '1-100': return 100;
            case '5-200': return 200;
            case '25-500': return 500;
            default: return 0;
        }
    }
    
    calculateBet() {
        const roulette = this.getRandomRoulette();
        const neighborCount = this.getRandomNeighborCount();
        const playPrice = this.generatePlayPrice(roulette);
        const additionalBet = this.generateAdditionalBet(roulette, neighborCount);
        const totalBet = (playPrice * 5 * neighborCount) + additionalBet;
        
        return {
            roulette,
            neighborCount,
            playPrice,
            additionalBet,
            totalBet
        };
    }
}
