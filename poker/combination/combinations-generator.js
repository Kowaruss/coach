PokerCombinations.prototype.generateNewExample = function() {
    this.generateDeck();
    this.shuffleDeck();
    
    const strategy = Math.random();
    let selectedCards = [];
    
    if (strategy < 0.25) {
        selectedCards = this.generateStraight();
    } else if (strategy < 0.45) {
        selectedCards = this.generateFlush();
    } else if (strategy < 0.55) {
        selectedCards = this.generateFullHouse();
    } else if (strategy < 0.60) {
        selectedCards = this.generateFourOfAKind();
    } else if (strategy < 0.70) {
        selectedCards = this.generateStraightFlush();
    } else if (strategy < 0.72) {
        selectedCards = this.generateRoyalFlush();
    } else if (strategy < 0.82) {
        selectedCards = this.generatePair();
    } else if (strategy < 0.92) {
        selectedCards = this.generateTwoPairs();
    } else {
        selectedCards = this.generateNoGame();
    }
    
    this.displayCards(selectedCards);
    this.startTimer();
};

PokerCombinations.prototype.generateStraight = function() {
    const startRank = Math.floor(Math.random() * 9) + 2;
    const straightRanks = [];
    for (let i = 0; i < 5; i++) {
        straightRanks.push(startRank + i);
    }
    
    const straightCards = [];
    straightRanks.forEach(rank => {
        const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
        const rankStr = rank === 11 ? 'J' : rank === 12 ? 'Q' : rank === 13 ? 'K' : rank === 14 ? 'A' : rank.toString();
        straightCards.push({ rank: rankStr, suit });
    });
    
    const remainingDeck = this.deck.filter(card => 
        !straightCards.some(sc => sc.rank === card.rank && sc.suit === card.suit)
    );
    
    return [...straightCards, ...remainingDeck.slice(0, 2)];
};

PokerCombinations.prototype.generateFlush = function() {
    const flushSuit = this.suits[Math.floor(Math.random() * this.suits.length)];
    const flushCards = this.deck.filter(card => card.suit === flushSuit).slice(0, 5);
    
    const remainingDeck = this.deck.filter(card => 
        !flushCards.some(fc => fc.rank === card.rank && fc.suit === card.suit)
    );
    
    return [...flushCards, ...remainingDeck.slice(0, 2)];
};

PokerCombinations.prototype.generateFullHouse = function() {
    const tripleRank = Math.floor(Math.random() * 13) + 2;
    let pairRank = Math.floor(Math.random() * 13) + 2;
    while (pairRank === tripleRank) {
        pairRank = Math.floor(Math.random() * 13) + 2;
    }
    
    const tripleCards = this.deck.filter(card => {
        const rankValue = this.getRankValue(card.rank);
        return rankValue === tripleRank;
    }).slice(0, 3);
    
    const pairCards = this.deck.filter(card => {
        const rankValue = this.getRankValue(card.rank);
        return rankValue === pairRank;
    }).slice(0, 2);
    
    const remainingDeck = this.deck.filter(card => 
        ![...tripleCards, ...pairCards].some(fc => fc.rank === card.rank && fc.suit === card.suit)
    );
    
    return [...tripleCards, ...pairCards, ...remainingDeck.slice(0, 2)];
};

PokerCombinations.prototype.generateFourOfAKind = function() {
    const fourRank = Math.floor(Math.random() * 13) + 2;
    const fourCards = this.deck.filter(card => {
        const rankValue = this.getRankValue(card.rank);
        return rankValue === fourRank;
    }).slice(0, 4);
    
    const remainingDeck = this.deck.filter(card => 
        !fourCards.some(fc => fc.rank === card.rank && fc.suit === card.suit)
    );
    
    return [...fourCards, ...remainingDeck.slice(0, 3)];
};

PokerCombinations.prototype.generateStraightFlush = function() {
    const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
    const startRank = Math.floor(Math.random() * 9) + 2;
    
    const straightFlushCards = [];
    for (let i = 0; i < 5; i++) {
        const rank = startRank + i;
        const rankStr = rank === 11 ? 'J' : rank === 12 ? 'Q' : rank === 13 ? 'K' : rank === 14 ? 'A' : rank.toString();
        straightFlushCards.push({ rank: rankStr, suit });
    }
    
    const remainingDeck = this.deck.filter(card => 
        !straightFlushCards.some(sfc => sfc.rank === card.rank && sfc.suit === card.suit)
    );
    
    return [...straightFlushCards, ...remainingDeck.slice(0, 2)];
};

PokerCombinations.prototype.generateRoyalFlush = function() {
    const suit = this.suits[Math.floor(Math.random() * this.suits.length)];
    const royalFlushCards = [
        { rank: '10', suit },
        { rank: 'J', suit },
        { rank: 'Q', suit },
        { rank: 'K', suit },
        { rank: 'A', suit }
    ];
    
    const remainingDeck = this.deck.filter(card => 
        !royalFlushCards.some(rfc => rfc.rank === card.rank && rfc.suit === card.suit)
    );
    
    return [...royalFlushCards, ...remainingDeck.slice(0, 2)];
};

PokerCombinations.prototype.generatePair = function() {
    const pairRank = Math.floor(Math.random() * 13) + 2;
    const pairCards = this.deck.filter(card => {
        const rankValue = this.getRankValue(card.rank);
        return rankValue === pairRank;
    }).slice(0, 2);
    
    const remainingDeck = this.deck.filter(card => 
        !pairCards.some(pc => pc.rank === card.rank && pc.suit === card.suit)
    );
    
    return [...pairCards, ...remainingDeck.slice(0, 5)];
};

PokerCombinations.prototype.generateTwoPairs = function() {
    const pair1Rank = Math.floor(Math.random() * 13) + 2;
    let pair2Rank = Math.floor(Math.random() * 13) + 2;
    while (pair2Rank === pair1Rank) {
        pair2Rank = Math.floor(Math.random() * 13) + 2;
    }
    
    const pair1Cards = this.deck.filter(card => {
        const rankValue = this.getRankValue(card.rank);
        return rankValue === pair1Rank;
    }).slice(0, 2);
    
    const pair2Cards = this.deck.filter(card => {
        const rankValue = this.getRankValue(card.rank);
        return rankValue === pair2Rank;
    }).slice(0, 2);
    
    const remainingDeck = this.deck.filter(card => 
        ![...pair1Cards, ...pair2Cards].some(pc => pc.rank === card.rank && pc.suit === card.suit)
    );
    
    return [...pair1Cards, ...pair2Cards, ...remainingDeck.slice(0, 3)];
};

PokerCombinations.prototype.generateNoGame = function() {
    const highCards = this.deck.filter(card => {
        const rank = card.rank;
        return rank === 'A' || rank === 'K' || rank === 'Q' || rank === 'J' || rank === '10';
    }).slice(0, 7);
    
    return highCards.length === 7 ? highCards : this.deck.slice(0, 7);
};
