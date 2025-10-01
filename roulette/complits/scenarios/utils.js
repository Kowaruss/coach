// Функция для форматирования чисел с разделителями тысяч
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
