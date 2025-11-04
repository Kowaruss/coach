class ImagesGame {
    constructor() {
        this.imageContent = document.getElementById('imageContent');
        this.answerElement = document.getElementById('answer');
        this.actionBtn = document.getElementById('actionBtn');
        
        // Реальный список картинок из папки
        this.images = [
            'img/10.jpg', 'img/100.jpg', 'img/102.jpg', 'img/103.jpg', 'img/105.jpg', 'img/106.jpg', 'img/108.jpg', 
            'img/116.jpg', 'img/121.jpg', 'img/123.jpg', 'img/129.jpg', 'img/13.jpg', 'img/130.jpg', 'img/135.jpg', 
            'img/13_2.jpg', 'img/141.jpg', 'img/156.jpg', 'img/16.jpg', 'img/165.jpg', 'img/19.jpg', 'img/19_2.jpg', 
            'img/21.jpg', 'img/24.jpg', 'img/25.jpg', 'img/30.jpg', 'img/33.jpg', 'img/36.jpg', 'img/36_2.jpg', 
            'img/40.jpg', 'img/43.jpg', 'img/43_2.jpg', 'img/43_3.jpg', 'img/45.jpg', 'img/46.jpg', 'img/46_2.jpg', 
            'img/48.jpg', 'img/48_2.jpg', 'img/49.jpg', 'img/51.jpg', 'img/52.jpg', 'img/52_2.jpg', 'img/54.jpg', 
            'img/57.jpg', 'img/58.jpg', 'img/60.jpg', 'img/61.jpg', 'img/61_2.jpg', 'img/65.jpg', 'img/67.jpg', 
            'img/67_2.jpg', 'img/68.jpg', 'img/68_2.jpg', 'img/69.jpg', 'img/71.jpg', 'img/73.jpg', 'img/73_2.jpg', 
            'img/77.jpg', 'img/80.jpg', 'img/80_2.jpg', 'img/81.jpg', 'img/86.jpg', 'img/86_2.jpg', 'img/88.jpg', 
            'img/88_2.jpg', 'img/90.jpg', 'img/93.jpg', 'img/93_2.jpg', 'img/94.jpg', 'img/97.jpg', 'img/99.jpg'
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
        // Из "img/25.jpg" получаем "25", из "img/51_2.jpg" получаем "51"
        const nameWithExtension = filename.split('/')[1]; // "25.jpg" или "51_2.jpg"
        return nameWithExtension.split('_')[0].split('.')[0]; // Убираем "_2" и ".jpg"
    }
    
    nextImage() {
        // Выбираем случайную картинку
        const randomIndex = Math.floor(Math.random() * this.images.length);
        const imageFile = this.images[randomIndex];
        this.currentImage = imageFile;
        
        // Показываем картинку
        this.imageContent.innerHTML = `<img src="${imageFile}" alt="Картинка ${this.getImageNumber(imageFile)}">`;
        
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
