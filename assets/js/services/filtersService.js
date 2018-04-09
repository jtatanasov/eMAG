var filtersService = (function(){

    Filter.nextID = 1;

    function FilterService(){
        this.activeFilters = [];
        this.allFilters = [];
        this.distributorsFilter = {
            activeFilters: 0,
            filteredProducts: [],
            availableFilters: []
        }
    }

    function Filter(name, func){
        this.name = name;
        this.pass = func;
        this.id = Filter.nextID++;
    }

    FilterService.prototype.createFilter = function(name, func){
        this.allFilters.push(new Filter(name, func));
    }

    FilterService.prototype.findFilter = function(name){
        return this.allFilters.find(el => el.name === name);
    }

    FilterService.prototype.findFilterIndex = function(name){
        return this.allFilters.findIndex(el => el.name === name);
    }

    FilterService.prototype.findActiveFilter = function(name){
        return this.activeFilters.findIndex(el => el.name === name);
    }

    FilterService.prototype.activateFilter = function(name){
        var index = this.findFilterIndex(name);
        if(this.activeFilters.findIndex(el => el.name === name) >= 0){
        } else {
            var toPush = this.allFilters[index]
            this.activeFilters.push(toPush);
        }
    }

    FilterService.prototype.deactivateFilter = function(name){
        var index = this.findActiveFilter(name);
        if(index >= 0){
            this.activeFilters.splice(index, 1);
        }
    }

    FilterService.prototype.filterArray = function(arr){
        var filteredArr = arr;
        this.activeFilters.forEach(el => {
            filteredArr = el.pass(filteredArr);
        });
        return filteredArr;
    }

    var toReturn = new FilterService();

    // toReturn.createFilter("sortLowestPrice", function(products){
    //     var currentProducts = products.slice();
    //     return currentProducts.sort((a, b) => {
    //         var p1 = Number(a.price);
    //         var p2 = Number(b.price);
    //         if (p1 > p2) {
    //             return 1;
    //         }
    //         if (p1 < p2) {
    //             return -1;
    //         }
    //         if (p1 == p2) {
    //             return 0;
    //         }
    //     })
    // });
    
    // toReturn.createFilter("sortHighestPrice", function(products){
    //     var currentProducts = products.slice();
    //     return currentProducts.sort((a, b) => {
    //         var p1 = Number(a.price);
    //         var p2 = Number(b.price);
    //         if (p1 < p2) {
    //             return 1;
    //         }
    //         if (p1 > p2) {
    //             return -1;
    //         }
    //         if (p1 == p2) {
    //             return 0;
    //         }
    //     })
    // });

    toReturn.createFilter("showAvailable", function(products){
        return products.filter(el => el.availability);
    })
    
    toReturn.createFilter("availableBrands", function (products) {
        var brands = [];
        products.forEach(el => {
            if (!brands.some(brand => brand === el.brand)) {
                brands.push(el.brand);
            }
        });

        return brands;
    });

    toReturn.createFilter("filterByBrand", function (products, brand) {
        var currentProducts = products.slice();
        return currentProducts.filter(el => el.brand === brand);
    });

    toReturn.createFilter("allProductsOnSale", function () {
        return this._productsList.filter(el => el.onSale);
    });

    toReturn.createFilter("productsOnSale", function (products) {
        return products.filter(el => el.onSale);
    });

    return toReturn;
})();

// arr = [{name: "samsung", availability: true},{name: "nokia", availability: true}];
// availableProducts = filtersService.findFilter("showAvailable").pass(arr);
// console.log(availableProducts)
