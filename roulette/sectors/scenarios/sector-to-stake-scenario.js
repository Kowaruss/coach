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
        // Выбираем случайный тип рулетки
        const rouletteType = this.rouletteTypes[Math.floor(Math.random() * this.rouletteTypes.length)];
        
        // Выбираем случайный сектор
        const sectorType = this.sectorTypes[Math.floor(Math.random() * this.sectorTypes.length)];
        
        // Генерируем X согласно логике
        const x = this.generateX(rouletteType);
        
        // Формируем текст
        const question = `${rouletteType.name}<br>"${sectorType}" по ${x}`;
        
        // Рассчитываем ставку
        const stake = this.calculateStake(rouletteType.name, sectorType, x);
        
        // Формируем ответ
        const answer = `<span class="label">Ставка:</span> ${this.formatNumber(stake)}`;
        
        return {
            question: question,
            answer: answer
        };
    }
    
    generateX(rouletteType) {
        const range = (rouletteType.max - rouletteType.min) / rouletteType.step;
        const randomStep = Math.floor(Math.random() * (range + 1));
        return rouletteType.min + (randomStep * rouletteType.step);
    }
    
    calculateStake(rouletteName, sectorType, x) {
        let stake = 0;
        
        if (rouletteName === "Рулетка 1 – 100") {
            stake = this.calculateStakeFor100(sectorType, x);
        } else if (rouletteName === "Рулетка 5 – 200") {
            stake = this.calculateStakeFor200(sectorType, x);
        } else {
            stake = this.calculateStakeFor500(sectorType, x);
        }
        
        return stake;
    }
    
    calculateStakeFor100(sectorType, x) {
        switch(sectorType) {
            case "Вуазен":
                return x <= 150 ? x * 9 : 1350 + ((x - 150) * 7);
            case "Шпиль":
                return x <= 100 ? x * 4 : 400 + ((x - 100) * 3);
            case "Орфалайнс":
                return x <= 100 ? x * 5 : 500 + ((x - 100) * 4);
            case "Тьер":
                return x * 6;
            default:
                return 0;
        }
    }
    
    calculateStakeFor200(sectorType, x) {
        switch(sectorType) {
            case "Вуазен":
                return x <= 300 ? x * 9 : 2700 + ((x - 300) * 7);
            case "Шпиль":
                return x <= 200 ? x * 4 : 800 + ((x - 200) * 3);
            case "Орфалайнс":
                return x <= 200 ? x * 5 : 1000 + ((x - 200) * 4);
            case "Тьер":
                return x * 6;
            default:
                return 0;
        }
    }
    
    calculateStakeFor500(sectorType, x) {
        switch(sectorType) {
            case "Вуазен":
                return x <= 750 ? x * 9 : 6750 + ((x - 750) * 7);
            case "Шпиль":
                return x <= 500 ? x * 4 : 2000 + ((x - 500) * 3);
            case "Орфалайнс":
                return x <= 500 ? x * 5 : 2500 + ((x - 500) * 4);
            case "Тьер":
                return x * 6;
            default:
                return 0;
        }
    }
    
    formatNumber(number) {
        if (number === undefined || number === null) {
            console.error('formatNumber received undefined:', number);
            return '0';
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}
