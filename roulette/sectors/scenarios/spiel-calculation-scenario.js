class SpielCalculationScenario {
    generate() {
        const rouletteType = Math.floor(Math.random() * 3) + 1;
        let rouletteName, betRange, baseAmount, basePlay, divisor, spreadDivisor, multiplier;
        
        switch(rouletteType) {
            case 1: // 1-100
                rouletteName = "Рулетка 1 - 100";
                betRange = { min: 20, max: 695, step: 5 };
                baseAmount = 400;
                basePlay = 100;
                divisor = 20;
                spreadDivisor = 15;
                multiplier = 5;
                break;
            case 2: // 5-200
                rouletteName = "Рулетка 5 - 200";
                betRange = { min: 20, max: 1395, step: 5 };
                baseAmount = 800;
                basePlay = 200;
                divisor = 20;
                spreadDivisor = 15;
                multiplier = 5;
                break;
            case 3: // 25-500
                rouletteName = "Рулетка 25 - 500";
                betRange = { min: 100, max: 3475, step: 25 };
                baseAmount = 2000;
                basePlay = 500;
                divisor = 100;
                spreadDivisor = 75;
                multiplier = 25;
                break;
        }
        
        const bet = this.generateBet(betRange);
        const { playAmount, change, hasSpreading } = this.calculateSpiel(bet, baseAmount, basePlay, divisor, spreadDivisor, multiplier);
        
        let answer = `<span class="label">Играет по:</span><br>${this.formatNumber(playAmount)}`;
        if (hasSpreading) answer += " с размазыванием<br>";
        answer += `<br><span class="label">Сдача:</span><br>${this.formatNumber(change)}`;
        
        return {
            question: `${rouletteName}<br>Ставка на Шпиль ${this.formatNumber(bet)} у.е.<br>Почем играет и сколько сдача?`,
            answer: answer
        };
    }
    
    generateBet(range) {
        const steps = Math.floor((range.max - range.min) / range.step);
        const randomStep = Math.floor(Math.random() * (steps + 1));
        return range.min + (randomStep * range.step);
    }
    
    calculateSpiel(bet, baseAmount, basePlay, divisor, spreadDivisor, multiplier) {
        if (bet <= baseAmount) {
            // Без размазывания
            const steps = Math.floor(bet / divisor);
            const playAmount = steps * multiplier;
            const change = bet - (playAmount * 4);
            return { playAmount, change, hasSpreading: false };
        } else {
            // С размазыванием
            const remainder = bet - baseAmount;
            const steps = Math.floor(remainder / spreadDivisor);
            const spreading = steps * multiplier;
            const playAmount = basePlay + spreading;
            const change = bet - baseAmount - (spreading * 3);
            return { playAmount, change, hasSpreading: true };
        }
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
