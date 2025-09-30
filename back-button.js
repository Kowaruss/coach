// Единый компонент кнопки Назад
function createBackButton() {
    // Определяем правильный путь назад в зависимости от текущей страницы
    let backPath = '../index.html';
    
    // Если мы на странице математики, нужен другой путь
    if (window.location.pathname.includes('/math/')) {
        backPath = '../index.html';
    } else if (window.location.pathname.includes('/roulette/') || 
               window.location.pathname.includes('/poker/')) {
        backPath = '../index.html';
    }
    
    // Создаем кнопку назад
    const backButton = document.createElement('a');
    backButton.href = backPath;
    backButton.className = 'back-button';
    backButton.innerHTML = '<span class="back-arrow">&lt;</span>';
    
    // Вставляем кнопку в начало body
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(backButton, container.firstChild);
    }
}

// Создаем кнопку при загрузке страницы
document.addEventListener('DOMContentLoaded', createBackButton);
