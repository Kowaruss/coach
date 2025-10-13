class ImagesGame {
    constructor() {
        this.imageContent = document.getElementById('imageContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Список картинок
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
        return filename.split('_')[0].split('.')[0];
    }
    
    nextImage() {
        const randomIndex = Math.floor(Math.random() * this.images.length);
        const imageFile = this.images[randomIndex];
        this.currentImage = imageFile;
        
        // Отладка
        console.log('Пытаюсь загрузить:', imageFile);
        
        // Показываем картинку
        const img = new Image();
        img.src = imageFile;
        img.alt = "Картинка " + imageFile;
        img.onload = () => {
            console.log('Картинка загружена:', imageFile);
            this.imageContent.innerHTML = '';
            this.imageContent.appendChild(img);
        };
        img.onerror = () => {
            console.error('Ошибка загрузки:', imageFile);
            this.imageContent.innerHTML = '❌ Ошибка загрузки: ' + imageFile;
        };
        
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
