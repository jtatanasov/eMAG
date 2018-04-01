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
    const PRODUCTS_ON_PAGE = 20;
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

    ProductsList.prototype.getProduct = function (id) {
        return this._productsList.find(el => (el.id === id));
    }


    ProductsList.prototype.buyProduct = function (id, quantity) {
        var product = this.getProduct(id);
        if ((product.availability) && (product.quantity >= quantity)) {
            product.quantity -= quantity;
            if (product.quantity <= 0) {
                product.availability = false;
            }
        } else {
            throw new Error("This product (or the amount you're looking to buy) is not available at the moment: " + product.name);
        }
    }

    ProductsList.prototype.getProductsInCathegory = function (cathegory) {
        var toReturn = this._productsList.filter(el => el.cathegory === cathegory);
        return JSON.parse(JSON.stringify(toReturn));
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
        var toReturn = products.filter(el => el.type === type);
        return toReturn;
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

    ProductsList.prototype.productsOfABrand = function (brand) {
        return this._productsList.filter(el => el.brand === brand);
    }

    ProductsList.prototype.allProductsOnSale = function () {
        return this._productsList.filter(el => el.onSale);
    }

    ProductsList.prototype.productsOnSale = function (products) {
        return products.filter(el => el.onSale);
    }

    ProductsList.prototype.numberOfPages = function (productsArray) {
        var productsQuantity = productsArray.length;
        var numberOfPages = Math.ceil(productsQuantity / PRODUCTS_ON_PAGE);
        var pages = [];
        for (var p = 1; p <= numberOfPages; p++) {
            pages.push([]);
        }
        var count = 1;
        productsArray.forEach((el, index) => {
            pages[count - 1].push(el);
            if (index === ((PRODUCTS_ON_PAGE * count) - 1)) {
                count++;
            }
        });

        return pages;
    }

    ProductsList.prototype.loadProductsOnPage = function (pages, page) {
        return pages[page];
    }

    return new ProductsList();
})();
