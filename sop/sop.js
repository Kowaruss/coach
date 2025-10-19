class QuestionManager {
    constructor() {
        this.questions = [];
        this.usedQuestions = new Set();
        this.currentQuestion = null;
        this.totalQuestions = 0;
        
        this.initializeElements();
        this.loadQuestions();
    }
    
    initializeElements() {
        this.questionText = document.getElementById('questionText');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.actionButton = document.getElementById('actionButton');
        this.nextButton = document.getElementById('nextButton');
        this.progress = document.getElementById('progress');
        
        this.actionButton.addEventListener('click', () => this.showAnswer());
        this.nextButton.addEventListener('click', () => this.nextQuestion());
    }
    
    loadQuestions() {
        // Вопросы из предоставленного файла
        this.questions = [
            {
                question: "В каком направлении дилер запускает шарик относительно движения колеса в игре «Американская рулетка»?",
                options: [
                    "В противоположном направлении",
                    "В том же направлении",
                    "По часовой стрелке",
                    "Против часовой стрелки"
                ],
                correctIndex: 0
            },
            {
                question: "Как происходит открытие стола в игре «Американская рулетка»?",
                options: [
                    "Шарик кладется в номер «0», барабан закручивается против часовой стрелки",
                    "Шарик кладется в номер, соответствующий сегодняшней дате, барабан закручивается по часовой стрелке",
                    "Шарик кладется в номер «1», барабан закручивается по часовой стрелке",
                    "Шарик кладется в номер «36», барабан закручивается против часовой стрелки"
                ],
                correctIndex: 1
            },
            {
                question: "Как производятся выплаты последнего спина при закрытии стола в игре «Американская рулетка»?",
                options: [
                    "Полностью через цветные фишки",
                    "Частично кэшем, частично фишками",
                    "Полностью через кэш",
                    "По усмотрению инспектора"
                ],
                correctIndex: 2
            },
            {
                question: "Какова процедура обмена кэша на цвет в игре «Американская рулетка»?",
                options: [
                    "Кэш на верхней ступени, дилер объявляет сумму, выдает цвет",
                    "Кэш на нижней ступени, дилер выдает цвет, затем объявляет сумму",
                    "Кэш на верхней ступени, дилер выдает цвет без объявления",
                    "Кэш на нижней ступени, раскрыт колен-валом, дилер объявляет сумму и номинал, выдает цвет с согласия инспектора"
                ],
                correctIndex: 3
            },
            {
                question: "Допустим ли обмен кэша на цвет во время спина в игре «Американская рулетка»?",
                options: [
                    "Допустим, если позволяет время; если нет, дилер объявляет: «Обмен только после спина»",
                    "Всегда допустим",
                    "Никогда не допустим",
                    "Допустим только с разрешения Пит-босса"
                ],
                correctIndex: 0
            }
            // Остальные вопросы будут добавлены аналогично
        ];
        
        this.totalQuestions = this.questions.length;
        this.nextQuestion();
    }
    
    getRandomQuestion() {
        if (this.usedQuestions.size >= this.questions.length) {
            this.usedQuestions.clear();
        }
        
        let availableQuestions = this.questions.filter((_, index) => !this.usedQuestions.has(index));
        
        if (availableQuestions.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const questionIndex = this.questions.indexOf(availableQuestions[randomIndex]);
        this.usedQuestions.add(questionIndex);
        
        return availableQuestions[randomIndex];
    }
    
    displayQuestion(question) {
        this.questionText.textContent = question.question;
        this.optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = `${index + 1}. ${option.replace('*', '')}`;
            this.optionsContainer.appendChild(optionElement);
        });
        
        this.updateProgress();
        this.resetButtons();
    }
    
    showAnswer() {
        const options = this.optionsContainer.querySelectorAll('.option');
        options[this.currentQuestion.correctIndex].classList.add('correct');
        
        this.actionButton.style.display = 'none';
        this.nextButton.style.display = 'block';
    }
    
    nextQuestion() {
        this.currentQuestion = this.getRandomQuestion();
        
        if (this.currentQuestion) {
            this.displayQuestion(this.currentQuestion);
        } else {
            this.questionText.textContent = "Все вопросы пройдены!";
            this.optionsContainer.innerHTML = '';
            this.actionButton.style.display = 'none';
            this.nextButton.style.display = 'none';
        }
    }
    
    updateProgress() {
        const currentNumber = this.usedQuestions.size;
        this.progress.textContent = `Вопрос ${currentNumber} из ${this.totalQuestions}`;
    }
    
    resetButtons() {
        this.actionButton.style.display = 'block';
        this.nextButton.style.display = 'none';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new QuestionManager();
});
