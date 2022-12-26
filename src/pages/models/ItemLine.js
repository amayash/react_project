export default class ItemLine {
    constructor(image, name, type, price, count, id) {
        this.image = image;
        this.name = name;
        this.type = type;
        this.count = parseInt(count);
        this.price = parseFloat(price).toFixed(2);
        this.id = parseInt(id);
    }
    static createFrom(item) {
        return new ItemLine(item.image, item.name, item.type, item.count, item.price, item.id);
    }
}