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
        
        let answer = `<span class="label">Играет по:</span><br>${this.formatNumber(playAmount)}`;
        if (hasSpreading) answer += " с размазыванием<br>";
        answer += `<br><span class="label">Сдача:</span><br>${this.formatNumber(change)}`;
        
        return {
            question: `${rouletteName}<br>Ставка на Вуазен ${this.formatNumber(bet)} у.е.<br>Почем играет и сколько сдача?`,
            answer: answer
        };
    }
    
    generateBet(range) {
        const steps = Math.floor((range.max - range.min) / range.step);
        const randomStep = Math.floor(Math.random() * (steps + 1));
        return range.min + (randomStep * range.step);
    }
    
    calculateVoisin(bet, baseAmount, rouletteType) {
        if (bet <= baseAmount) {
            // Без размазывания
            const divisor = rouletteType === 3 ? 225 : 45;
            const multiplier = rouletteType === 3 ? 25 : 5;
            const steps = Math.floor(bet / divisor);
            const playAmount = steps * multiplier;
            const totalStake = playAmount * (rouletteType === 3 ? 9 : 9);
            const change = bet - totalStake;
            return { playAmount, change, hasSpreading: false };
        } else {
            // С размазыванием
            const spreadDivisor = rouletteType === 3 ? 175 : 35;
            const multiplier = rouletteType === 3 ? 25 : 5;
            const basePlay = rouletteType === 3 ? 750 : (rouletteType === 2 ? 300 : 150);
            
            const remainder = bet - baseAmount;
            const steps = Math.floor(remainder / spreadDivisor);
            const spreading = steps * multiplier;
            const playAmount = basePlay + spreading;
            const change = bet - baseAmount - (spreading * (rouletteType === 3 ? 7 : 7));
            return { playAmount, change, hasSpreading: true };
        }
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
