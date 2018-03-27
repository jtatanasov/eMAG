$(userController);

var isNameAppended = false;

function showAndHideAside() {
    var asideElement = $('aside');
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
}
function navigateLoginAndRegister(isRegister) {
    if (isRegister != undefined) {
        $('#login-form').eq(0).css('display', 'none');
        $('#login-form-link').removeClass('active');
        $('#register-form-link').addClass('active');
        $('#register-form')[0].style.display = 'block';
    }
    $('#login-form-link').on('click', function (e) {
        e.preventDefault();

        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
    });
    $('#register-form-link').on('click', function (e) {
        e.preventDefault();

        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
    });
}
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


    //ASK NIKI

    // ctgsBtn();
    // function ctgsBtn() {
    //     if (page !== '') {
    //         $(window).on('mousewheel', function (event) {
    //             if (event.originalEvent.wheelDelta < 0) {
    //                 $('header > a').before($('<a href="" id="categories-btn"><img id="categories-btn-img" width="20px" src="assets/images/icons/list-icon.png" /></a>'));
    //                 $(window).off();

    //                 //todo onclick
    //                 $(document).on('scroll', function () {
    //                     if ($(window).scrollTop() === 0) {
    //                         $("#categories-btn").remove();
    //                         ctgsBtn();
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // }




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

            var fullName = JSON.parse(sessionStorage.getItem('loggedUser')).fullname;
            $('#hello-div > h4').text('Здравейте, ' + fullName);
            isNameAppended = true;


        }
        firstNavExtension.fadeIn('500');

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
        //TODO myCart button


        $('#login-btn').on('click', function (event) {
            event.preventDefault();
            location.replace('#login');
        });

        $('#register-btn').on('click', function (event) {
            event.preventDefault();
            location.replace('#register');
        });

        myAccLink.parent().on('mouseleave', function () {
            firstNavExtension.fadeOut('500');
            myAccLink.css('color', '#fff');
        })
    });


    myFavsLink.on('click', function (event) {
        event.preventDefault();

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            location.replace('#login');
        } else {
            location.replace('#my-favorite-products');
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

        secondNavExtension.fadeIn('500');

        $('#login-btn-favs').on('click', function (event) {
            event.preventDefault();
            location.replace('#login');
        });

        myFavsLink.parent().on('mouseout', function () {
            secondNavExtension.fadeOut('500');
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
                $.get('assets/js/templates/cartInNavTemplate.js')
                    .then(function (data) {
                        var template = Handlebars.compile(data);
                        var html = template({ cart: cart });
                        thirdNavExtension.css('width', '18em');
                        thirdNavExtension.css('left', '-40%');
                        thirdNavExtension.html(html);
                        //todo button

                    });
            } else {
                thirdNavExtension.css('padding', '0.4em');
                thirdNavExtension.text('Нямаш добавени продукти в количката!');
            }
        }

        thirdNavExtension.fadeIn('500');

        myCartLink.parent().on('mouseleave', function () {
            thirdNavExtension.fadeOut('500');
            myCartLink.css('color', '#fff');
        });
    });
}