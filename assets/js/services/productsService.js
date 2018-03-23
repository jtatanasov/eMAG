function loadProducts(path) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;

        xhr.open("GET", path, true);
        xhr.send(null);

        xhr.addEventListener("load", function () {
            var data = JSON.parse(xhr.responseText);
            resolve(data);
            reject(xhr.statusText);
        });
    });
}

var productsService = (function () {
    function ProductsList() {
        var self = this;
        var path = "/assets/data/products.json"
        this._productsList = null;
        loadProducts(path).then(function (data) {
            self._productsList = data;
            self.cathegories = [];
            self._productsList.forEach(el => {
                if (!self.cathegories.some(cath => cath === el.cathegory)) {
                    self.cathegories.push(el.cathegory);
                }
            });
        }).catch(function (error) {
            throw new Error("Error occured: " + error);
        });
    }

    ProductsList.prototype.getProduct = function (name) {
        return this._productsList.find(el => (el.name === name));
    }


    ProductsList.prototype.buyProduct = function (name, quantity) {
        var product = this.getProduct(name);
        if ((product.availability) && (product.quantity >= quantity)) {
            product.quantity -= quantity;
            if (product.quantity <= 0) {
                product.availability = false;
            }
        } else {
            throw new Error("This product (or the amount you're looking to buy) is not available at the moment: " + name);
        }
    }

    ProductsList.prototype.getProductsInCathegory = function (cathegory) {
        return this._productsList.filter(el => el.cathegory === cathegory);
    }

    ProductsList.prototype.getSubcathegories = function (cathegory) {
        var subcathegories = [];
        this.getProductsInCathegory(cathegory).forEach(el => {
            if (!subcathegories.some(sub => sub === el.subcathegory)) {
                subcathegories.push(el.subcathegory);
            };
        });
        return subcathegories;
    }

    ProductsList.prototype.getProductsInSubcathegory = function (catehgory, subcathegory) {
        var products = this.getProductsInCathegory(catehgory);
        return products.filter(el => el.subcathegory === subcathegory);
    }

    ProductsList.prototype.getTypesInSubcathegory = function (cathegory, subcathegory) {
        var types = [];
        this.getProductsInSubcathegory(cathegory, subcathegory).forEach(el => {
            if (!types.some(tp => tp === el.type)) {
                types.push(el.type);
            };
        });
        return types;
    }

    ProductsList.prototype.getTypesOfProducts = function (cathegory, subcathegory, type) {
        var products = this.getProductsInSubcathegory(cathegory, subcathegory);
        return products.filter(el => el.type === type);
    }

    ProductsList.prototype.sortLowestPrice = function (products) {
        var currentProducts = products.slice();
        return currentProducts.sort((a, b) => {
            var p1 = Number(a.price);
            var p2 = Number(b.price);
            if (p1 > p2) {
                return 1;
            }
            if (p1 < p2) {
                return -1;
            }
            if (p1 == p2) {
                return 0;
            }
        })
    }

    ProductsList.prototype.sortHighestPrice = function (products) {
        var currentProducts = products.slice();
        return currentProducts.sort((a, b) => {
            var p1 = Number(a.price);
            var p2 = Number(b.price);
            if (p1 < p2) {
                return 1;
            }
            if (p1 > p2) {
                return -1;
            }
            if (p1 == p2) {
                return 0;
            }
        })
    }

    ProductsList.prototype.showAvailable = function (products) {
        return products.filter(el => el.availability);
    }

    ProductsList.prototype.filterByBrand = function (products, brand) {
        var currentProducts = products.slice();
        return currentProducts.filter(el => el.brand === brand);
    }

    ProductsList.prototype.availableBrands = function (products) {
        var brands = [];
        products.forEach(el => {
            if (!brands.some(brand => brand === el.brand)) {
                brands.push(el.brand);
            }
        });

        return brands;
    }
    return new ProductsList();
})();


// var _productsList = null;
// var products = {};
// var path = "/assets/data/products.json"
// function loadProducts(path) {
//     return new Promise(function (resolve, reject) {
//         var xhr = new XMLHttpRequest;

//         xhr.open("GET", path, true);
//         xhr.send(null);

//         xhr.addEventListener("load", function () {
//             var data = JSON.parse(xhr.responseText);
//             resolve(data);
//             reject(xhr.statusText);
//         });
//     });
// }

// loadProducts(path).then(function (data) {
//     _productsList = data;
// }).catch(function (error) {
//     throw new Error("Error occured: " + error);
// });


