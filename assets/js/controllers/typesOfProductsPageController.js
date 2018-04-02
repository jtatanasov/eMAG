function typesOfProductsPageController() {
    showAndHideAside();
    ctgsBtn();
    $("#jssor_1").hide();
    $('#emag-info-nav').hide();

    var clickedType = localStorage.getItem('product');
    clickedType = JSON.parse(clickedType);
    var cathegory = clickedType.cathegory;
    var subcathegory = clickedType.subcathegory;
    var type = clickedType.type;

    var user = sessionStorage.getItem('loggedUser', loggedUser);
    user = JSON.parse(user);

    var productsType = productsService.getTypesOfProducts(cathegory, subcathegory, type);
    var currentProductsOnPage = productsType.slice();
    var currentPageProducts;
    var allTypes = productsService.getTypesInSubcathegory(cathegory, subcathegory);

    var availableProducts = productsService.showAvailable(productsType);
    var productOnSale = productsService.productsOnSale(productsType);
    var brands = productsService.availableBrands(productsType);

    var currentPage = 1;

    var distributorsFilter = {
        filtersOn: 0,
        filteredProducts: [],
        availableFilters: []
    }

    var filtersInUse = {
        availability: {
            inUse: false,
            filter: function(arr){
                return productsService.showAvailable(arr);
            }
        },

        productOnSale: {
            inUse: false,
            filter: function(arr){
                return productsService.productsOnSale(arr)
            }
        },

        brands: {
            inUse: true,
            filter: function(arr){
                return productsService.availableBrands(arr)
            }
        }
    }

    var filterProducts = function(arr){
        var newArr = arr.slice();
        for(var prop in filtersInUse){
            if (prop.inUse){
                newArr = prop.filter(newArr);
            }
        }
        return newArr;
    }

    var clearProductsOnPage = function(){
        $("#available-products").html("");
    }

    var loadProductsOnPage = function(arr){
        var availablePages = productsService.numberOfPages(arr);
        currentPageProducts = productsService.loadProductsOnPage(availablePages, (currentPage - 1));
        currentPageProducts.forEach(el => {
                var toAppend = `<article class="single-product-container" id="${el.id}">
            <div class="single-product-nav">
                <img src="assets/images/icons/gray-heart-icon.png" class="icon" alt="" />
            </div>
            <div class="single-product-img-container">
                <img src="${el.main_url}" class="single-product-image" alt="" />
            </div>       
            <a href="#${el.id}" class="single-product-title">${el.name}</a>`
                if (el.availability) {
                    toAppend += `<p class="single-product-availability, product-available">в наличност</p>`
                } else {
                    toAppend += `<p class="single-product-availability, product-unavailable">изчерпан</p>`
                }

                var price = Number(el.price);
                var whole = Math.floor(price);
                var change = Math.ceil((price - whole) * 100);
                toAppend += `<p class="single-product-price">${whole}<sup>${change}</sup> лв.</p>

            <button class="single-product-buy-button">
                <div class="buy-nav-add-to-cart">
                    <img class="nav-cart-icon" class="icon" src="assets/images/icons/cart-icon.png" alt="" />
                </div>
                <span class="button-text" class="buy-nav-txt"> Добави в количката</span>
            </button>
            </article>`
                $("#available-products").append(toAppend);
        });
        availableProducts = productsService.showAvailable(currentProductsOnPage);
        productOnSale = productsService.productsOnSale(currentProductsOnPage);
        brands = productsService.availableBrands(currentProductsOnPage);
        //filters specifics
            //availability
        $($("#availability-filter ~ span")[0]).html(`(${availableProducts.length})`);
        $($("option[value='available']")[0]).html(`В наличност (${availableProducts.length})`)
            //sale
        $($("#sale-filter ~ span")[0]).html(`(${productOnSale.length})`);
        $($("option[value='sale']")[0]).html(`Промоция (${productOnSale.length})`)
         //brands
        $($("#manufacturer-filter ~ span")[0]).html(`(${brands.length})`);

        //page navigation:
        $($($("#pages-info")[0]).children()[0]).html(`${(currentPage - 1) * currentPageProducts.length + 1}-
        ${currentPage * currentPageProducts.length}`);
        $($($("#pages-info")[0]).children()[1]).html(productsType.length);
        //buttons
        $("#pages-buttons").html(`<button disabled id="back-page">Назад</button><button id="forward-page" disabled>Напред</button>`)
        availablePages.forEach((el, index) => {
            var elToAppend = `<button id="page-${index + 1}">${index + 1}</button>`    
            $(elToAppend).insertAfter("#back-page");
            if ((index + 1) == currentPage) {
                $(`#page-${index + 1}`).addClass("current-page");
            }
            // //TODO: логиката на буферния бутон??
            // if((availablePages.length > 4) && (index )){
            //     $(`<button disabled id="buffer-button">...</button>`).insertBefore(elToAppend);
            // }
        })
        
        //disable buttons
        if (currentPage != 1) {
            $("#back-page").prop('disabled', false);
        } else {
            $("#back-page").prop('disabled', true);
        }
        if (currentPage === availablePages.length) {
            $("#forward-page").prop('disabled', true);
        } else {
            $("#forward-page").prop('disabled', false);
        }
        
        //TODO: придвиживане с бутоните за страниците отдолу
        //TODO: delete filter event listener
        $($(".delete-filter").parent()[0]).on("click", function (event) {
            var filterID = $(event.target).prev("select").attr('id');
            // var filter = event.target.closest("select").id;
            // console.log(filter);
            if(filterID == "availability-select"){
                $("#filters-top-nav-availability").css({"display":"none"});
                $("#availability-filter-list").parent().children("li").toArray().forEach(el => $(el).children().trigger("click"));
            } else {
                $("#filters-top-nav-distributor").css({"display":"none"});
                $("manufacturer-filter-list").parent().children("li").toArray().forEach(el => $(el).children().trigger("click"));
            }

            clearProductsOnPage();
            loadProductsOnPage(currentProductsOnPage);
        })
    }

    
    getTemplate('assets/js/templates/typesOfProductsPage.html')
        .then(function (data) {

            //filling the cathegory and subcathegory fields:
            $('main').html(data);
            $("#cathegory").html(cathegory);
            $("#subcathegory>a").html(subcathegory);
            $("#type").html(type);

            $("#main-container-header>h1").html(`${type}<span>${productsType.length} продукта</span>`);
            

            //load products on page
            // var currentPageProducts = productsService.loadProductsOnPage(availablePages, (currentPage - 1));
            loadProductsOnPage(currentProductsOnPage);

            //filling out side-nav:
            $("#side-nav-main-link").html(subcathegory);
            allTypes.forEach(el => {
                $("#side-nav-types-list").append(`<li class="side-nav-type-option">${el}</li>`);
                if (el == type) {
                    $("#side-nav-types-list").children().last().addClass("type-selected-option");
                }
            });

           
            brands.forEach(el => {
                var elBrandProducts = productsService.productsOfABrand(el);
                $("#manufacturer-filter-list").parent().append(`<li id="${el}-li">
                <input type="checkbox" id="${el}" class="${el}"> ${el}
                    <span class="number-of-results">
                        (${elBrandProducts.length})
                    </span>
                </input>
                </li>`);
                
                $("#distributor-select").append(`
                <option value="${el.toLowerCase()}" class="${el}">${el} <span>(${elBrandProducts.length})</span></option>
                `)

                var forListening = $(`#${el}-li`);
                var checkbox = $(`#${el}`);
                forListening.on("click", function(event){ 
                        if(!(event.target.id == el)){
                            checkbox.trigger("click");
                        }   
                    });
                $(checkbox).on("change", function(){
                    var isChecked = $(checkbox).is(":checked");
                    if(isChecked){
                        $("#filters-top-nav-distributor").css({"display": "inline-block"});
                        if(($('#hr-filters-nav-top').css('display') == 'none')){
                            $("#hr-filters-nav-top").css({"display": "inline-block"})
                        }
                        $($(`option[value='${el.toLowerCase()}']`)[0]).prop("selected", true);
                        distributorsFilter.filtersOn++;
                        distributorsFilter.availableFilters.push({
                            brandName: el,
                            brandProducts: elBrandProducts
                        })
                        elBrandProducts.forEach(br => distributorsFilter.filteredProducts.push(br));
                        clearProductsOnPage();
                        currentProductsOnPage = distributorsFilter.filteredProducts.slice();
                        loadProductsOnPage(currentProductsOnPage);
                    } else {
                        distributorsFilter.filtersOn--;
                        if(distributorsFilter.filtersOn <= 0){
                            $("#filters-top-nav-distributor").css({"display": "hidden"});
                            if($("#filters-top-nav-availability").css({"display":"hidden"})){
                                ($('#hr-filters-nav-top').css('display') == 'none');
                            }
                            distributorsFilter.availableFilters = [];
                            distributorsFilter.filteredProducts = [];

                            currentProductsOnPage = productsType.slice();
                            clearProductsOnPage();
                            loadProductsOnPage(currentProductsOnPage);
                        } else {
                            var delIndex = distributorsFilter.availableFilters.findIndex(element => element.brandName == el);
                            if(delIndex >= 0){
                                distributorsFilter.availableFilters.splice(delIndex, 1);
                            }

                            distributorsFilter.filteredProducts = [];
                            distributorsFilter.availableFilters.forEach(brand => {
                                brand.brandProducts.forEach(brandProduct => distributorsFilter.filteredProducts.push(brandProduct));
                            });
                            currentProductsOnPage = distributorsFilter.filteredProducts.slice();
                            clearProductsOnPage();
                            loadProductsOnPage(currentProductsOnPage);
                        }                   
                    }

                    if(distributorsFilter.filtersOn > 1){
                        var multipleFilters = $(`<option value="basic" id="basic-distributors-filter" selected disabled>${distributorsFilter.filtersOn} филтри</option>`)
                        // $(multipleFilters).before($($("#distributor-select")[0][0]));
                        $("#distributor-select").prepend(multipleFilters);
                    } else {
                        if($("#basic-distributors-filter").length > 0){
                            $("#basic-distributors-filter").remove();
                        }
                    }
                })
            })


            //sidebar filters listener
                //availability filter

            $("#availability-filter").parent().on("click", function(event){
                 if(!(event.target.id == "availability-filter")){
                    $("#availability-filter").trigger("click")
                }
            })               
            $("#availability-filter").on("change", function(event){
                if($("#availability-filter").is(":checked")){
                    $("#filters-top-nav-availability").css({"display": "inline-block"});
                    if(($('#hr-filters-nav-top').css('display') == 'none')){
                        $("#hr-filters-nav-top").css({"display": "inline-block"})
                    }
                    $($("option[value='available']")[0]).prop("selected", true);
                    if($("#sale-filter").is(":checked")){
                        $("#sale-filter").prop('checked', false);
                    }
                    filtersInUse.availability.inUse = true;
                } else {
                    $("#filters-top-nav-availability").css({"display": "none"});
                    if(!($('#hr-filters-nav-top').css('display') == 'none') 
                    && ($("#filters-top-nav-distributor").css('display') == 'none')){
                        $('#hr-filters-nav-top').css({"display": "none"})
                    }
                    filtersInUse.availability.inUse = false;
                }
                // currentProductsOnPage = filterProducts(productsType);
                clearProductsOnPage();
                // let temp = productsService.showAvailable(currentProductsOnPage);
                let temp = filterProducts(currentProductsOnPage);
                loadProductsOnPage(temp);
            })

            $("#sale-filter").parent().on("click", function(event){
                if(!(event.target.id == "sale-filter")){
                    $("#sale-filter").trigger("click");
                }
            })
            $("#sale-filter").on("change", function(event){
                if($("#sale-filter").is(":checked")){
                    $("#filters-top-nav-availability").css({"display": "inline-block"});
                    if(($('#hr-filters-nav-top').css('display') == 'none')){
                        $("#hr-filters-nav-top").css({"display": "inline-block"});             
                    }
                    $($("option[value='sale']")[0]).prop("selected", true);
                    if($("#availability-filter").is(":checked")){
                        $("#availability-filter").prop('checked', false);
                    }
                    filtersInUse.productOnSale.inUse = true;
                } else {
                    $("#filters-top-nav-availability").css({"display": "none"});
                    if(!($('#hr-filters-nav-top').css('display') == 'none') 
                    && ($("#filters-top-nav-distributor").css('display') == 'none')){
                        $('#hr-filters-nav-top').css({"display": "none"})
                    }
                    filtersInUse.productOnSale.inUse = false;
                }
                // currentProductsOnPage = filterProducts(productsType);
                clearProductsOnPage();
                // let temp = productsService.productsOnSale(currentProductsOnPage);
                let temp = filterProducts(currentProductsOnPage);
                loadProductsOnPage(temp);
            })

            //sidebar dropdowns animations
            $("#filters-list>ul>h1").on("click", function(event){
                if($(this).parent().hasClass("down")){
                    $(this).parent().removeClass("down");
                    $(this).parent().addClass("up");
                    $(this).parent().children("li").slideUp();
                    $(this).children("img").attr("src", "assets/images/icons/arrow-down.png");
                } else {
                    $(this).parent().removeClass("up");
                    $(this).parent().addClass("down");
                    $(this).parent().children("li").slideDown();
                    $(this).children("img").attr("src", "assets/images/icons/arrow-up.png");
                };
            })
                
            //sort by price:
            $("#price-sort-select").on("change", function(){
                var sel = $("#price-sort-select option:selected").val();
                var sortArr = currentProductsOnPage.slice();
                sortArr = (sel == "lowest") ? productsService.sortLowestPrice(sortArr) : productsService.sortHighestPrice(sortArr);
                clearProductsOnPage();
                loadProductsOnPage(sortArr);
            });

            //adding to cart:
            $(".single-product-buy-button").on("click", function (event) {
                if(sessionStorage.getItem('isLogged')){
                    var productID = event.target.closest("article").id;
                    let product = productsService.getProduct(productID);
                    var currUserCartProducts = user.cart.products;
                    var tmpCart = new Cart();
                    currUserCartProducts.forEach(pr => tmpCart.addToCart(pr));
                    tmpCart.addToCart(product);
                    userService.updateCart(user.id, tmpCart);
                } else {
                    location.replace('#login');
                } 
            })

            //adding to favorites
            $(".single-product-nav").on("click", function (event) {
                event.preventDefault();
                if (sessionStorage.getItem('isLogged')) {
                    let productID = event.target.closest("article").id;
                    let product = productsService.getProduct(productID);
                    userService.addFavourite(user.id, product);
                } else {
                    location.replace('#login');
                }
            })

            //
        })
        .catch(function (error) {
            throw new Error("Error occured " + error)
        });
}
