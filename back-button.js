// Единый компонент кнопки Назад
document.addEventListener('DOMContentLoaded', function() {
    // Создаем кнопку назад
    const backButton = document.createElement('a');
    backButton.href = '../index.html';
    backButton.className = 'back-button';
    backButton.innerHTML = '<span class="back-arrow">&lt;</span>';
    
    // Вставляем кнопку в начало body
    document.body.insertBefore(backButton, document.body.firstChild);
});
