class BetCalculator {
    constructor() {
        this.rouletteTypes = [
            { name: '1-100', min: 1, max: 100, step: 5, playRange: { min: 35, max: 95 } },
            { name: '5-200', min: 5, max: 200, step: 5, playRange: { min: 70, max: 195 } },
            { name: '25-500', min: 25, max: 500, step: 25, playRange: { min: 175, max: 475 } }
        ];
        
        this.neighborCounts = [3, 4, 5];
    }
    
    // Выбор случайной рулетки
    getRandomRoulette() {
        return this.rouletteTypes[Math.floor(Math.random() * this.rouletteTypes.length)];
    }
    
    // Выбор случайного количества соседей
    getRandomNeighborCount() {
        return this.neighborCounts[Math.floor(Math.random() * this.neighborCounts.length)];
    }
    
    // Генерация "почём играет" с умножением
generatePlayPrice(roulette) {
    const { playRange, step } = roulette;
    const steps = Math.floor((playRange.max - playRange.min) / step) + 1;
    const randomStep = Math.floor(Math.random() * steps);
    let basePrice = playRange.min + randomStep * step;
    
    // Умножаем в зависимости от рулетки
    if (roulette.name === '25-500') {
        return basePrice * 25;
    } else {
        return basePrice * 5;
    }
}

// Генерация дополнительной ставки от 0
generateAdditionalBet(roulette, neighborCount) {
    let min, max, step;
    
    if (roulette.name === '25-500') {
        step = 25;
        min = 0;  // от 0
        max = neighborCount * 125 - 25;
    } else {
        step = 5;
        min = 0;  // от 0
        max = neighborCount * 25 - 5;
    }
    
    const steps = Math.floor((max - min) / step) + 1;
    const randomStep = Math.floor(Math.random() * steps);
    return min + randomStep * step;
}
    
    // Расчет сдачи с превышений (только для 3 соседей и картинки 3_1.jpg)
    calculateExcessChange(roulette, playPrice, neighborCount, imageName) {
        if (neighborCount === 3 && imageName === '3_1.jpg') {
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
        } else {
            // Заглушка для остальных случаев
            return 0; // Логика сдачи позже
        }
    }
    
    getRouletteLimit(rouletteName) {
        switch(rouletteName) {
            case '1-100': return 100;
            case '5-200': return 200;
            case '25-500': return 500;
            default: return 0;
        }
    }
    
    // Основной расчет
    calculateBet() {
    const roulette = this.getRandomRoulette();
    const neighborCount = this.getRandomNeighborCount();
    const playPrice = this.generatePlayPrice(roulette); // старый метод
    const additionalBet = this.generateAdditionalBet(roulette, neighborCount);
    
    // Новая формула ставки
    let multiplier;
    if (roulette.name === '25-500') {
        multiplier = 25;
    } else {
        multiplier = 5;
    }
    const totalBet = (playPrice * multiplier * neighborCount) + additionalBet;
    
    return {
        roulette,
        neighborCount,
        playPrice,
        additionalBet,
        totalBet
    };
}
    }
}
