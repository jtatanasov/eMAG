function myFavoriteProductsController() {

    var asideElement = $('aside');
    asideElement.fadeOut();
    var isAsideLoaded = false;
    asideElement.fadeOut('1000');
    $('#categories').click(function (event) {
        event.preventDefault();
        if (!isAsideLoaded) {
            isAsideLoaded = true
            asideElement.fadeIn('1000');

        } else {
            asideElement.fadeOut('1000');
            isAsideLoaded = false;
        }
    });
    getTemplate('assets/js/templates/myFavoriteProductsTemplate.js')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));
            var template = Handlebars.compile(data);
            var html = template(user);
            var userName = user.fullname;

            $('main').html(html);

            $('#fullname').val(userName);
            $('#option-my-favs').addClass('active-option');

            $('#option-personal-data').click(function (event) {
                event.preventDefault();

                location.replace('#edit-profile');
            });

            $('#option-my-orders').click(function (event) {
                event.preventDefault();

                location.replace('#my-orders');
            });

            $('#option-my-cart').click(function (event) {
                event.preventDefault();

                location.replace('#my-cart');
            });

            $('#add-all-to-cart').click(function(event) {
                event.preventDefault();

                var userFavs = user.favoriteProducts;
                userFavs.forEach((fav) => userService.addToCart(user.id, fav));
            });

            $('#delete-all-favs').click(function(event) {
                event.preventDefault();

                userService.deleteAllFavorites(user.id);
            })
        })
        .catch(function (error) {

        });




    function isValidMail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function isValidPassword(pass) {
        return (typeof pass === 'string' && pass.length >= 6 && hasNumber(pass))
    }

    function hasNumber(str) {
        return /\d/.test(str);
    }
    function isValidString(str) {
        return (typeof str === 'string' && str.length > 0);
    }

    function isValidPhoneNumber(phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone));
    }
}

