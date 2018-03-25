document.addEventListener('DOMContentLoaded', userController);

var isNameAppended = false;

function userController() {
    var templatePath = '';
    var myAccLink = document.getElementById('my-account'),
        myFavsLink = document.getElementById('my-favorites'),
        myCartLink = document.getElementById('my-cart');

    var asideElement = $('aside'),
        categoriestList = '';

    $('main').html('');


    $('#categories-button').click(function (event) {
        event.preventDefault();
    });
    var isAsideLoaded = false;
    var page = location.hash.slice(1);
    if (page === '') {
        asideElement.fadeIn('1000');
        isAsideLoaded = true;
    } else {
        isAsideLoaded = false;
        asideElement.fadeOut('1000');
        $('#categories-button').click(function (event) {
            event.preventDefault();
            console.log('click', isAsideLoaded);
            if (!isAsideLoaded) {
                isAsideLoaded = true
                asideElement.fadeIn('1000');
                
            } else {
                asideElement.fadeOut('1000');
                isAsideLoaded = false;
            }
        });
    }

    myAccLink.addEventListener('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            location.replace('#login');
        } else {
            $('aside').empty();
            location.replace('#edit-profile');
        }
    })

    myAccLink.parentNode.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myAccLink.style.color = '#E9EBEE';
        var firstNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            firstNavExtension = $('.nav-extensions')[0];
        } else {
            firstNavExtension = $('.logged-user-extensions')[0];
            firstNavExtension.style.left = '-30%';

            if (!isNameAppended) {
                var fullName = ', ' + JSON.parse(sessionStorage.getItem('loggedUser')).fullname;
                $('#hello-div > h4')[0].append(fullName);
                isNameAppended = true;
            }

        }
        firstNavExtension.style.display = 'block';


        $('#logout-btn').parent().click(function (event) {
            userService.logout();
            location.replace('#');
        });

        $('#personal-data').parent().click(function (event) {
            event.preventDefault();

            // $('aside').empty();
            location.replace('#edit-profile');
        });

        $('#my-orders').parent().click(function (event) {
            event.preventDefault();

            // $('aside').empty();
            location.replace('#my-orders');
        });

        $('#my-favorite-products').parent().click(function (event) {
            event.preventDefault();

            // $('aside').empty();
            location.replace('#my-favorite-products');
        });
        //TODO other buttons


        $('#login-btn').click(function (event) {
            event.preventDefault();
            location.replace('#login');
        });
        $('#register-btn').click(function (event) {
            event.preventDefault();
            location.replace('#register');
        });

        firstNavExtension.addEventListener('mouseleave', function () {
            firstNavExtension.style.display = 'none';
            myAccLink.style.color = '#ffffff';
        })
    }, false);


    //TODO LOGGED
    myFavsLink.addEventListener('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            login();
        } else {
            location.replace('#my-favorite-products');
            //TODO LOGGED
        }
    });

    myFavsLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myFavsLink.style.color = '#E9EBEE';

        var secondNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));

        if (!logged) {
            secondNavExtension = document.getElementsByClassName('nav-extensions')[1];
            secondNavExtension.style.left = '-140%';

        } else {
            secondNavExtension = $('.logged-user-extensions')[1];

            var favs = JSON.parse(sessionStorage.getItem('loggedUser')).favoriteProducts;

            if (favs.length > 0) {
                getTemplate('assets/js/templates/favoriteProductsInNavTemplate.js')
                    .then(function (data) {
                        var template = Handlebars.compile(data);
                        var html = template({ products: favs });
                        secondNavExtension.innerHTML = html;

                    });
            } else {
                secondNavExtension.style.padding = '0.4em';
                secondNavExtension.innerText = 'Нямаш любими продукти!';
            }
        }

        secondNavExtension.style.display = 'block';

        //loggedout user
        $('#login-btn-favs').click(function (event) {
            event.preventDefault();
            location.replace('#login');
        });

        secondNavExtension.addEventListener('mouseleave', function () {
            secondNavExtension.style.display = 'none';
            myFavsLink.style.color = '#ffffff';
        })

    }, false);

    myCartLink.addEventListener('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            location.replace('#login');
        } else {
            location.replace('#my-cart');
        }
    });
    myCartLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myCartLink.style.color = '#E9EBEE';

        var thirdNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            thirdNavExtension = document.getElementsByClassName('nav-extensions')[2];
            thirdNavExtension.style.left = '-80%';
        } else {
            thirdNavExtension = $('.logged-user-extensions')[2];
            thirdNavExtension.style.left = '-20%';

            var cart = JSON.parse(sessionStorage.getItem('loggedUser')).cart;

            if (cart.length > 0) {
                getTemplate('assets/js/templates/favoriteProductsInNavTemplate.js')
                    .then(function (data) {
                        var template = Handlebars.compile(data);
                        var html = template({ products: cart });
                        thirdNavExtension.innerHTML = html;

                    });
            } else {
                thirdNavExtension.style.padding = '0.4em';
                thirdNavExtension.innerText = 'Нямаш добавени продукти в количката!';
            }
        }

        thirdNavExtension.style.display = 'block';

        thirdNavExtension.addEventListener('mouseleave', function () {
            thirdNavExtension.style.display = 'none';
            myCartLink.style.color = '#ffffff';
        });

    }, false);

}
