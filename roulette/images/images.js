class ImagesGame {
    constructor() {
        this.imageContent = document.getElementById('imageContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Список картинок с правильным расширением .jpg
        this.images = [
            '25.jpg', '30.jpg', '35.jpg', '40.jpg', '45.jpg',
            '50.jpg', '51_1.jpg', '51_2.jpg', '55.jpg', '60.jpg', '75.jpg'
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
