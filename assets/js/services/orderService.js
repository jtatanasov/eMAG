var Order = (function() {
    function Order() {
        this.products = [];
        this.productsPrice = 0;
        this.deliveryPrice = 0;
        this.totalPrice = 0;
    }

    Order.prototype.calculateProductsPrice = function() {
        var price = 0;
        this.productsPrice = this.products.reduce(function(price, product) {
            return price + product.price;
        }, 0);
        return this.productsPrice;

    }

    Order.prototype.calculateDeliveryPrice = function() { 
        if(this.productsPrice >= 1000) {
            this.deliveryPrice = 0;
        } else {
            this.deliveryPrice = Number((0.05 * this.productsPrice).toFixed(2));
        }
        return this.deliveryPrice;
    }

    Order.prototype.calculateTotalPrice = function() {
        this.totalPrice = this.productsPrice + this.deliveryPrice;
        return this.totalPrice;
    }
    return Order;
});