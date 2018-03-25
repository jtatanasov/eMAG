var product = productsService.getProduct(productName);
//как ще се подава продукта 

getTemplate('sthTemplate.js')
    .then(function (data) {

        //loading the template
        var template = Handlebars.compile(data);
        var html = template(product);
        $("main").innerHTML = html;

        var spec = product.specifics;

        Array.prototype.forEach.call(spec, function (el) {
            $("tbody").innerHTML += `<tr>
                    <td>${el.name}</td>
                    <td>${el.spec}</td>
                </tr>`
        })

        //checking availability
        if (!product.availability) {
            $("#product-availability").toggleClass("available");
            $("#product-availability").toggleClass("unavailable");
            $("#product-availability").innerHTML = "изчерпана наличност";
        }

        //setting the price
        var price = Number(product.price);
        var whole = Math.floor(price);
        var change = Math.ceil((price - whole) * 100);
        $("#product-price span #add-to-cart-buy-nav-div").innerHTML = `${whole}<sup>${change}</sup>`;
        $("#add-to-cart-buy-nav-div>span").innerHTML = `${whole}<sup>${change}</sup>`;

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
            if (currentScroll >= buyNavTop) {
                $("#first-sticky-div").append($("#buy-nav"));
                $("#buy-nav").css({
                    visibility: "visible"
                })
            }
            if (currentScroll < buyNavTop) {
                $("#buy-nav-container").append($("#buy-nav"));
                $("#buy-nav").css({
                    visibility: "hidden"
                })
            }
        });

        //



        //
    })
    .catch(function (error) {
        throw new Error("Error occured " + error)
    });
