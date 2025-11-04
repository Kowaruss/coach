// Настройки по умолчанию
let settings = {
    minBet: 25,
    maxBet: 5000,
    multiple: 5
};

// Элементы DOM
const betInfoElement = document.getElementById('betInfo');
const answerElement = document.getElementById('answer');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const settingsModal = document.getElementById('settingsModal');
const settingsButton = document.querySelector('.settings-button');
const cancelSettingsBtn = document.getElementById('cancelSettings');
const saveSettingsBtn = document.getElementById('saveSettings');
const minBetInput = document.getElementById('minBet');
const maxBetInput = document.getElementById('maxBet');
const multipleInput = document.getElementById('multiple');

// Текущая случайная ставка
let currentBet = 0;

// Функция для генерации случайной ставки
function generateRandomBet() {
    const min = Math.ceil(settings.minBet / settings.multiple) * settings.multiple;
    const max = Math.floor(settings.maxBet / settings.multiple) * settings.multiple;
    
    const steps = Math.floor((max - min) / settings.multiple) + 1;
    const randomStep = Math.floor(Math.random() * steps);
    
    currentBet = min + (randomStep * settings.multiple);
    
    betInfoElement.textContent = `Ставка: ${currentBet} (случайная цифра от ${settings.minBet} до ${settings.maxBet} кратно ${settings.multiple})`;
    
    // Скрываем ответ
    answerElement.style.display = 'none';
}

// Функция для расчета выплаты
function calculatePayout(bet) {
    const commission = 0.05; // 5% комиссия
    const payout = bet * (1 - commission);
    return Math.round(payout * 100) / 100; // Округление до сотых
}

// Показать ответ
showAnswerBtn.addEventListener('click', function() {
    const payout = calculatePayout(currentBet);
    answerElement.textContent = `Выплата: ${payout} (${currentBet} - 5% комиссия)`;
    answerElement.style.display = 'block';
});

// Открыть модальное окно настроек
settingsButton.addEventListener('click', function() {
    minBetInput.value = settings.minBet;
    maxBetInput.value = settings.maxBet;
    multipleInput.value = settings.multiple;
    settingsModal.style.display = 'flex';
});

// Закрыть модальное окно настроек
cancelSettingsBtn.addEventListener('click', function() {
    settingsModal.style.display = 'none';
});

// Сохранить настройки
saveSettingsBtn.addEventListener('click', function() {
    const newMin = parseInt(minBetInput.value);
    const newMax = parseInt(maxBetInput.value);
    const newMultiple = parseInt(multipleInput.value);

    if (newMin > 0 && newMax > newMin && newMultiple > 0) {
        settings.minBet = newMin;
        settings.maxBet = newMax;
        settings.multiple = newMultiple;
        
        settingsModal.style.display = 'none';
        generateRandomBet(); // Обновляем ставку с новыми настройками
    } else {
        alert('Пожалуйста, введите корректные значения:\n- Минимальная ставка должна быть больше 0\n- Максимальная ставка должна быть больше минимальной\n- Кратность должна быть больше 0');
    }
});

// Закрыть модальное окно при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    generateRandomBet();
});
