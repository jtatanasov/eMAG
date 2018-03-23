document.addEventListener('DOMContentLoaded', function () {
    var templatePath = '';
    var myAccLink = document.getElementById('my-account'),
        myFavsLink = document.getElementById('my-favorites'),
        myCartLink = document.getElementById('my-cart');

    //todo
    myAccLink.addEventListener('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            login(false);
        } else {
            //redirect to edit profile page
        }
    })
    
    var isNameAppended = false;
    myAccLink.parentNode.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myAccLink.style.color = '#E9EBEE';
        var firstNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            firstNavExtension = $('.nav-extensions')[0];
        } else {
            firstNavExtension = $('.logged-user-extensions')[0];
            
            if(!isNameAppended) {
                var fullName = ', ' + JSON.parse(sessionStorage.getItem('loggedUser')).fullname;
                $('#hello-div > h4')[0].append(fullName);
                isNameAppended = true;
            }
            
        }
        firstNavExtension.style.display = 'block';

        
        //todo logged user
        $('#logout-btn').click(function(event) {
            userService.logout();
            //todo redirect
        });
        //todo the other buttons


        //loggedout user
        var loginBtn = document.getElementById('login-btn');
        loginBtn.addEventListener('click', login);
        $('#register-btn').click(function (event) {
            event.preventDefault();
            login(false);
        });

        firstNavExtension.addEventListener('mouseleave', function () {
            firstNavExtension.style.display = 'none';
            myAccLink.style.color = '#ffffff';
        })
    }, false);


    //todo
    myFavsLink.addEventListener('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            login(false);
        } else {
            //redirect
        }
    });

    myFavsLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myFavsLink.style.color = '#E9EBEE';

        var secondNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            secondNavExtension = document.getElementsByClassName('nav-extensions')[1];
            secondNavExtension.style.left = '-190%';
        }else {
            secondNavExtension = $('.logged-user-extensions')[1];
            
            secondNavExtension.style.left = '-100%';
            var favs = JSON.parse(sessionStorage.getItem('loggedUser')).favoriteProducts;
            
            if(favs.length > 0) {
                getTemplate('assets/js/templates/favoriteProductsInNavTemplate.js')
                .then(function(data) {
                    var template = Handlebars.compile(data);
                    var html = template({products : favs});
                    secondNavExtension.innerHTML = html;

                });
            } else {
                secondNavExtension.style.padding = '0.4em';
                secondNavExtension.innerText = 'Нямаш любими продукти!';
            }
        }
        //todo logged user

        secondNavExtension.style.display = 'block';
        

        //loggedout user
        $('#login-btn-favs').click(function (event) {
            event.preventDefault();
            login(false);
        })

        secondNavExtension.addEventListener('mouseleave', function () {
            secondNavExtension.style.display = 'none';
            myFavsLink.style.color = '#ffffff';
        })

    }, false);

    myCartLink.addEventListener('click', function (event) {
        event.preventDefault();
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            login(false);
        } else {
            //redirect to my cart page
        }
    });
    myCartLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myCartLink.style.color = '#E9EBEE';

        var thirdNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if (!logged) {
            thirdNavExtension = document.getElementsByClassName('nav-extensions')[2];
        } else {
            thirdNavExtension = $('.logged-user-extensions')[2];
            
            thirdNavExtension.style.left = '-50%';
            var cart = JSON.parse(sessionStorage.getItem('loggedUser')).cart;
            
            if(cart.length > 0) {
                getTemplate('assets/js/templates/favoriteProductsInNavTemplate.js')
                .then(function(data) {
                    var template = Handlebars.compile(data);
                    var html = template({products : cart});
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



    function login(isRegister) {
        getTemplate('assets/js/templates/loginAndRegisterTemplate.js')
            .then(function (data) {
                document.getElementsByTagName('main')[0].innerHTML = data;

                if (!!isRegister)
                    navigateLoginAndRegister(isRegister);
                else
                    navigateLoginAndRegister();

                $('#login-submit').click(function (event) {
                    event.preventDefault();

                    var emailInput = $('#login-email').val(),
                        passInput = $('#login-password').val();


                    var errSpan = $('<span style="color:red"></span>');

                    if (!isValidMail(emailInput)) {
                        errSpan.text('Невалиден email адрес!');
                        $('#login-email')[0].after(errSpan[0]);

                        $('#login-email').focus(() => errSpan.remove());
                        return;
                    }
                    if (!isValidPassword(passInput)) {
                        errSpan.text('Невалидна парола!');
                        $('#login-password')[0].after(errSpan[0]);

                        $('#login-password').focus(() => errSpan.remove());
                        return;
                    }

                    if (!userService.login(emailInput, passInput)) {
                        errSpan.text('Невалиден email адрес или парола!');
                        $('#login-password')[0].after(errSpan[0]);

                        $('#login-email').focus(() => errSpan.remove());
                        $('#login-password').focus(() => errSpan.remove());
                    } else {
                        //todo logged successfully!
                    }
                });

                var passConditions = $('#password-conditions')[0];
                $('#register-submit').click(function (event) {
                    event.preventDefault();

                    var emailInput = $('#register-email').val(),
                        passInput = $('#register-password').val(),
                        confirmPassInput = $('#confirm-password').val(),
                        fullNameInput = $('#fullname').val();

                    var errSpan = $('<span style="color:red"></span>');

                    if (!isValidString(fullNameInput)) {
                        errSpan.text('Невалидно име!');
                        $('#fullname')[0].after(errSpan[0]);

                        $('#fullname').focus(() => errSpan.remove());
                        return;
                    }
                    if (!isValidMail(emailInput)) {
                        errSpan.text('Невалиден email адрес!');
                        $('#register-email')[0].after(errSpan[0]);

                        $('#register-email').focus(() => errSpan.remove());
                        return;
                    }
                    if (!isValidPassword(passInput)) {
                        errSpan.text('Невалидна парола!');
                        $('#register-password')[0].after(errSpan[0]);
                        $('#password-conditions')[0].remove();

                        $('#register-password').focus(() => {
                            errSpan.remove();
                            $('#register-password')[0].after(passConditions);
                        });
                        return;
                    }
                    if (passInput !== confirmPassInput) {
                        errSpan.text('Невалидно потвърждение!');
                        $('#confirm-password')[0].after(errSpan[0]);

                        $('#confirm-password').focus(() => errSpan.remove());
                        return;
                    }

                    if (!userService.register(emailInput, fullNameInput, passInput)) {
                        errSpan.text('Вече има съществуващ потребител с такъв email адрес!');
                        $('#confirm-password')[0].after(errSpan[0]);

                        $('#register-email').focus(() => errSpan.remove());
                    } else {
                        //todo logged user
                        userService.login(emailInput, passInput);
                    }

                });
            });

    }
    function navigateLoginAndRegister(isRegister) {
        if (!isRegister) {
            $('#login-form')[0].style.display = 'none';
            $('#login-form-link').removeClass('active');
            $('#register-form-link').addClass('active');
            $('#register-form')[0].style.display = 'block';
        }
        $('#login-form-link').click(function (e) {
            e.preventDefault();

            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
        });
        $('#register-form-link').click(function (e) {
            e.preventDefault();

            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
        });
    }

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
});