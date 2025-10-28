class TierCalculationScenario {
    generate() {
        const rouletteType = Math.floor(Math.random() * 3) + 1;
        let rouletteName, betRange, divisor, multiplier;
        
        switch(rouletteType) {
            case 1: // 1-100
                rouletteName = "Рулетка 1 - 100";
                betRange = { min: 60, max: 1195, step: 5 };
                divisor = 30;
                multiplier = 5;
                break;
            case 2: // 5-200
                rouletteName = "Рулетка 5 - 200";
                betRange = { min: 60, max: 2395, step: 5 };
                divisor = 30;
                multiplier = 5;
                break;
            case 3: // 25-500
                rouletteName = "Рулетка 25 - 500";
                betRange = { min: 150, max: 5975, step: 25 };
                divisor = 150;
                multiplier = 25;
                break;
        }
        
        const bet = this.generateBet(betRange);
        const { playAmount, change } = this.calculateTier(bet, divisor, multiplier);
        
        return {
            question: `${rouletteName}.<br><br> Ставка на Тьер ${this.formatNumber(bet)} у.е.<br> По сколько играет исколько сдача?`,
            answer: `<span class="label">Играет по:</span><br> ${this.formatNumber(playAmount)}<br><span class="label"><br>Сдача:</span><br> ${this.formatNumber(change)}`
        };
    }
    
    generateBet(range) {
        const steps = Math.floor((range.max - range.min) / range.step);
        const randomStep = Math.floor(Math.random() * (steps + 1));
        return range.min + (randomStep * range.step);
    }
    
    calculateTier(bet, divisor, multiplier) {
        const steps = Math.floor(bet / divisor);
        const playAmount = steps * multiplier;
        const totalStake = playAmount * 6; // Всегда умножаем на 6
        const change = bet - totalStake;
        return { playAmount, change };
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
