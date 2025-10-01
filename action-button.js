class ActionButton {
    constructor(buttonElement, showAnswerCallback, nextExampleCallback) {
        this.button = buttonElement;
        this.showAnswerCallback = showAnswerCallback;
        this.nextExampleCallback = nextExampleCallback;
        this.answerVisible = false;
        
        this.init();
    }
    
    init() {
        this.button.addEventListener('click', () => {
            if (this.answerVisible) {
                this.nextExample();
            } else {
                this.showAnswer();
            }
        });
        
        this.updateButton();
    }
    
    showAnswer() {
        this.answerVisible = true;
        this.updateButton();
        if (this.showAnswerCallback) {
            this.showAnswerCallback();
        }
    }
    
    nextExample() {
        this.answerVisible = false;
        this.updateButton();
        if (this.nextExampleCallback) {
            this.nextExampleCallback();
        }
    }
    
    updateButton() {
        if (this.answerVisible) {
            this.button.textContent = 'Следующий пример';
            this.button.classList.remove('show-answer');
            this.button.classList.add('next-example');
        } else {
            this.button.textContent = 'Покажи ответ';
            this.button.classList.remove('next-example');
            this.button.classList.add('show-answer');
        }
    }
    
    reset() {
        this.answerVisible = false;
        this.updateButton();
    }
}
