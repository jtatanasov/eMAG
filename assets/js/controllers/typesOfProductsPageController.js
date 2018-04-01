var loadProductsOnPage = function(arr){
   
        arr.forEach(el => {
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
                // $(toAppend).insertBefore("#result-pages-nav");
            });
}

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
    var allTypes = productsService.getTypesInSubcathegory(cathegory, subcathegory);
    var availableProducts = productsService.showAvailable(productsType);
    var productOnSale = productsService.productsOnSale(productsType);
    var brands = productsService.availableBrands(productsType);
    var currentPage = 1;
    var availablePages = productsService.numberOfPages(productsType);
    
    getTemplate('assets/js/templates/typesOfProductsPage.html')
        .then(function (data) {

            //filling the cathegory and subcathegory fields:
            $('main').html(data);
            $("#cathegory").html(cathegory);
            $("#subcathegory>a").html(subcathegory);
            $("#type").html(type);

            $("#main-container-header>h1").html(`${type}<span>${productsType.length} продукта</span>`);
            

            //load products on page
            var currentPageProducts = productsService.loadProductsOnPage(availablePages, (currentPage - 1));
            loadProductsOnPage(currentPageProducts);

            //filling out side-nav:
            $("#side-nav-main-link").html(subcathegory);
            allTypes.forEach(el => {
                $("#side-nav-types-list").append(`<li class="side-nav-type-option">${el}</li>`);
                if (el == type) {
                    $("#side-nav-types-list").children().last().addClass("type-selected-option");
                }
            });

            //filters specifics
            //availability
            $($("#availability-filter ~ span")[0]).html(`(${availableProducts.length})`);
            $($("option[value='available']")[0]).html(`В наличност (${availableProducts.length})`)
            //sale
            $($("#sale-filter ~ span")[0]).html(`(${productOnSale.length})`);
            $($("option[value='sale']")[0]).html(`Промоция (${productOnSale.length})`)
            //brands
            $($("#manufacturer-filter ~ span")[0]).html(`(${brands.length})`);
            brands.forEach(el => {
                var elBrandProducts = productsService.productsOfABrand(el);
                $("#manufacturer-filter-list").parent().append(`<li>
                <input type="checkbox" name=""> ${el}
                    <span class="number-of-results">
                        (${elBrandProducts.length})
                    </span>
                </input>
                </li>`);
                    $("#distributor-select").append(`
                <option value="${el.toLowerCase()}">${el} <span>(${elBrandProducts.length})</span></option>
                `)
                })


            //sidebar filters listener
                //availability filter

                $("#availability-filter").parent().on("click", function(event){
                    if(!(event.target.id == "availability-filter")){
                        $("#availability-filter").trigger("click")
                    }
                })

            $("#availability-filter").on("change", function(event){
                // event.preventDefault();
                // $("#availability-filter").trigger("click");
                if($("#availability-filter").is(":checked")){
                    $("#filters-top-nav-availability").css({"display": "inline-block"});
                    if(($('#hr-filters-nav-top').css('display') == 'none')){
                        $("#hr-filters-nav-top").css({"display": "inline-block"})
                    }
                } else {
                    $("#filters-top-nav-availability").css({"display": "none"});
                    if(!($('#hr-filters-nav-top').css('display') == 'none') 
                    && $("#filters-top-nav-distributor".css('display') == 'none')){
                        $('#hr-filters-nav-top').css({"display": "none"})
                    }
                }
            })

            $("#sale-filter").parent().on("click", function(event){
                if(!(event.target.id == "sale-filter")){
                    $("#sale-filter").trigger("click")
                }
            })

            $("#sale-filter").on("change", function(event){
                if($("#sale-filter").is(":checked")){
                    $("#filters-top-nav-availability").css({"display": "inline-block"});
                    if(($('#hr-filters-nav-top').css('display') == 'none')){
                        $("#hr-filters-nav-top").css({"display": "inline-block"})
                    }
                } else {
                    $("#filters-top-nav-availability").css({"display": "none"});
                    if(!($('#hr-filters-nav-top').css('display') == 'none') 
                    && $("#filters-top-nav-distributor".css('display') == 'none')){
                        $('#hr-filters-nav-top').css({"display": "none"})
                    }
                }
            })
                
            //sort by price:
            $("#price-sort-select").on("change", function(){
                var sel = $("#price-sort-select option:selected").val();
                var sortArr = currentProductsOnPage.slice();
                sortArr = (sel == "lowest") ? productsService.sortLowestPrice(sortArr) : productsService.sortHighestPrice(sortArr);
                $("#available-products").html("");
                loadProductsOnPage(sortArr);
            });



            //adding to cart:
            $(".single-product-buy-button").on("click", function (event) {
                event.preventDefault();
                var productID = event.target.closest("article")[0].id;
                userService.addToCart(user.id, productID);

                if(sessionStorage.getItem('isLogged')){
                    userService.addToCart(user.id, product);
                } else {
                    //redirect to login page
                } 
            })

            //adding to favorites
            $(".single-product-nav").on("click", function (event) {
                event.preventDefault();
                if (sessionStorage.getItem('isLogged')) {
                    var productID = event.target.closest("article")[0].id;
                    userService.addFavourite(user.id, productID);
                } else {
                    //redirect to login page
                }
            })

            //page navigation:
            $($($("#pages-info")[0]).children()[0]).html(`${(currentPage - 1) * currentPageProducts.length + 1}-
        ${currentPage * currentPageProducts.length}`);

            $($($("#pages-info")[0]).children()[1]).html(productsType.length);

            //buttons
            availablePages.forEach((el, index) => {
                var elToAppend = `<button id="page-${index + 1}">${index + 1}</button>`    
                $(elToAppend).insertAfter("#back-page");
                if ((index + 1) == currentPage) {
                    $(`#page-${index + 1}`).addClass("current-page");
                }

                //TODO: логиката на буферния бутон??
                if((availablePages.length > 4) && (index )){
                    $(`<button disabled id="buffer-button">...</button>`).insertBefore(elToAppend);
                }
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
            $(".delete-filter").on("click", function (event) {
                var filter = event.target.closest("select").id;
                event.target.closest("li").remove();
            })

            //
        })
        .catch(function (error) {
            throw new Error("Error occured " + error)
        });
}
