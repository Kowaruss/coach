class ImagesGame {
    constructor() {
        this.imageContent = document.getElementById('imageContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Список картинок (будет автоматически определяться)
        this.images = [];
        this.currentImage = null;
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextImage()
        );
        
        this.init();
    }
    
    async init() {
        await this.loadImagesList();
        this.nextImage();
    }
    
    async loadImagesList() {
        // Здесь будет логика автоматического определения картинок
        // Пока используем статический список из 11 картинок
        this.images = [
            '25.jpeg', '30.jpeg', '35.jpeg', '40.jpeg', '45.jpeg',
            '50.jpeg', '51_1.jpeg', '51_2.jpeg', '55.jpeg', '60.jpeg', '75.jpeg'
        ];
    }
    
    getImageNumber(filename) {
        // Из "25.jpeg" получаем 25, из "51_2.jpeg" получаем 51
        return filename.split('_')[0].split('.')[0];
    }
    
    nextImage() {
        // Выбираем случайную картинку
        const randomIndex = Math.floor(Math.random() * this.images.length);
        const imageFile = this.images[randomIndex];
        this.currentImage = imageFile;
        
        // Показываем картинку
        const imageUrl = `https://kowaruss.github.io/coach/roulette/images/${imageFile}`;
        this.imageContent.innerHTML = `<img src="${imageUrl}" alt="Картинка ${imageFile}">`;
        
        // Скрываем ответ
        this.answerElement.innerHTML = this.getImageNumber(imageFile);
        this.answerElement.classList.remove('show');
        this.actionButton.reset();
    }
    
    showAnswer() {
        this.answerElement.classList.add('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImagesGame();
});
