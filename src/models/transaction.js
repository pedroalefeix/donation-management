class Transaction {
    constructor(id, category, product, quantity, date, validity) {
        this.id = id;
        this.category = category;
        this.product = product;
        this.quantity = quantity;
        this.date = date;
        this.validity = validity;
    }
}

export default Transaction;