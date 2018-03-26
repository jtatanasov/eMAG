function myFavoriteProductsController() {
    showAndHideAside();
    
    $.get('assets/js/templates/myFavoriteProductsTemplate.js')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));
            var template = Handlebars.compile(data);
            var html = template(user);
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
                userFavs.forEach((fav) => userService.addToCart(user.id, fav));
            });

            $('#delete-all-favs').on('click', function(event) {
                event.preventDefault();

                userService.deleteAllFavorites(user.id);
            })
        })
        .catch(function (error) {

        });

}

