// Покерные комбинации для техасского холдема
const texasCombinations = [
    { name: "Пара", multiplier: 3 },
    { name: "Две пары", multiplier: 3 },
    { name: "Тройка", multiplier: 3 },
    { name: "Стрит", multiplier: 3 },
    { name: "Флеш", multiplier: 4 },
    { name: "Фулл хаус", multiplier: 5 },
    { name: "Каре", multiplier: 12 },
    { name: "Стрит флеш", multiplier: 22 },
    { name: "Роял флеш", multiplier: 102 }
];

// Функция расчёта ответа для техасского холдема
function calculateTexasAnswer(combination, ante) {
    const payout = ante * combination.multiplier;
    
    return {
        text: `Комбинация "${combination.name}"<br>Анте ${ante}`,
        answer: `<span class="label">Ответ:</span><br>${PokerCommon.formatNumber(payout)}`
    };
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    PokerCommon.initPokerPage(texasCombinations, calculateTexasAnswer);
});
