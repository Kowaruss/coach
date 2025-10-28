PokerCombinations.prototype.detectCombination = function(cards) {
    const numericCards = cards.map(card => {
        const rank = card.rank;
        let value;
        if (rank === 'A') value = 14;
        else if (rank === 'K') value = 13;
        else if (rank === 'Q') value = 12;
        else if (rank === 'J') value = 11;
        else value = parseInt(rank);
        
        return { value, suit: card.suit, rank: card.rank };
    });
    
    // Ищем лучшую комбинацию из всех возможных 5 карт из 7
    const bestCombination = this.findBestCombination(numericCards);
    return bestCombination;
};

PokerCombinations.prototype.findBestCombination = function(cards) {
    const combinations = this.getAllCombinations(cards);
    let bestCombination = "Нет игры";
    let bestRank = 0;

    combinations.forEach(comb => {
        const rank = this.getCombinationRank(comb);
        if (rank > bestRank) {
            bestRank = rank;
            bestCombination = this.getCombinationName(comb);
        }
    });

    return bestCombination;
};

PokerCombinations.prototype.getAllCombinations = function(cards) {
    const combinations = [];
    
    // Генерируем все возможные комбинации по 5 карт из 7
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            const combination = cards.filter((_, index) => index !== i && index !== j);
            combinations.push(combination);
        }
    }
    
    return combinations;
};

PokerCombinations.prototype.getCombinationRank = function(cards) {
    if (this.isRoyalFlush(cards)) return 10;
    if (this.isStraightFlush(cards)) return 9;
    if (this.isFourOfAKind(cards)) return 8;
    if (this.isFullHouse(cards)) return 7;
    if (this.isFlush(cards)) return 6;
    if (this.isStraight(cards)) return 5;
    if (this.isThreeOfAKind(cards)) return 4;
    if (this.isTwoPairs(cards)) return 3;
    if (this.isOnePair(cards)) return 2;
    return 1; // Нет игры
};

PokerCombinations.prototype.getCombinationName = function(cards) {
    if (this.isRoyalFlush(cards)) return "Флеш-рояль";
    if (this.isStraightFlush(cards)) return "Стрит-флеш";
    if (this.isFourOfAKind(cards)) return "Каре";
    if (this.isFullHouse(cards)) return "Фулл-хаус";
    if (this.isFlush(cards)) return "Флеш";
    if (this.isStraight(cards)) return "Стрит";
    if (this.isThreeOfAKind(cards)) return "Сет";
    if (this.isTwoPairs(cards)) return "Две пары";
    
    const onePair = this.isOnePair(cards);
    if (onePair) return onePair;
    
    return "Нет игры";
};
