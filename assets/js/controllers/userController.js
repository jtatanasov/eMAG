$(userController);

var isNameAppended = false;

function userController() {
    var templatePath = '';
    var myAccLink = $('#my-account'),
        myFavsLink = $('#my-favorites'),
        myCartLink = $('#my-cart');

    var asideElement = $('aside'),
        categoriestList = '';

    $('main').html('');


    $('#categories-button').on('click', function (event) {
        event.preventDefault();
    });

    var isAsideLoaded = false;
    var page = location.hash.slice(1);
    if (page === '') {
        asideElement.fadeIn('1000');
        isAsideLoaded = true;
        $('#categories').on('click', function (event) {
            event.preventDefault();
        });
    }

    myAccLink.on('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            location.replace('#login');
        } else {
            location.replace('#edit-profile');
        }
    })

    myAccLink.parent().on('mouseenter', function (event) {
        event.preventDefault();

        myAccLink.css('color', '#E9EBEE');
        var firstNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            firstNavExtension = $('.nav-extensions').eq(0);
        } else {
            firstNavExtension = $('.logged-user-extensions').eq(0);
            firstNavExtension.css('left', '-30%');

            if (!isNameAppended) {
                var fullName = ', ' + JSON.parse(sessionStorage.getItem('loggedUser')).fullname;
                $('#hello-div > h4')[0].append(fullName);
                isNameAppended = true;
            }

        }

        firstNavExtension.css('display', 'block');

        $('#logout-btn').parent().on('click', function (event) {
            userService.logout();
            location.replace('#');
        });

        $('#personal-data').parent().on('click', function (event) {
            event.preventDefault();

            location.replace('#edit-profile');
        });

        $('#my-orders').parent().on('click', function (event) {
            event.preventDefault();

            location.replace('#my-orders');
        });

        $('#my-favorite-products').parent().on('click', function (event) {
            event.preventDefault();

            location.replace('#my-favorite-products');
        });
        //TODO other buttons


        $('#login-btn').on('click', function (event) {
            event.preventDefault();
            location.replace('#login');
        });

        $('#register-btn').on('click', function (event) {
            event.preventDefault();
            location.replace('#register');
        });

        firstNavExtension.on('mouseleave', function () {
            firstNavExtension.css('display', 'none');
            myAccLink.css('color', '#fff');
        })
    });


    // TODO LOGGED
    myFavsLink.on('click', function (event) {
        event.preventDefault();

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            location.replace('#login');
        } else {
            location.replace('#my-favorite-products');
            //TODO LOGGED
        }
    });

    myFavsLink.parent().on('mouseenter', function (event) {
        event.preventDefault();

        myFavsLink.css('color', '#E9EBEE');

        var secondNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));

        if (!logged) {
            secondNavExtension = $('.nav-extensions').eq(1);
            secondNavExtension.css('left', '-140%');
        } else {
            secondNavExtension = $('.logged-user-extensions').eq(1);

            var favs = JSON.parse(sessionStorage.getItem('loggedUser')).favoriteProducts;
            if (favs.length > 0) {
                $.get('assets/js/templates/favoriteProductsInNavTemplate.js')
                    .then(function (data) {

                        var template = Handlebars.compile(data);
                        var html = template({ favoriteProducts: favs });

                        secondNavExtension.css('width', '20em');
                        secondNavExtension.css('left', '-100%');

                        secondNavExtension.html(html);

                    });
            } else {
                secondNavExtension.css('padding', '0.4em');
                secondNavExtension.text('Нямаш любими продукти!');
            }
        }

        secondNavExtension.css('display', 'block');

        $('#login-btn-favs').on('click', function (event) {
            event.preventDefault();
            location.replace('#login');
        });

        secondNavExtension.on('mouseout', function () {
            secondNavExtension.css('display', 'none');
            myFavsLink.css('color', '#fff');
        })

    });

    myCartLink.on('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            location.replace('#login');
        } else {
            location.replace('#my-cart');
        }
    });

    myCartLink.on('mouseenter', function (event) {
        event.preventDefault();

        myCartLink.css('color', '#E9EBEE');

        var thirdNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            thirdNavExtension = $('.nav-extensions').eq(2);
            thirdNavExtension.css('left', '-80%');
        } else {
            thirdNavExtension = $('.logged-user-extensions').eq(2);
            thirdNavExtension.css('left', '-20%');

            var cart = JSON.parse(sessionStorage.getItem('loggedUser')).cart;

            if (cart.length > 0) {
                $.get('assets/js/templates/favoriteProductsInNavTemplate.js')
                    .then(function (data) {
                        var template = Handlebars.compile(data);
                        var html = template({ products: cart });
                        thirdNavExtension.html(html);

                    });
            } else {
                thirdNavExtension.css('padding', '0.4em');
                thirdNavExtension.text('Нямаш добавени продукти в количката!');
            }
        }

        thirdNavExtension.css('display', 'block');

        thirdNavExtension.on('mouseleave', function () {
            thirdNavExtension.css('display', 'none');
            myCartLink.css('color', '#fff');
        });
    });
}