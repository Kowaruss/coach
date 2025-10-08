// Покерные комбинации для оазис покера (коэффициенты +1 к русскому)
const oasisCombinations = [
    { name: "Пара", multiplier: 3 },
    { name: "Две пары", multiplier: 5 },
    { name: "Тройка", multiplier: 7 },
    { name: "Стрит", multiplier: 9 },
    { name: "Флеш", multiplier: 11 },
    { name: "Фулл хаус", multiplier: 15 },
    { name: "Каре", multiplier: 41 },
    { name: "Стрит флеш", multiplier: 101 },
    { name: "Флеш рояль", multiplier: 201 }
];

// Функция расчёта ответа для оазис покера
function calculateOasisAnswer(combination, ante) {
    const payout = ante * combination.multiplier;
    
    return {
        text: `Комбинация "${combination.name}"<br>Анте ${ante}`,
        answer: `<span class="label">Ответ:</span><br>${PokerCommon.formatNumber(payout)}`
    };
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    PokerCommon.initPokerPage(oasisCombinations, calculateOasisAnswer);
});
