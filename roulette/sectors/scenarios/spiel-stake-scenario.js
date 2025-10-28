class SpielStakeScenario {
    constructor() {
        this.name = "Шпиль";
        this.rouletteTypes = [
            { name: "Рулетка 1 – 100", min: 5, max: 200, step: 5 },
            { name: "Рулетка 5 – 200", min: 5, max: 400, step: 5 },
            { name: "Рулетка 25 – 500", min: 25, max: 1000, step: 25 }
        ];
    }
    
    generate() {
        const rouletteType = this.rouletteTypes[Math.floor(Math.random() * this.rouletteTypes.length)];
        const x = this.generateX(rouletteType);
        const stake = this.calculateStake(rouletteType.name, x);
        
        return {
            question: `${rouletteType.name}<br>"${this.name}" по ${x}`,
            answer: `<span class="label">Ставка:</span><br>${this.formatNumber(stake)}`
        };
    }
    
    generateX(rouletteType) {
        const range = (rouletteType.max - rouletteType.min) / rouletteType.step;
        const randomStep = Math.floor(Math.random() * (range + 1));
        return rouletteType.min + (randomStep * rouletteType.step);
    }
    
    calculateStake(rouletteName, x) {
        if (rouletteName === "Рулетка 1 – 100") {
            return x <= 100 ? x * 4 : 400 + ((x - 100) * 3);
        } else if (rouletteName === "Рулетка 5 – 200") {
            return x <= 200 ? x * 4 : 800 + ((x - 200) * 3);
        } else {
            return x <= 500 ? x * 4 : 2000 + ((x - 500) * 3);
        }
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
