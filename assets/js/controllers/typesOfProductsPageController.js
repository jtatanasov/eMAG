function typesOfProductsPageController() {
    showAndHideAside();
    ctgsBtn();
    searchInput();
    $("#jssor_1").hide();
    $('#emag-info-nav').hide();

    $(function(){
    var clickedType = localStorage.getItem('product');
    clickedType = JSON.parse(clickedType);
    var cathegory = clickedType.cathegory;
    var subcathegory = clickedType.subcathegory;
    var type = clickedType.type;

    var user = sessionStorage.getItem('loggedUser', loggedUser);
    user = JSON.parse(user);

    var productsType = productsService.getTypesOfProducts(cathegory, subcathegory, type);
    var currentAvailableProducts = productsType.slice();
    var currentPageProducts;
    var allTypes = productsService.getTypesInSubcathegory(cathegory, subcathegory);

    var availableProducts = filtersService.findFilter("showAvailable").pass(productsType);
    var productsOnSale = filtersService.findFilter("productsOnSale").pass(productsType);
    var brands = filtersService.findFilter("availableBrands").pass(productsType);

    var currentPage = 1;
    var availablePages;

    var clearProductsOnPage = function(){
        $("#available-products").html("");
    }

    var loadProductsOnPage = function(arr){
        currentAvailableProducts = filtersService.filterArray(productsType);
        availablePages = productsService.numberOfPages(currentAvailableProducts);
        if(filtersService.activeFilters <= 0){
            currentPageProducts = productsType.slice();
        }
        currentPageProducts = productsService.loadProductsOnPage(availablePages, (currentPage - 1));
        if(currentPageProducts != undefined){
            currentPageProducts.forEach(el => {
                var toAppend = `<article class="single-product-container" id="${el.id}">
                <div class="single-product-nav">
                    <img src="assets/images/icons/gray-heart-icon.png" class="icon" alt="" />
                </div>
                <div class="single-product-img-container">
                    <img src="${el.main_url}" class="single-product-image" alt="" />
                </div>       
                <a href="" class="single-product-title">${el.name}</a>`
                    if (el.availability) {
                        toAppend += `<p class="single-product-availability, product-available">в наличност</p>`
                    } else {
                        toAppend += `<p class="single-product-availability, product-unavailable">изчерпан</p>`
                    }

                    var price = Number(el.price);
                    var whole = Math.floor(price);
                    var change = Math.floor((price - whole) * 100);
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
            
            
            var availableProducts = filtersService.findFilter("showAvailable").pass(currentAvailableProducts);
            var productsOnSale = filtersService.findFilter("productsOnSale").pass(currentAvailableProducts);
            var brands = filtersService.findFilter("availableBrands").pass(currentAvailableProducts);

            //add brands side:
            filtersService.clearAllBrands();
            brands.forEach(el => {
                filtersService.addABrand(currentAvailableProducts, el);
            })
            console.log(filtersService.brandsFilter.allBrands); //всички възможни марки 

            //filters specifics
                //availability
            $($("#availability-filter ~ span")[0]).html(`(${availableProducts.length})`);
            $($("option[value='available']")[0]).html(`В наличност (${availableProducts.length})`)
                //sale
            $($("#sale-filter ~ span")[0]).html(`(${productsOnSale.length})`);
            $($("option[value='sale']")[0]).html(`Промоция (${productsOnSale.length})`)
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
                loadProductsOnPage(currentAvailableProducts);
            });
        }
        
        //products listenrs 
            //img
        $(".single-product-image").on("click", function(){
            let currID = $(this).parent().parent()[0].id;
            var updateProduct = JSON.parse(localStorage.getItem('product'));
            updateProduct.id = currID;
            localStorage.setItem("product", JSON.stringify(updateProduct));
            location.replace("#product");
        })
            //title
        $(".single-product-title").on("click", function(event){
            event.preventDefault();
            let currID = $(this).parent()[0].id;
            var updateProduct = JSON.parse(localStorage.getItem('product'));
            updateProduct.id = currID;
            localStorage.setItem("product", JSON.stringify(updateProduct));
            location.replace("#product");
        });
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
            loadProductsOnPage(currentAvailableProducts);

            //filling out side-nav:
            $("#side-nav-main-link").html(subcathegory);
            allTypes.forEach(el => {
                $("#side-nav-types-list").append(`<li class="side-nav-type-option">${el}</li>`);
                if (el == type) {
                    $("#side-nav-types-list").children().last().addClass("type-selected-option");
                }
            });

            //adding event listener to types
            $(".side-nav-type-option").on("click", function(){
                var currType = $(this).html();
                var updateProduct = JSON.parse(localStorage.getItem('product'));
                updateProduct.type = currType;
                localStorage.setItem("product", JSON.stringify(updateProduct));
                location.reload();
            });

            //adding brands        
            //BRANDS BEGINING ++++++++++++++++++++

            // var forListening = $(`#manufacturer-filter-list>li`);
            // var checkbox = $(`#manufacturer-filter-list>li>input[type=checkbox]`);
            
            filtersService.brandsFilter.allBrands.forEach(el => {
                $("#manufacturer-filter-ul").append(`<li id="${el.brandName}-li">
                <input type="checkbox" id="${el.brandName}" class="${el.brandName}"> ${el.brandName}
                    <span class="number-of-results">
                        (${el.brandProducts.length})
                    </span>
                </input>
                </li>`);
                
                $("#distributor-select").append(`
                <option value="${el.brandName.toLowerCase()}" class="${el.brandName}">${el.brandName} <span>(${el.brandProducts.length})</span></option>
                `)
            })



            $(`#manufacturer-filter-ul>li`).on("click", function(event){
                var event = event.originalEvent;
                if(!($(event.target).is("input"))){
                    var id = event.target.id.slice(0, -3);
                    $(`#${id}`).trigger("click");
                }
            });

            $(`#manufacturer-filter-ul>li>input[type=checkbox]`).on("change", function(event){
                var event = event.originalEvent;
                var brandName = event.target.id;
                if($(event.target).is(":checked")){
                    $("#filters-top-nav-distributor").css({"display": "inline-block"});
                    if($('#hr-filters-nav-top').css({'display':'none'})){
                        $("#hr-filters-nav-top").css({"display": "inline-block"})
                    }
                    $($(`option[value='${brandName.toLowerCase()}']`)[0]).prop("selected", true);

                    filtersService.addAvailableBrand(brandName);
                    var currentAvailableProducts = filtersService.getAllAvailableBrandsProducts();
                    clearProductsOnPage();
                    loadProductsOnPage(currentAvailableProducts);
                } else {
                    filtersService.removeAvailableBrand(brandName);
                    console.log(filtersService.brandsFilter.activeBrands)
                    var currentAvailableProducts = filtersService.getAllAvailableBrandsProducts();
                    if(filtersService.brandsFilter.activeFilters <= 0){
                        $("#filters-top-nav-distributor").css({"display": "none"});
                        if($("#filters-top-nav-availability").css({"display":"none"})){
                            ($('#hr-filters-nav-top').css({'display': 'none'}));
                        }
                        currentAvailableProducts = filtersService.filterArray(productsType);
                    }
                    clearProductsOnPage();
                    loadProductsOnPage(currentAvailableProducts);
                }
            })


            // BRANDS END ++++++++++++++++++++++++++++++++

            //sidebar filters listener && top nav
                //availability filter

            $("#availability-select").on("change", function(event){
                var value = $(this).val();
                if(value === "available"){
                    $("#availability-filter").trigger("click");
                };

                if(value === "sale"){
                    $("#sale-filter").trigger("click");
                }
            })
            $("#availability-filter").parent().on("click", function(event){
                 if(!(event.target.id == "availability-filter")){
                    $("#availability-filter").trigger("click")
                }
            });
            
            $("#availability-filter").on("change", function(event){
                var filterName = $(this).parent().attr("class").split(",")[0];
                if($("#availability-filter").is(":checked")){
                    $("#filters-top-nav-availability").css({"display": "inline-block"});
                    if(($('#hr-filters-nav-top').css('display') == 'none')){
                        $("#hr-filters-nav-top").css({"display": "inline-block"})
                    }
                    $($("option[value='available']")[0]).prop("selected", true);
                    if($("#sale-filter").is(":checked")){
                        $("#sale-filter").prop('checked', false);
                    }
                    filtersService.activateFilter(filterName);
                    filtersService.deactivateFilter("productsOnSale");
                } else {
                    $("#filters-top-nav-availability").css({"display": "none"});
                    if(!($('#hr-filters-nav-top').css('display') == 'none') 
                    && ($("#filters-top-nav-distributor").css('display') == 'none')){
                        $('#hr-filters-nav-top').css({"display": "none"})
                    }
                    filtersService.deactivateFilter(filterName);
                }
                // currentAvailableProducts = filterProducts(productsType);
                clearProductsOnPage();
                // let temp = productsService.showAvailable(currentAvailableProducts);    
                let temp = filtersService.filterArray(currentAvailableProducts);
                loadProductsOnPage(temp);
            })

            $("#sale-filter").parent().on("click", function(event){
                if(!(event.target.id == "sale-filter")){
                    $("#sale-filter").trigger("click");
                }
            });

            $("#sale-filter").on("change", function(event){
                var filterName = $(this).parent().attr("class").split(",")[0];
                if($("#sale-filter").is(":checked")){
                    $("#filters-top-nav-availability").css({"display": "inline-block"});
                    if(($('#hr-filters-nav-top').css('display') == 'none')){
                        $("#hr-filters-nav-top").css({"display": "inline-block"});             
                    }
                    $($("option[value='sale']")[0]).prop("selected", true);
                    if($("#availability-filter").is(":checked")){
                        $("#availability-filter").prop('checked', false);
                    }
                    filtersService.activateFilter(filterName);
                    filtersService.deactivateFilter("showAvailable");
                } else {
                    $("#filters-top-nav-availability").css({"display": "none"});
                    if(!($('#hr-filters-nav-top').css('display') == 'none') 
                    && ($("#filters-top-nav-distributor").css('display') == 'none')){
                        $('#hr-filters-nav-top').css({"display": "none"})
                    }
                    filtersService.deactivateFilter(filterName);
                }
                // currentAvailableProducts = filterProducts(productsType);
                clearProductsOnPage();
                // let temp = productsService.productsOnSale(currentAvailableProducts);
                let temp = filtersService.filterArray(currentAvailableProducts);
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

            //clear all filters button
            $("#clear-filters-container").on("click", function(){
                $("input[type='checkbox'").toArray().forEach(el => {
                    if($(el).is(":checked")){
                        $(el).trigger("click");
                    }
                });
                clearProductsOnPage();
                loadProductsOnPage(productsType);
            });
                
            //sort by price:
            $("#price-sort-select").on("change", function(){
                var sel = $("#price-sort-select option:selected").val();
                var sortArr = currentAvailableProducts.slice();
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
    })
}
