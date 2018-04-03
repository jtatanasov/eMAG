var Cart = (function(event) {
    function Cart() {   
        this.products = [];
        this.productsPrice = 0;
        this.deliveryPrice = 0;
        this.totalPrice = 0;
    }

    Cart.prototype.addToCart = function (product) {
        var containProduct = this.products.some((pr) => pr.name === product.name);
        if (!containProduct) {
            this.products.push(product);
            this.productsPrice = this.calculateProdutsPrice();
            this.deliveryPrice = this.calculateDeliveryPrice();
            this.totalPrice = this.calculateTotalPrice();
        }
    }

    Cart.prototype.removeFromCart = function (productId) {
        var user = this.getUserById(id);

        var index = this.products.findIndex(pr => pr.id == productId);
        this.products.splice(index, 1);
        this.productsPrice = this.calculateProdutsPrice();
        this.deliveryPrice = this.calculateDeliveryPrice();
        this.totalPrice = this.calculateTotalPrice();

    }

    Cart.prototype.emptyCart = function() {
        return new Cart();
    }

    Cart.prototype.calculateProdutsPrice = function () {
        var price = 0;
        this.productsPrice = this.products.reduce(function (price, product) {
            return (price + (+product.price));
        }, 0);
        return (Number(this.productsPrice.toFixed(2)));
    }

    Cart.prototype.calculateDeliveryPrice = function () {
        if (this.productsPrice >= 1000) {
            this.deliveryPrice = null;
        } else {
            this.deliveryPrice = Number((0.05 * this.productsPrice).toFixed(2));
        }
        return this.deliveryPrice;
    }

    Cart.prototype.calculateTotalPrice = function () {
        if (!this.deliveryPrice) {
            this.totalPrice = this.productsPrice;
        } else {
            this.totalPrice = this.productsPrice + this.deliveryPrice;
        }
        
        console.log(this.totalPrice);
        return (Number(this.totalPrice.toFixed(2)));
    }
    return Cart;
})();