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

function ctgsBtn() {
    var page = location.hash.slice(1);
    var asideElement = $('aside');
    var isAsideLoaded = false;

    $(document).on('scroll', function () {
        if ($(window).scrollTop() > 40) {
            if (!isAsideLoaded) {

                asideElement.hide('500');
                $('#second-nav').hide('500');
                $("#categories-btn").show('500');
                isAsideLoaded = true;
            }

        } else {
            $('#categories-list').css('top', '10.8em');
            $('#categories-list').css('left', '0');
            $("#categories-btn").hide('500');
            $('#second-nav').show('500');
            if (page == '') {
                asideElement.show('500');
                $('#categories-list').show('500');
            } 
            isAsideLoaded = false;
        }
    });

}

function emagInfoNav() {
    var page = location.hash.slice(1);
    if(page == '') {
        $('#emag-info-nav').css('padding-top', '40em');
    } else {
        $('#emag-info-nav').css('padding-top', '0');
    }
    $('#online').on('mouseenter', function(event) {
        $('#online-div').fadeIn('500');
    })

    $('#online').on('mouseleave', function() {
        $('#online-div').fadeOut('500');
    })

    $('#back').on('mouseenter', function(event) {
        $('#back-div').fadeIn('500');
    })

    $('#back').on('mouseleave', function() {
        $('#back-div').fadeOut('500');
    })
    $('#delivery').on('mouseenter', function(event) {
        $('#delivery-div').fadeIn('500');
    })

    $('#delivery').on('mouseleave', function() {
        $('#delivery-div').fadeOut('500');
    })
    $('#many-products').on('mouseenter', function(event) {
        $('#many-products-div').fadeIn('500');
    })

    $('#many-products').on('mouseleave', function() {
        $('#many-products-div').fadeOut('500');
    })
}


function userController() {
    var templatePath = '';
    var myAccLink = $('#my-account'),
        myFavsLink = $('#my-favorites'),
        myCartLink = $('#my-cart');

    var asideElement = $('aside'),
        categoriestList = '';

    $('main').html('');
    $('#jssor_1').show();
    $('#emag-info-nav').show();
    emagInfoNav();
    
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
    if (page !== '') {

        $('#jssor_1').hide();
    }

    ctgsBtn();

    $("#categories-btn").on('click', function (event) {
        event.preventDefault();
        if (!isAsideLoaded) {
            isAsideLoaded = true;
            $('#categories-list').css('top', '7.6em');
            $('#categories-list').css('left', '-3em');

            $('#current-subcategory-container').css('top', '6.2em');
            $('#current-subcategory-container').css('left', '16.1em');
            asideElement.show('500');
        } else {
            asideElement.hide('500');

            $('#current-subcategory-container').css('top', '9.5em');
            $('#current-subcategory-container').css('left', '18.7em');
            isAsideLoaded = false;
        }
    });

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
        $('#my-cart-btn').parent().on('click', function (event) {
            event.preventDefault();

            location.replace('#my-cart');
        })


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
                $.get('assets/js/templates/favoriteProductsInNavTemplate.html')
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

        myFavsLink.parent().on('mouseleave', function () {
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

            if (cart.products.length > 0) {
                $.get('assets/js/templates/cartInNavTemplate.html')
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
                thirdNavExtension.text('Нямате добавени продукти в количката!');
            }
        }

        thirdNavExtension.fadeIn('500');

        myCartLink.parent().on('mouseleave', function () {
            thirdNavExtension.fadeOut('500');
            myCartLink.css('color', '#fff');
        });
    });

    $.get('assets/data/categories.json')
        .then(function (data) {

            var categories = $('#categories-list > li > a');
            categories.parent().on('mouseenter', function () {
                $('#jssor_1').hide();
                $('#current-subcategory-container').html('');
                $('#current-subcategory-container').show();
                var currCategoryName = $(this).text().trim()
                var currCategory = data.filter(c => c.category === currCategoryName);
                var subCategories = currCategory[0].subcategories;
                var result = '';
                subCategories.forEach(subcat => {

                    var tmpSubCategory = $('<div> <h4>' + subcat.subcat + '</h4></div>');
                    subcat.types.forEach(type => {
                        var tmpType = $('<a>' + type + '</a>');
                        tmpSubCategory.append(tmpType);
                        tmpType.on('click', function () {
                            var product = {
                                cathegory: currCategoryName,
                                subcathegory: subcat.subcat,
                                type: type
                            }
                            localStorage.setItem('product', JSON.stringify(product));
                            location.replace('#products');
                        });
                    })

                    $('#current-subcategory-container').append(tmpSubCategory);

                });

            });
            $('#current-subcategory-container').on('mouseleave', function () {

                $('#current-subcategory-container').html('');
                $('#current-subcategory-container').hide();
                var page = location.hash.slice(1);
                if (page == '')

                    $('#jssor_1').show();
            });

            $('aside').on('mouseleave', function () {
                $('#current-subcategory-container').html('');
                $('#current-subcategory-container').hide();
                var page = location.hash.slice(1);
                if (page == '') {
                    $('#jssor_1').show();
                }
            });


        });

        
}