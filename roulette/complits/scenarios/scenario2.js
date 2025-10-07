function generateScenario2(bet) {
    const sixLineMultipliers = {
        'first': 76,    // для 1-6
        'last': 60,     // для 31-36  
        'other': 80     // для 7-12
    };
    
    // Варианты six line
    const sixLineTypes = [
        { name: "Комплит Six Line 1 - 6", type: "first" },
        { name: "Комплит Six Line 7 - 12", type: "other" },
        { name: "Комплит Six Line 31 - 36", type: "last" }
    ];
    
    // Выбираем случайный six line
    const selectedSixLine = sixLineTypes[Math.floor(Math.random() * sixLineTypes.length)];
    
    // Определяем ставку в зависимости от выбранного six line
    let stake = 0;
    if (selectedSixLine.type === "first") {
        stake = sixLineMultipliers.first * bet;
    } else if (selectedSixLine.type === "last") {
        stake = sixLineMultipliers.last * bet;
    } else {
        stake = sixLineMultipliers.other * bet;
    }
    
    return {
        text: `${selectedSixLine.name}<br>по ${bet}`,
        answer: `<span class="label">Ставка:</span><br>${formatNumber(stake)}<br><span class="label">Выплата:</span><br>Комплит выпавшего номера по ${bet}`
    };
}
