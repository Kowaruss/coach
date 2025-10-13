// Покерные комбинации для сочи покера
const sochiCombinations = [
    { name: "Пара", blindMultiplier: 0 },
    { name: "Две пары", blindMultiplier: 0 },
    { name: "Тройка", blindMultiplier: 0 },
    { name: "Стрит", blindMultiplier: 1 },
    { name: "Флеш", blindMultiplier: 1.5 },
    { name: "Фулл хаус", blindMultiplier: 3 },
    { name: "Каре", blindMultiplier: 10 },
    { name: "Стрит флеш", blindMultiplier: 50 },
    { name: "Роял флеш", blindMultiplier: 500 }
];

// Варианты закрытия
const closeTypes = [
    { name: "закрылись до флопа по максимуму", multiplier: 5 },
    { name: "закрылись на флопе по максимуму", multiplier: 3 },
    { name: "закрылись после ривера", multiplier: 2 }
];

// Функция расчёта ответа для сочи покера
function calculateSochiAnswer(combination, ante) {
    // Выбираем случайный тип закрытия
    const closeType = closeTypes[Math.floor(Math.random() * closeTypes.length)];
    
    // Рассчитываем блаинд и анте+бет
    const blind = ante * combination.blindMultiplier;
    const anteBet = ante * closeType.multiplier;
    
    return {
        text: `Сочи покер<br>Комбинация "${combination.name}"<br>Анте ${ante}<br>${closeType.name}`,
        answer: `
            <span class="label">Блаинд:</span><br>${PokerCommon.formatNumber(blind)}<br>
            <span class="label">Анте + Бет:</span><br>${PokerCommon.formatNumber(anteBet)}
        `
    };
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    PokerCommon.initPokerPage(sochiCombinations, calculateSochiAnswer);
});
