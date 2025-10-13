// Покерные комбинации для русского покера
const russianCombinations = [
    { name: "Пара", multiplier: 2 },
    { name: "Две пары", multiplier: 4 },
    { name: "Тройка", multiplier: 6 },
    { name: "Стрит", multiplier: 8 },
    { name: "Флеш", multiplier: 10 },
    { name: "Фулл хаус", multiplier: 14 },
    { name: "Каре", multiplier: 40 },
    { name: "Стрит флеш", multiplier: 100 },
    { name: "Флеш рояль", multiplier: 200 }
];

// Функция расчёта ответа для русского покера
function calculateRussianAnswer(combination, ante) {
    const payout = ante * combination.multiplier;
    
    return {
        text: `Русский покер<br>Комбинация "${combination.name}"<br>Анте ${ante}`,
        answer: `<span class="label">Ответ:</span><br>${PokerCommon.formatNumber(payout)}`
    };
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    PokerCommon.initPokerPage(russianCombinations, calculateRussianAnswer);
});
