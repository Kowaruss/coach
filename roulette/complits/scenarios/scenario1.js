function generateScenario1(bet) {
    const dozensMultipliers = {1: 136, 2: 140, 3: 120};
    const complit = Math.floor(Math.random() * 3) + 1;
    
    return {
        text: `Комплит ${complit} дюжины<br>по ${bet}`,
        answer: `<span class="label">Ставка:</span> ${formatNumber(dozensMultipliers[complit] * bet)}<br><br><span class="label">Выплата:</span> комплит выпавшего номера по ${bet}`
    };
}
