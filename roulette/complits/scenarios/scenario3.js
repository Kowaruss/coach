function generateScenario3(bet) {
    const streetMultipliers = {
        '1-3': 46,
        '34-36': 30,
        'other': 50
    };
    
    const types = ['1-3', '34-36', 'other', 'other', 'other', 'other'];
    const streetType = types[Math.floor(Math.random() * types.length)];
    
    let stake = 0;
    if (streetType === '1-3') stake = streetMultipliers['1-3'] * bet;
    else if (streetType === '34-36') stake = streetMultipliers['34-36'] * bet;
    else stake = streetMultipliers.other * bet;
    
    const stake13 = formatNumber(streetMultipliers['1-3'] * bet);
    const stake3436 = formatNumber(streetMultipliers['34-36'] * bet);
    const stakeOther = formatNumber(streetMultipliers.other * bet);
    
    return {
        text: `Комплит Street<br>по ${bet}`,
        answer: `<span class="label">Ставка:</span><br>Street 1-3 — ${stake13}<br>Street 34-36 — ${stake3436}<br>Остальные ${stakeOther}<br><span class="label">Выплата:</span> комплит выпавшего номера по ${bet}`
    };
}
