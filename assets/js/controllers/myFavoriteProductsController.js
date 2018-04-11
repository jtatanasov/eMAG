function myFavoriteProductsController() {
    showAndHideAside();
    ctgsBtn();
    searchInput();
    $('#jssor_1').hide();
    $('#emag-info-nav').hide();
    
    $.get('assets/js/templates/myFavoriteProductsTemplate.html')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));
            var template = Handlebars.compile(data);
            var html = $(template(user));
            var userName = user.fullname;

            $('main').html(html);

            $('#fullname').val(userName);
            $('#option-my-favs').addClass('active-option');

            $('#option-personal-data').on('click', function (event) {
                event.preventDefault();

                location.replace('#edit-profile');
            });

            $('#option-my-orders').on('click', function (event) {
                event.preventDefault();

                location.replace('#my-orders');
            });

            $('#option-my-cart').on('click', function (event) {
                event.preventDefault();

                location.replace('#my-cart');
            });

            $('#add-all-to-cart').on('click', function(event) {
                event.preventDefault();

                var userFavs = user.favoriteProducts;
                var tmpCart = new Cart();
                userFavs.forEach((fav) => tmpCart.addToCart(fav));
                userService.updateCart(user.id, tmpCart);
            });

            $('#delete-all-favs').on('click', function(event) {
                event.preventDefault();

                userService.deleteAllFavorites(user.id);
                setTimeout(myFavoriteProductsController, 500);
            });

            $('.add-curr-fav-to-cart').on('click', function(event) {
                event.preventDefault();

                var productId = $(this).closest('tr[fav-product-id]').attr('fav-product-id');
                var product = userService.getFavoriteProductById(user.id, productId);

                //implementing like this, because storage doesnt keep methods of Cart
                var currUserCartProducts = user.cart.products;
                var tmpCart = new Cart();
                currUserCartProducts.forEach(pr => tmpCart.addToCart(pr));
                tmpCart.addToCart(product);
                console.log(tmpCart);
                userService.updateCart(user.id, tmpCart);
            });
            
            $('.delete-curr-fav').on('click', function(event) {
                event.preventDefault();
                var row = $(this).closest('tr[fav-product-id]');
                var productId = row.attr('fav-product-id');
                userService.deleteFavorite(user.id, productId);

                row.fadeOut(500);
            });

            $('.fav-name').on('click', function(event) {
                event.preventDefault();

                var productId = ($(this).closest('tr[fav-product-id]').attr('fav-product-id'));
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

            $('.fav-product-img').on('click', function(event) {
                event.preventDefault();

                var productId = ($(this).closest('tr[fav-product-id]').attr('fav-product-id'));
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


        })
        .catch(function (error) {
            throw new Error(error);
        });

}

