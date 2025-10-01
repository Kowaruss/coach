function generateScenario2(bet) {
    const sixLineMultipliers = {'first': 76, 'last': 60, 'other': 80};
    const types = ['first', 'last', 'other', 'other', 'other', 'other'];
    const sixLineType = types[Math.floor(Math.random() * types.length)];
    
    let stake = 0;
    if (sixLineType === 'first') stake = sixLineMultipliers.first * bet;
    else if (sixLineType === 'last') stake = sixLineMultipliers.last * bet;
    else stake = sixLineMultipliers.other * bet;
    
    const firstStake = formatNumber(sixLineMultipliers.first * bet);
    const lastStake = formatNumber(sixLineMultipliers.last * bet);
    const otherStake = formatNumber(sixLineMultipliers.other * bet);
    
    return {
        text: `Комплит six line<br>по ${bet}`,
        answer: `<span class="label">Ставка:</span><br>первый six line ${firstStake}<br>последний six line ${lastStake}<br>остальные ${otherStake}<br><span class="label">Выплата:</span> комплит выпавшего номера по ${bet}`
    };
}
