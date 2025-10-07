function generateScenario3(bet) {
    const streetMultipliers = {
        'first': 46,    // для 1-3
        'last': 30,     // для 34-36
        'other': 50     // для 13-15
    };
    
    // Варианты street
    const streetTypes = [
        { name: "Комплит Streets 1 - 3", type: "first" },
        { name: "Комплит Streets 13 - 15", type: "other" },
        { name: "Комплит Streets 34 - 36", type: "last" }
    ];
    
    // Выбираем случайный street
    const selectedStreet = streetTypes[Math.floor(Math.random() * streetTypes.length)];
    
    // Определяем ставку в зависимости от выбранного street
    let stake = 0;
    if (selectedStreet.type === "first") {
        stake = streetMultipliers.first * bet;
    } else if (selectedStreet.type === "last") {
        stake = streetMultipliers.last * bet;
    } else {
        stake = streetMultipliers.other * bet;
    }
    
    return {
        text: `${selectedStreet.name}<br>по ${bet}`,
        answer: `<span class="label">Ставка:</span><br>${formatNumber(stake)}<br><span class="label">Выплата:</span><br>Комплит выпавшего номера по ${bet}`
    };
}
