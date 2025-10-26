class SectorToStakeScenario {
    constructor() {
        this.rouletteTypes = [
            { name: "Рулетка 1 – 100", min: 5, max: 200, step: 5 },
            { name: "Рулетка 5 – 200", min: 5, max: 400, step: 5 },
            { name: "Рулетка 25 – 500", min: 25, max: 1000, step: 25 }
        ];
        
        this.sectorTypes = ["Орфалайнс", "Вуазен", "Шпиль", "Тьер"];
    }
    
    generate() {
        const rouletteType = this.rouletteTypes[Math.floor(Math.random() * this.rouletteTypes.length)];
        const sectorType = this.sectorTypes[Math.floor(Math.random() * this.sectorTypes.length)];
        const x = this.generateX(rouletteType);
        const stake = this.calculateStake(rouletteType.name, sectorType, x);
        
        return {
            question: `${rouletteType.name}<br>"${sectorType}" по ${x}`,
            answer: `<span class="label">Ставка:</span> ${this.formatNumber(stake)}`
        };
    }
    
    generateX(rouletteType) {
        const range = (rouletteType.max - rouletteType.min) / rouletteType.step;
        const randomStep = Math.floor(Math.random() * (range + 1));
        return rouletteType.min + (randomStep * rouletteType.step);
    }
    
    calculateStake(rouletteName, sectorType, x) {
        // ... существующая логика расчета ставки
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
