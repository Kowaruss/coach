import { db, collection, getDocs } from '../firebase.js';

let questions = [];
let currentQuestionIndex = 0;
let answerShown = false;
let settings = {
    mode: 'shuffle',
    rangeFrom: 1,
    rangeTo: 2
};

// Загружаем настройки из localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('sopSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    }
}

// Сохраняем настройки в localStorage
function saveSettings() {
    localStorage.setItem('sopSettings', JSON.stringify(settings));
}

// Настройка модального окна
function setupSettingsModal() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const saveBtn = document.getElementById('saveSettings');
    const shuffleCheckbox = document.getElementById('shuffleMode');
    const rangeCheckbox = document.getElementById('rangeMode');
    const rangeControls = document.getElementById('rangeControls');
    const rangeFrom = document.getElementById('rangeFrom');
    const rangeTo = document.getElementById('rangeTo');
    
    // Загружаем текущие настройки в форму
    shuffleCheckbox.checked = settings.mode === 'shuffle';
    rangeCheckbox.checked = settings.mode === 'range';
    rangeFrom.value = settings.rangeFrom;
    rangeTo.value = settings.rangeTo;
    rangeControls.style.display = settings.mode === 'range' ? 'block' : 'none';
    
    // Обработчики для чекбоксов (только один выбран)
    shuffleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            rangeCheckbox.checked = false;
            rangeControls.style.display = 'none';
        }
    });
    
    rangeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            shuffleCheckbox.checked = false;
            rangeControls.style.display = 'block';
        }
    });
    
    // Валидация диапазона
    rangeFrom.addEventListener('change', function() {
        const from = parseInt(this.value);
        const to = parseInt(rangeTo.value);
        if (from >= to) {
            rangeTo.value = from + 1;
        }
        if (from < 1) this.value = 1;
        if (from > questions.length) this.value = questions.length;
    });
    
    rangeTo.addEventListener('change', function() {
        const from = parseInt(rangeFrom.value);
        const to = parseInt(this.value);
        if (to <= from) {
            this.value = from + 1;
        }
        if (to > questions.length) this.value = questions.length;
        if (to < 2) this.value = 2;
    });
    
    // Открытие/закрытие модального окна
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });
    
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
    
    // Сохранение настроек
    saveBtn.addEventListener('click', () => {
        settings.mode = rangeCheckbox.checked ? 'range' : 'shuffle';
        settings.rangeFrom = parseInt(rangeFrom.value);
        settings.rangeTo = parseInt(rangeTo.value);
        
        saveSettings();
        settingsModal.style.display = 'none';
        showRandomQuestion(); // Перезагружаем вопрос с новыми настройками
    });
}

async function loadQuestions() {
    try {
        console.log("Загружаю вопросы из БД...");
        const querySnapshot = await getDocs(collection(db, "sops"));
        questions = [];
        
        let totalDocs = 0;
        let skippedDocs = 0;
        
        querySnapshot.forEach((doc) => {
            totalDocs++;
            const data = doc.data();
            const docId = doc.id;
            
            // Подробная проверка структуры документа
            if (data.question && data.options && Array.isArray(data.options) && data.options.length > 0) {
                questions.push({
                    ...data,
                    _firebaseId: docId // Добавляем ID для отладки
                });
                console.log(`✓ Загружен вопрос: "${data.question.substring(0, 50)}..."`);
            } else {
                skippedDocs++;
                console.log("❌ Пропущен документ:", docId, {
                    hasQuestion: !!data.question,
                    hasOptions: !!data.options,
                    isArray: Array.isArray(data.options),
                    optionsLength: data.options ? data.options.length : 0,
                    data: data
                });
            }
        });
        
        console.log("=== СТАТИСТИКА ЗАГРУЗКИ ===");
        console.log(`Всего документов в коллекции: ${totalDocs}`);
        console.log(`Успешно загружено вопросов: ${questions.length}`);
        console.log(`Пропущено документов: ${skippedDocs}`);
        console.log("===========================");
        
        if (questions.length > 0) {
            // Обновляем максимальные значения в настройках
            updateRangeLimits();
            showRandomQuestion();
            setupActionButton();
            setupSettingsModal();
        } else {
            document.getElementById('questionText').textContent = 'В базе данных пока нет вопросов.';
            document.getElementById('actionBtn').style.display = 'none';
        }
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        document.getElementById('questionText').textContent = 'Ошибка загрузки вопросов из базы данных';
    }
}

function updateRangeLimits() {
    const rangeFrom = document.getElementById('rangeFrom');
    const rangeTo = document.getElementById('rangeTo');
    
    if (rangeFrom && rangeTo) {
        rangeFrom.max = questions.length;
        rangeTo.max = questions.length;
        
        if (settings.rangeTo > questions.length) {
            settings.rangeTo = questions.length;
        }
        if (settings.rangeFrom > questions.length) {
            settings.rangeFrom = 1;
        }
    }
}

function getFilteredQuestions() {
    if (settings.mode === 'shuffle') {
        return [...questions]; // Все вопросы
    } else {
        // Диапазон вопросов (индексы с 0)
        const from = settings.rangeFrom - 1;
        const to = settings.rangeTo - 1;
        return questions.slice(from, to + 1);
    }
}

function showRandomQuestion() {
    const filteredQuestions = getFilteredQuestions();
    if (filteredQuestions.length === 0) {
        document.getElementById('questionText').textContent = 'Нет вопросов в выбранном диапазоне';
        return;
    }
    
    if (settings.mode === 'shuffle') {
        // Случайный вопрос из всех
        currentQuestionIndex = Math.floor(Math.random() * filteredQuestions.length);
    } else {
        // Последовательные вопросы из диапазона
        currentQuestionIndex = (currentQuestionIndex + 1) % filteredQuestions.length;
    }
    
    const question = filteredQuestions[currentQuestionIndex];
    
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = `${index + 1}. ${option}`;
            optionElement.style.color = '#2c3e50';
            optionElement.style.fontWeight = 'normal';
            optionsContainer.appendChild(optionElement);
        });
    }
    
    answerShown = false;
}

function setupActionButton() {
    const actionBtn = document.getElementById('actionBtn');
    if (!actionBtn) return;
    
    actionBtn.addEventListener('click', function() {
        const filteredQuestions = getFilteredQuestions();
        if (filteredQuestions.length === 0) return;
        
        const options = document.querySelectorAll('.option');
        
        if (!answerShown) {
            const correctIndex = filteredQuestions[currentQuestionIndex].correctAnswer;
            options.forEach((option, index) => {
                if (index === correctIndex) {
                    option.classList.add('correct');
                } else {
                    option.classList.add('incorrect');
                }
            });
            
            actionBtn.textContent = 'Следующий вопрос';
            answerShown = true;
        } else {
            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
            });
            
            showRandomQuestion();
            actionBtn.textContent = 'Покажи ответ';
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadQuestions();
});
