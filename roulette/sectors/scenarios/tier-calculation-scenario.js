class TierCalculationScenario {
    generate() {
        const rouletteType = Math.floor(Math.random() * 3) + 1;
        let rouletteName, betRange;
        
        switch(rouletteType) {
            case 1: // 1-100
                rouletteName = "Рулетка 1 - 100";
                betRange = { min: 60, max: 1195, step: 5 };
                break;
            case 2: // 5-200
                rouletteName = "Рулетка 5 - 200";
                betRange = { min: 60, max: 2395, step: 5 };
                break;
            case 3: // 25-500
                rouletteName = "Рулетка 25 - 500";
                betRange = { min: 150, max: 5975, step: 25 };
                break;
        }
        
        const bet = this.generateBet(betRange);
        const { playAmount, change } = this.calculateTier(bet, rouletteType);
        
        return {
            question: `${rouletteName}. Гость поставил на Тьер ${bet} у.е.`,
            answer: `<span class="label">Играет по:</span> ${playAmount}<br><span class="label">Сдача:</span> ${change}`
        };
    }
    
    generateBet(range) {
        // ... аналогично Вуазену
    }
    
    calculateTier(bet, rouletteType) {
        // ... логика расчета Тьера
    }
}
