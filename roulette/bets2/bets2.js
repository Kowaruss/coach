class Bets2Game {
    constructor() {
        this.betsContent = document.getElementById('betsContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        this.variants = [new Variant1(), new Variant2()];
        this.currentVariant = null;
        this.currentScenario = null;
        
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
        this.currentVariant = this.variants[Math.floor(Math.random() * this.variants.length)];
        this.currentScenario = this.currentVariant.getRandomScenario();
        
        this.betsContent.innerHTML = `Вариант ${this.currentVariant.number}<br>${this.currentScenario.name}`;
        this.answerElement.innerHTML = '';
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    showAnswer() {
        this.answerElement.innerHTML = `Ответ: Вариант ${this.currentVariant.number}<br>сценарий ${this.currentScenario.number}`;
        this.answerElement.classList.add('show');
    }
    
    nextExample() {
        this.generateExample();
    }
}

// Классы вариантов
class Variant1 {
    constructor() {
        this.number = 1;
        this.scenarios = [
            new VoisinScenario(),
            new TierScenario(), 
            new OrphalinsScenario(),
            new SpielScenario()
        ];
    }
    
    getRandomScenario() {
        return this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
    }
}

class Variant2 {
    constructor() {
        this.number = 2;
        this.scenarios = [
            new VoisinScenario(),
            new TierScenario(),
            new OrphalinsScenario(), 
            new SpielScenario()
        ];
    }
    
    getRandomScenario() {
        return this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
    }
}

// Классы сценариев
class VoisinScenario {
    constructor() {
        this.name = "Вуазен";
        this.number = 1;
    }
}

class TierScenario {
    constructor() {
        this.name = "Тьер";
        this.number = 2;
    }
}

class OrphalinsScenario {
    constructor() {
        this.name = "Орфалайнс";
        this.number = 3;
    }
}

class SpielScenario {
    constructor() {
        this.name = "Шпиль";
        this.number = 4;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Bets2Game();
});
