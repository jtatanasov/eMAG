function myCartController() {
    showAndHideAside();
    ctgsBtn();
    searchInput();
    $('#jssor_1').hide();
    $('#emag-info-nav').hide();

    $.get('assets/js/templates/myCartTemplate.html')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));
            var template = Handlebars.compile(data);
            var html = template(user);

            var userName = user.fullname;
            var title = user.title;

            $('main').html(html);

            $('#fullname').val(userName);
            $('#option-my-cart').addClass('active-option');

            $('#option-personal-data').on('click', function (event) {
                event.preventDefault();

                location.replace('#edit-profile');
            });

            $('#option-my-favs').on('click', function (event) {
                event.preventDefault();

                location.replace('#my-favorite-products');
            });

            $('#option-my-orders').on('click', function (event) {
                event.preventDefault();

                location.replace('#my-orders');
            });

            $('.delete-from-cart').on('click', function (event) {
                event.preventDefault();

                var row = $(this).closest('tr[cart-product-id]');
                var productId = row.attr('cart-product-id');

                //...because storage doesnt keep methods of Cart
                var currUserCartProducts = user.cart.products;
                var tmpCart = new Cart();
                currUserCartProducts.forEach(pr => {
                    if (pr.id != productId) {
                        tmpCart.addToCart(pr);
                    }
                });

                userService.updateCart(user.id, tmpCart);

                row.closest($('section')).fadeOut(500);
                setTimeout(myCartController, 500);
            });

            if ($('#delivery-td').html() == ' лв.') {
                $('#delivery-td').html('БЕЗПЛАТНА');
                $('#delivery-td').css('color', 'green');
                $('#delivery-td').css('font-weight', 'bold');
            }

            $('#order-button').on('click', function (event) {
                event.preventDefault();
                var currOrder = new Order(user.cart.products);
                userService.addOrderInProcess(user.id, currOrder);
                location.replace('#order');
            });

            $('.cart-product-name').on('click', function(event) {
                event.preventDefault();

                var productId = ($(this).closest('tr[cart-product-id]').attr('cart-product-id'));
                var clickedProduct = productsService.getProductById(productId);
                var product = {
                    id : productId,
                    cathegory : clickedProduct.cathegory,
                    subcathegory : clickedProduct.subcathegory,
                    type : clickedProduct.type
                }
                localStorage.setItem('product', JSON.stringify(product));
                location.replace('#product');
            });

            $('.cart-product-img').on('click', function(event) {
                event.preventDefault();
                
                var productId = ($(this).closest('tr[cart-product-id]').attr('cart-product-id'));
                var clickedProduct = productsService.getProductById(productId);
                var product = {
                    id : productId,
                    cathegory : clickedProduct.cathegory,
                    subcathegory : clickedProduct.subcathegory,
                    type : clickedProduct.type
                }
                localStorage.setItem('product', JSON.stringify(product));
                location.replace('#product');                
            });
        });
}

