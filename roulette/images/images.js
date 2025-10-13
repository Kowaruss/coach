class ImagesGame {
    constructor() {
        this.imageContent = document.getElementById('imageContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Реальный список картинок из папки
        this.images = [
            '102.jpg', '103.jpg', '25.jpg', '33.jpg', '43.jpg',
            '51.jpg', '51_2.jpg', '52.jpg', '69.jpg', '86.jpg', '77.jpg'
        ];
        this.currentImage = null;
        
        this.actionButton = new ActionButton(
            this.actionBtn,
            () => this.showAnswer(),
            () => this.nextImage()
        );
        
        this.init();
    }
    
    init() {
        this.nextImage();
    }
    
    getImageNumber(filename) {
        // Из "25.jpg" получаем 25, из "51_2.jpg" получаем 51
        return filename.split('_')[0].split('.')[0];
    }
    
    nextImage() {
        // Выбираем случайную картинку
        const randomIndex = Math.floor(Math.random() * this.images.length);
        const imageFile = this.images[randomIndex];
        this.currentImage = imageFile;
        
        // Показываем картинку
        this.imageContent.innerHTML = `<img src="${imageFile}" alt="Картинка ${imageFile}">`;
        
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
