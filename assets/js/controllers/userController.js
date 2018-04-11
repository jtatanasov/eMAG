var isNameAppended = false;

function showAndHideAside() {
    var asideElement = $('aside');
    var isAsideLoaded = false;
    var page = location.hash.slice(1);
    if (page != '') {
        asideElement.fadeOut('1000');
        $('#categories').on('click', function (event) {
            event.preventDefault();

            $('#categories-list').show();
            $('#categories-list').css('top', '10.9em');
            $('#categories-list').css('left', '0');

            if (!isAsideLoaded) {
                isAsideLoaded = true
                asideElement.fadeIn('1000');

            } else {
                asideElement.fadeOut('1000');
                isAsideLoaded = false;
            }
        });
    } else {
        asideElement.fadeIn('1000');
        $('#categories-list').show();
        $('#categories').on('click', function (event) {
            event.preventDefault();
        })
    }
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
    if (page != '') {
        asideElement.hide();
    }
    $(document).on('scroll', function () {
        if ($(window).scrollTop() > 30) {
            $('#second-nav').hide('500');
            $('#categories-btn').show('500');
            $('#categories-list').fadeOut('100');
        } else {

            $('#categories-list').css('top', '10.9em');
            $('#categories-list').css('left', '0');
            $('#second-nav').show('500');
            $('#categories-btn').hide('500');
            if (page !== '') {
                asideElement.hide('100');
            }
            if (page == '') {
                $('#categories-list').fadeIn('100');
            }
        }
    });
}

function emagInfoNav() {
    var page = location.hash.slice(1);
    if (page == '') {
        $('#emag-info-nav').css('padding-top', '40em');
    } else {
        $('#emag-info-nav').css('padding-top', '0');
    }
    $('#online').on('mouseenter', function (event) {
        $('#online-div').fadeIn('500');
    })

    $('#online').on('mouseleave', function () {
        $('#online-div').fadeOut('500');
    })

    $('#back').on('mouseenter', function (event) {
        $('#back-div').fadeIn('500');
    })

    $('#back').on('mouseleave', function () {
        $('#back-div').fadeOut('500');
    })
    $('#delivery').on('mouseenter', function (event) {
        $('#delivery-div').fadeIn('500');
    })

    $('#delivery').on('mouseleave', function () {
        $('#delivery-div').fadeOut('500');
    })
    $('#many-products').on('mouseenter', function (event) {
        $('#many-products-div').fadeIn('500');
    })

    $('#many-products').on('mouseleave', function () {
        $('#many-products-div').fadeOut('500');
    })
}

function searchInput() {
    const ENTER_KEY_CODE = 13;
    var page = location.hash.slice(1);

    getTemplate('assets/js/templates/dataListTemplate.html')
        .then(function (template) {
            $.get('assets/data/products.json')
                .then(function (products) {
                    var source = Handlebars.compile(template);
                    var html = $(source({ products: products }));

                    $('#products-list').html(html);

                    $('#search').on('keypress', function (event) {
                        if (event.keyCode === ENTER_KEY_CODE) {
                            var searched = $(this).val();

                            var searchResult = productsService.searchProducts(searched);
                            if (searchResult) {
                                var product = {
                                    id: searchResult.id,
                                    cathegory: searchResult.cathegory,
                                    subcathegory: searchResult.subcathegory,
                                    type: searchResult.type
                                }
                                localStorage.setItem('product', JSON.stringify(product));
                                if (page != 'product')
                                    location.replace('#product');
                                else {
                                    location.reload();
                                }
                            }
                        }
                    });
                });
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
    $('#jssor_1').show();
    $('#emag-info-nav').show();
    emagInfoNav();
    showAndHideAside();
    searchInput();
    var isAsideLoaded = false;
    var page = location.hash.slice(1);

    if (page !== '') {
        $('#jssor_1').hide();
    }

    $("#categories-btn").on('click', function (event) {
        event.preventDefault();
        if (!isAsideLoaded) {
            isAsideLoaded = true;
            $('#categories-list').css('top', '7.6em');
            $('#categories-list').css('left', '-3em');

            $('#current-subcategory-container').css('top', '6.2em');
            $('#current-subcategory-container').css('left', '16.1em');
            asideElement.show('100');
            $('#categories-list').fadeIn('100');
            // asideElement.fadeIn('500');
        } else {
            // asideElement.fadeOut('500');
            $('#categories-list').fadeOut('100');

            $('#current-subcategory-container').css('top', '9.5em');
            $('#current-subcategory-container').css('left', '18.7em');
            isAsideLoaded = false;
        }
    });

    ctgsBtn();
    asideElement.show();
    $('#categories-list').show();
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
    var clicks = 0;
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

                            clicks++;
                            var product = {
                                cathegory: currCategoryName,
                                subcathegory: subcat.subcat,
                                type: type
                            }
                            console.log(type);
                            localStorage.setItem('product', JSON.stringify(product));
                            location.replace('#products/' + type);
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

    $('.footer-links').on('click', function (event) {
        event.preventDefault();

    });
    $('#footer-my-acc-link').on('click', function (event) {
        event.preventDefault();

        location.replace('#edit-profile');
    });
}