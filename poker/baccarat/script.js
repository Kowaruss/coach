// Настройки по умолчанию
let settings = {
    minBet: 25,
    maxBet: 5000,
    multiple: 5
};

// Элементы DOM
const betInfoElement = document.getElementById('betInfo');
const answerElement = document.getElementById('answer');
const answerPlaceholder = document.getElementById('answerPlaceholder');
const actionBtn = document.getElementById('actionBtn');
const settingsModal = document.getElementById('settingsModal');
const settingsButton = document.getElementById('settingsBtn');
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
    
    // Проверка на корректность диапазона
    if (min > max) {
        betInfoElement.textContent = 'Ошибка: неверный диапазон ставок';
        return;
    }
    
    const steps = Math.floor((max - min) / settings.multiple) + 1;
    const randomStep = Math.floor(Math.random() * steps);
    
    currentBet = min + (randomStep * settings.multiple);
    
    betInfoElement.textContent = `Ставка: ${currentBet} (случайная цифра от ${settings.minBet} до ${settings.maxBet} кратно ${settings.multiple})`;
    
    // Скрываем ответ
    hideAnswer();
}

// Функция для расчета выплаты
function calculatePayout(bet) {
    const commission = 0.05; // 5% комиссия
    const payout = bet * (1 - commission);
    return Math.round(payout * 100) / 100; // Округление до сотых
}

// Функция показа ответа
function showAnswer() {
    const payout = calculatePayout(currentBet);
    answerElement.textContent = `Выплата: ${payout} (${currentBet} - 5% комиссия)`;
    answerElement.classList.add('visible');
}

// Функция скрытия ответа
function hideAnswer() {
    answerElement.textContent = '';
    answerElement.classList.remove('visible');
}

// Функция следующего примера
function nextExample() {
    generateRandomBet();
}

// Инициализация ActionButton
let actionButton;

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
        actionButton.reset(); // Сбрасываем кнопку
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
    // Создаем экземпляр ActionButton
    actionButton = new ActionButton(
        actionBtn,
        showAnswer,     // callback для показа ответа
        nextExample     // callback для следующего примера
    );
    
    // Генерируем первую ставку
    generateRandomBet();
});
