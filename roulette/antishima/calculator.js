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
            '3_3.jpg': this.calculateExcess3_2.bind(this),
            '3_4.jpg': this.calculateExcess3_4.bind(this),
            '4_1.jpg': this.calculateExcess4_1.bind(this),
            '4_2.jpg': this.calculateExcess4_2.bind(this),
            '4_3.jpg': this.calculateExcess4_3.bind(this),
            '4_4.jpg': this.calculateExcess4_4.bind(this),
            '4_5.jpg': this.calculateExcess4_5.bind(this)
        };
    }
    
    // Базовый метод-заглушка
    calculateExcessDefault(roulette, playPrice, neighborCount) {
        return 0;
    }
    
    // Методы для 3 соседей
    calculateExcess3_1(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 2;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2 * 3;
        
        return total;
    }
    
    calculateExcess3_2(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 4;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2;
        
        return total;
    }
    
    calculateExcess3_4(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 3;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2 * 2;
        
        return total;
    }
    
    // Методы для 4 соседей
    calculateExcess4_1(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 2;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2 * 2;
        
        const diff3 = 4 * playPrice - limit;
        if (diff3 > 0) total += diff3 * 2;
        
        return total;
    }
    
    calculateExcess4_2(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 5;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2 * 2;
        
        return total;
    }
    
    calculateExcess4_3(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 2;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2 * 3;
        
        const diff3 = 4 * playPrice - limit;
        if (diff3 > 0) total += diff3 * 1;
        
        return total;
    }
    
    calculateExcess4_4(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 4;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2 * 2;
        
        const diff3 = 4 * playPrice - limit;
        if (diff3 > 0) total += diff3 * 1;
        
        return total;
    }
    
    calculateExcess4_5(roulette, playPrice, neighborCount) {
        let total = 0;
        const limit = this.getRouletteLimit(roulette.name);
        
        const diff1 = 2 * playPrice - limit;
        if (diff1 > 0) total += diff1 * 2;
        
        const diff2 = 3 * playPrice - limit;
        if (diff2 > 0) total += diff2 * 4;
        
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
