// Функция создания HTML карты
function createCardElement(card, index, isBack = false) {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${isBack ? 'card-back' : 'card-front'}`;
    
    // Базовые размеры карты при 100%
    const baseWidth = 80;
    const baseHeight = 120;
    
    // Наезд 70% - видимая часть 30%
    const visibleWidth = baseWidth * 0.3; // 24px видимой ширины
    const visibleHeight = baseHeight * 0.3; // 36px видимой высоты
    
    // Вторая карта по центру, остальные смещаются относительно неё
    // index: 0,1,2,3 → смещение: +1, 0, -1, -2
    const positionIndex = index - 1;
    const offsetX = positionIndex * -visibleWidth; // Смещение по горизонтали
    const offsetY = index * visibleHeight; // Смещение вниз
    
    cardElement.style.left = `calc(50% + ${offsetX}px)`;
    cardElement.style.top = `${offsetY}px`;
    cardElement.style.zIndex = index;
    
    if (!isBack) {
        cardElement.innerHTML = `
            <div class="card-corner ${getSuitColor(card.suit)}">
                ${card.value}<br>${card.suit}
            </div>
            <div class="card-suit ${getSuitColor(card.suit)}">${card.suit}</div>
            <div class="card-corner bottom ${getSuitColor(card.suit)}">
                ${card.value}<br>${card.suit}
            </div>
        `;
    }
    
    return cardElement;
}

// Функция обновления размера карт (100-140% с шагом 10)
function updateCardSize() {
    const cardElements = cardsContainer.querySelectorAll('.card');
    const scale = settings.cardSize / 100;
    
    // Базовые размеры с учетом масштаба
    const scaledWidth = 80 * scale;
    const scaledHeight = 120 * scale;
    
    // Видимая часть 30% от масштабированных размеров
    const visibleWidth = scaledWidth * 0.3;
    const visibleHeight = scaledHeight * 0.3;
    
    cardElements.forEach((cardElement, index) => {
        // Вторая карта по центру, остальные смещаются относительно неё
        const positionIndex = index - 1;
        const offsetX = positionIndex * -visibleWidth;
        const offsetY = index * visibleHeight;
        
        cardElement.style.transform = `scale(${scale})`;
        cardElement.style.left = `calc(50% + ${offsetX}px)`;
        cardElement.style.top = `${offsetY}px`;
    });
}
