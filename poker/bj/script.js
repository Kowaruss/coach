// Функция проверки запрещённых комбинаций
function isForbiddenCombination(cards) {
    // Проверяем только первые две карты
    if (cards.length < 2) return false;
    
    const firstCard = cards[0];
    const secondCard = cards[1];
    
    // Если первая карта туз - нельзя чтобы вторая была 10/J/Q/K
    if (firstCard.value === 'A') {
        const isTen = ['10', 'J', 'Q', 'K'].includes(secondCard.value);
        if (isTen) return true;
    }
    
    // Если первая карта 10/J/Q/K - нельзя чтобы вторая была туз
    if (['10', 'J', 'Q', 'K'].includes(firstCard.value)) {
        if (secondCard.value === 'A') return true;
    }
    
    return false;
}

// Функция поиска комбинации для целевого числа
function findCombinationForTarget(targetScore, numCards) {
    let attempts = 0;
    const maxAttempts = 1000;
    
    while (attempts < maxAttempts) {
        // Берём случайные карты из колоды
        const combination = [];
        const tempDeck = [...deck];
        
        for (let i = 0; i < numCards; i++) {
            if (tempDeck.length === 0) break;
            const randomIndex = Math.floor(Math.random() * tempDeck.length);
            combination.push(tempDeck.splice(randomIndex, 1)[0]);
        }
        
        // Проверяем запрещённые комбинации
        if (isForbiddenCombination(combination)) {
            attempts++;
            continue;
        }
        
        // Проверяем что сумма даёт целевое число
        const score = calculateScore(combination);
        if (score === targetScore) {
            return combination;
        }
        
        attempts++;
    }
    
    return null; // Не нашли подходящую комбинацию
}

// Функция генерации нового примера
function generateNewExample() {
    createDeck();
    
    // Случайное число от 13 до 26
    const targetScore = Math.floor(Math.random() * 14) + 13; // 13-26
    
    // Случайно выбираем 3 или 4 карты
    const numCards = Math.random() < 0.5 ? 3 : 4;
    
    // Ищем комбинацию для целевого числа
    currentCards = findCombinationForTarget(targetScore, numCards);
    
    // Если не нашли, пробуем с другим количеством карт
    if (!currentCards) {
        const alternativeNumCards = numCards === 3 ? 4 : 3;
        currentCards = findCombinationForTarget(targetScore, alternativeNumCards);
    }
    
    // Если всё равно не нашли, генерируем новое число
    if (!currentCards) {
        generateNewExample();
        return;
    }
    
    showCards();
    hideAnswer();
}
