class VariantManager {
    constructor() {
        this.variants = [new Variant1(), new Variant2()];
    }
    
    getRandomVariant() {
        return this.variants[Math.floor(Math.random() * this.variants.length)];
    }
}
