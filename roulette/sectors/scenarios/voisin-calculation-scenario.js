class VoisinCalculationScenario {
    generate() {
        const rouletteType = Math.floor(Math.random() * 3) + 1;
        let rouletteName, betRange, baseAmount, divisor, multiplier, basePlay;
        
        switch(rouletteType) {
            case 1: // 1-100
                rouletteName = "Рулетка 1 - 100";
                betRange = { min: 100, max: 1690, step: 5 };
                baseAmount = 1350;
                divisor = 45;
                multiplier = 5;
                basePlay = 150;
                break;
            case 2: // 5-200
                rouletteName = "Рулетка 5 - 200";
                betRange = { min: 100, max: 3390, step: 5 };
                baseAmount = 2700;
                divisor = 45;
                multiplier = 5;
                basePlay = 300;
                break;
            case 3: // 25-500
                rouletteName = "Рулетка 25 - 500";
                betRange = { min: 225, max: 8475, step: 25 };
                baseAmount = 6750;
                divisor = 225;
                multiplier = 25;
                basePlay = 750;
                break;
        }
        
        const bet = this.generateBet(betRange);
        const { playAmount, change, hasSpreading } = this.calculateVoisin(bet, baseAmount, divisor, multiplier, basePlay);
        
        let answer = `<span class="label">Играет по:</span> ${this.formatNumber(playAmount)}`;
        if (hasSpreading) answer += " с размазыванием";
        answer += `<br><span class="label">Сдача:</span> ${this.formatNumber(change)}`;
        
        return {
            question: `${rouletteName}. Гость поставил на Вуазен ${this.formatNumber(bet)} у.е.<br>Посчитайте почем играет и сколько сдача`,
            answer: answer
        };
    }
    
    generateBet(range) {
        const steps = Math.floor((range.max - range.min) / range.step);
        const randomStep = Math.floor(Math.random() * (steps + 1));
        return range.min + (randomStep * range.step);
    }
    
    calculateVoisin(bet, baseAmount, divisor, multiplier, basePlay) {
        if (bet <= baseAmount) {
            // Случай без размазывания
            const steps = Math.floor(bet / divisor);
            const playAmount = steps * multiplier;
            const change = bet - (playAmount * (divisor === 225 ? 9 : 9));
            return { playAmount, change, hasSpreading: false };
        } else {
            // Случай с размазыванием
            const remainder = bet - baseAmount;
            const spreadDivisor = divisor === 225 ? 175 : 35;
            const steps = Math.floor(remainder / spreadDivisor);
            const spreading = steps * multiplier;
            const playAmount = basePlay + spreading;
            const change = bet - baseAmount - (spreading * (divisor === 225 ? 7 : 7));
            return { playAmount, change, hasSpreading: true };
        }
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
