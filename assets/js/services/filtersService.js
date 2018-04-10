var filtersService = (function(){

    Filter.nextID = 1;

    function FilterService(){
        this.activeFilters = [];
        this.allFilters = [];
        this.brandsFilter = {
            activeBrands: 0,
            availableBrands: [],
            allBrands: []
        }
    }

    function Filter(name, func){
        this.name = name;
        this.pass = func;
        this.id = Filter.nextID++;
    }

    function Brand(name, arr){
        this.brandName = name;
        this.brandProducts = arr; 
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
    
    FilterService.prototype.addABrand = function(products, name){
        var arr = products.filter(el => el.brand === name);
        this.brandsFilter.allBrands.push(new Brand(name, arr));
    }

    FilterService.prototype.addAvailableBrand = function(name){
        var toPush = this.brandsFilter.allBrands.find(el => el.brandName === name);
        this.brandsFilter.availableBrands.push(toPush);
        this.brandsFilter.activeBrands++;
    }

    FilterService.prototype.removeAvailableBrand = function(name){
        var index = this.brandsFilter.availableBrands.findIndex(el => el.brandName === name);
        if(index >= 0){
            this.brandsFilter.availableBrands.splice(index, 1);
            this.brandsFilter.activeBrands--;
        }
    }

    FilterService.prototype.getAllAvailableBrandsProducts = function(){
        var toReturn = [];
        this.brandsFilter.availableBrands.forEach(br => br.brandProducts.forEach(pr => toReturn.push(pr)));
        return toReturn;
    }

    FilterService.prototype.clearAllBrands = function(){
        this.brandsFilter.allBrands = [];
        // this.brandsFilter.availableBrands = [];
        // this.activeBrands = 0;
    }

    var toReturn = new FilterService();

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
