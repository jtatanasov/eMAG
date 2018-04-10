function productPageController() {
    showAndHideAside();
    ctgsBtn();
    searchInput();
    $("#jssor_1").hide();
    $('#emag-info-nav').hide();
    
    $(function(){
        var productData = JSON.parse(localStorage.getItem("product"));
        var cathegory = productData.cathegory;
        var subcathegory = productData.subcathegory;
        var type = productData.type;
        var productID = productData.id;
        var product = productsService.getProduct(productID);
        var user = sessionStorage.getItem('loggedUser', loggedUser);
        user = JSON.parse(user);

        getTemplate('assets/js/templates/productPageTemplate.html')
            .then(function (data) {

                //loading the template
                var template = Handlebars.compile(data);
                var html = template(product);
                $("main").html(html);

                var spec = product.specifics;
                
                html = $("tbody").html();
                spec.forEach(el => {
                    html += `<tr>
                        <td>${el.name}</td>
                        <td>${el.spec}</td>
                    </tr>`                    
                });
                $("tbody").html(html);

                //checking availability
                if (!product.availability) {
                    $("#product-availability").toggleClass("available");
                    $("#product-availability").toggleClass("unavailable");
                    $("#product-availability").innerHTML = "изчерпана наличност";
                }

                //setting the price
                var price = Number(product.price);
                var whole = Math.floor(price);
                var change = Math.floor((price - whole) * 100);
                $("#product-price span #add-to-cart-buy-nav-div").innerHTML = `${whole}<sup>${change}</sup>`;
                $("#add-to-cart-buy-nav-div>span").innerHTML = `${whole}<sup>${change}</sup>`;
                $("#product-price>span").html(`${whole}<sup>${change}</sup>`);

                //sticky nav bars:            
                var productNavTop = $('#product-nav').offset().top;
                var buyNavTop = $('#product-user-menu').offset().top;

                $(window).scroll(function () {

                    var currentScroll = $(window).scrollTop();
                    var topSecond = $('#first-sticky-div').height();

                    //product-nav fixed when scrolling:
                    if ((currentScroll + 63) >= productNavTop) {
                        $("#second-sticky-div").append($("#product-nav"));
                        $("#product-nav>ul").css({
                            margin: "0"
                        })
                        $("#second-sticky-div").css({
                            top: "62.78px"
                        })
                    }

                    if ((currentScroll + 63) < productNavTop) {
                        $("#product-nav-container").append($("#product-nav"));
                    }

                    //buy-nav pops up when scrolling down: 
                    // if (currentScroll >= buyNavTop) {
                    //     $("#first-sticky-div").append($("#buy-nav"));
                    //     $("#buy-nav").css({
                    //         visibility: "visible"
                    //     })
                    // }
                    // if (currentScroll < buyNavTop) {
                    //     $("#buy-nav-container").append($("#buy-nav"));
                    //     $("#buy-nav").css({
                    //         visibility: "hidden"
                    //     })
                    // }
                });

                //product description and specs listeners
                $($("#product-description-ref").parent()[0]).on("click", function(){
                    var offset = $("#description-product").offset();
                    $('html, body').animate({
                        scrollTop: offset.top - 105,
                    });
                });

                $($("#product-specs-ref").parent()[0]).on("click", function(){
                    var offset = $("#specifics-container").offset();
                    $('html, body').animate({
                        scrollTop: offset.top - 120,
                    });
                })

                //adding to cart:

                $("#add-to-cart").click(function(event){
                    event.preventDefault();
                    userService.addToCart(user.id, product);

                    ////да има ли проверка? в емга иска да се логват чак след като вече тръгнат да поръчват нещата?
                    // if(sessionStorage.getItem('isLogged')){
                    //     userService.addToCart(user.id, product);
                    // } else {
                    //     //?? 
                    // } 
                })

                //adding to favorites
                $("#add-to-favorites, #buy-nav-button").click(function(event){
                    event.preventDefault();
                    if(sessionStorage.getItem('isLogged')){
                        userService.addFavourite(user.id, product);
                    } else {
                        //redirect to login page
                    } 
                })
                //
            })
            .catch(function (error) {
                throw new Error("Error occured " + error)
            });
    })
}