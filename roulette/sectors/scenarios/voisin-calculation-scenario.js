class VoisinCalculationScenario {
    generate() {
        const rouletteType = Math.floor(Math.random() * 3) + 1;
        let rouletteName, betRange, baseAmount;
        
        switch(rouletteType) {
            case 1: // 1-100
                rouletteName = "Рулетка 1 - 100";
                betRange = { min: 100, max: 1690, step: 5 };
                baseAmount = 1350;
                break;
            case 2: // 5-200
                rouletteName = "Рулетка 5 - 200";
                betRange = { min: 100, max: 3390, step: 5 };
                baseAmount = 2700;
                break;
            case 3: // 25-500
                rouletteName = "Рулетка 25 - 500";
                betRange = { min: 225, max: 8475, step: 25 };
                baseAmount = 6750;
                break;
        }
        
        const bet = this.generateBet(betRange);
        const { playAmount, change, hasSpreading } = this.calculateVoisin(bet, baseAmount, rouletteType);
        
        let answer = `<span class="label">Играет по:</span> ${playAmount}`;
        if (hasSpreading) answer += " с размазыванием";
        answer += `<br><span class="label">Сдача:</span> ${change}`;
        
        return {
            question: `${rouletteName}. Гость поставил на Вуазен ${bet} у.е.<br>Посчитайте почем играет и сколько сдача`,
            answer: answer
        };
    }
    
    generateBet(range) {
        const steps = Math.floor((range.max - range.min) / range.step);
        const randomStep = Math.floor(Math.random() * (steps + 1));
        return range.min + (randomStep * range.step);
    }
    
    calculateVoisin(bet, baseAmount, rouletteType) {
        // ... логика расчета Вуазена
    }
}
