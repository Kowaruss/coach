function generateScenario4(bet) {
    // Случайное число z от 1 до 7
    const z = Math.floor(Math.random() * 7) + 1;
    
    let text = '';
    let stake = 0;
    let payout = 0;
    
    if (z === 1) {
        text = `Комплит 0 по ${bet}`;
        stake = 17 * bet;
        payout = 235 * bet;
    } 
    else if (z === 2) {
        const h = [1, 3][Math.floor(Math.random() * 2)];
        text = `Комплит ${h} по ${bet}`;
        stake = 27 * bet;
        payout = 297 * bet;
    }
    else if (z === 3) {
        text = `Комплит 2 по ${bet}`;
        stake = 36 * bet;
        payout = 396 * bet;
    }
    else if (z === 4) {
        const h = [34, 36][Math.floor(Math.random() * 2)];
        text = `Комплит ${h} по ${bet}`;
        stake = 18 * bet;
        payout = 198 * bet;
    }
    else if (z === 5) {
        text = `Комплит 35 по ${bet}`;
        stake = 24 * bet;
        payout = 264 * bet;
    }
    else if (z === 6) {
        const hArray = [4,6,7,9,10,12,13,15,16,18,19,21,22,24,35,27,28,30,31,33];
        const h = hArray[Math.floor(Math.random() * hArray.length)];
        text = `Комплит ${h} по ${bet}`;
        stake = 30 * bet;
        payout = 294 * bet;
    }
    else if (z === 7) {
        const hArray = [5,8,11,14,17,20,23,26,29,32];
        const h = hArray[Math.floor(Math.random() * hArray.length)];
        text = `Комплит ${h} по ${bet}`;
        stake = 40 * bet;
        payout = 392 * bet;
    }
    
    return {
        text: text,
        answer: `<span class="label">Ставка:</span> ${formatNumber(stake)}<br><span class="label">Выплата:</span> ${formatNumber(payout)}`
    };
}
