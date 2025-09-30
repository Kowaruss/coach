// Этот файл пока пустой, но мы подготовим его для будущего функционала
console.log('Сайт загружен!');

// Добавим простую анимацию для кнопок при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach((button, index) => {
        // Добавляем небольшую задержку для каждой кнопки
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 300 * index);
    });
});

// Функция для вибрации на мобильных устройствах (если поддерживается)
function buttonVibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Добавляем обработчики для кнопок
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Добавляем эффект нажатия
        this.style.transform = 'scale(0.95)';
        buttonVibrate();
        
        // Возвращаем исходный размер через короткое время
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});
