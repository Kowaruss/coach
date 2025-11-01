class ImageSelector {
    constructor() {
        this.imagePools = {
            3: ['3_1.jpg', '3_2.jpg', '3_3.jpg', '3_4.jpg'],
            4: ['4_1.jpg', '4_2.jpg', '4_3.jpg', '4_4.jpg', '4_5.jpg'],
            5: ['5_1.jpg', '5_2.jpg', '5_3.jpg', '5_4.jpg', '5_5.jpg', '5_6.jpg']
        };
    }
    
    getRandomImage(neighborCount) {
        const pool = this.imagePools[neighborCount];
        if (!pool) return null;
        
        return pool[Math.floor(Math.random() * pool.length)];
    }
    
    getImagePath(imageName) {
        return `images/${imageName}`;
    }
}
