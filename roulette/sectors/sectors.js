class SectorsGame {
    constructor() {
        this.sectorsText = document.getElementById('sectorsText');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.rouletteTypes = [
            { name: "Рулетка 1 – 100", min: 5, max: 200, step: 5 },
            { name: "Рулетка 5 – 200", min: 5, max: 400, step: 5 },
            { name: "Рулетка 25 – 500", min: 25, max: 1000, step: 25 }
        ];
        
        this.sectorTypes = ["Орфалайнс", "Вуазен", "Шпиль", "Тьер"];
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextExample()
        );
        
        this.init();
    }
    
    init() {
        this.generateExample();
    }
    
    generateExample() {
        // Выбираем случайный тип рулетки
        const rouletteType = this.rouletteTypes[Math.floor(Math.random() * this.rouletteTypes.length)];
        
        // Выбираем случайный сектор
        const sectorType = this.sectorTypes[Math.floor(Math.random() * this.sectorTypes.length)];
        
        // Генерируем X согласно логике
        const x = this.generateX(rouletteType);
        
        // Формируем текст
        this.sectorsText.innerHTML = `${rouletteType.name}<br>"${sectorType}" по ${x}`;
        
        // Рассчитываем ставку
        const stake = this.calculateStake(rouletteType.name, sectorType, x);
        
        // Формируем ответ
        this.answerElement.innerHTML = `<span class="label">Ставка:</span> ${this.formatNumber(stake)}`;
        
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    generateX(rouletteType) {
        const range = (rouletteType.max - rouletteType.min) / rouletteType.step;
        const randomStep = Math.floor(Math.random() * (range + 1));
        return rouletteType.min + (randomStep * rouletteType.step);
    }
    
    calculateStake(rouletteName, sectorType, x) {
        if (rouletteName === "Рулетка 1 – 100") {
            return this.calculateStakeFor100(sectorType, x);
        } else if (rouletteName === "Рулетка 5 – 200") {
            return this.calculateStakeFor200(sectorType, x);
        } else {
            return this.calculateStakeFor500(sectorType, x);
        }
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
        }
    }
    
    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.generateExample();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SectorsGame();
});
