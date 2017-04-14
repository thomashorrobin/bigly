class Namespace {
    constructor(name){
        this.name = name;
        this.type = 'namespace';
        this.items = [];
    }
    addItem(item){
        this.items.push(item);
    }
    getItem(name){
        let returnItem = null;
        this.items.forEach(function(item) {
            if (item.name === name) {
                returnItem = item;
            }
        }, this);
        if (returnItem == null) {
            throw new Error('HUGE FUCKUP');
        } else {
            return returnItem;
        }
    }
}

module.exports = Namespace;