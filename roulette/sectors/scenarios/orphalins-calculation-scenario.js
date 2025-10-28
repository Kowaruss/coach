class OrphalinsCalculationScenario {
    generate() {
        const rouletteType = Math.floor(Math.random() * 3) + 1;
        let rouletteName, betRange, baseAmount, basePlay;
        
        switch(rouletteType) {
            case 1: // 1-100
                rouletteName = "Рулетка 1 - 100";
                betRange = { min: 25, max: 895, step: 5 };
                baseAmount = 500;
                basePlay = 100;
                break;
            case 2: // 5-200
                rouletteName = "Рулетка 5 - 200";
                betRange = { min: 25, max: 1795, step: 5 };
                baseAmount = 1000;
                basePlay = 200;
                break;
            case 3: // 25-500
                rouletteName = "Рулетка 25 - 500";
                betRange = { min: 125, max: 4475, step: 25 };
                baseAmount = 2500;
                basePlay = 500;
                break;
        }
        
        const bet = this.generateBet(betRange);
        const { playAmount, change, hasSpreading } = this.calculateOrphalins(bet, baseAmount, basePlay, rouletteType);
        
        let answer = `<span class="label">Играет по:</span><br>${this.formatNumber(playAmount)}`;
        if (hasSpreading) answer += " с размазыванием<br>";
        answer += `<br><span class="label">Сдача:</span><br>${this.formatNumber(change)}`;
        
        return {
            question: `${rouletteName}<br>Ставка на Орфалайнс ${this.formatNumber(bet)} у.е.<br>Почем играет и сколько сдача?`,
            answer: answer
        };
    }
    
    generateBet(range) {
        const steps = Math.floor((range.max - range.min) / range.step);
        const randomStep = Math.floor(Math.random() * (steps + 1));
        return range.min + (randomStep * range.step);
    }
    
    calculateOrphalins(bet, baseAmount, basePlay, rouletteType) {
        if (bet <= baseAmount) {
            // Без размазывания
            const divisor = rouletteType === 3 ? 125 : 25;
            const multiplier = rouletteType === 3 ? 25 : 5;
            const steps = Math.floor(bet / divisor);
            const playAmount = steps * multiplier;
            const change = bet - (playAmount * 5);
            return { playAmount, change, hasSpreading: false };
        } else {
            // С размазыванием
            const spreadDivisor = rouletteType === 3 ? 100 : 20;
            const multiplier = rouletteType === 3 ? 25 : 5;
            
            const remainder = bet - baseAmount;
            const steps = Math.floor(remainder / spreadDivisor);
            const spreading = steps * multiplier;
            const playAmount = basePlay + spreading;
            const change = bet - baseAmount - (spreading * 4);
            return { playAmount, change, hasSpreading: true };
        }
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
