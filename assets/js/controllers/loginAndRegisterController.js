function loginAndRegisterController(isRegister) {
    
    $('aside').fadeOut();
    
    getTemplate('assets/js/templates/loginAndRegisterTemplate.js')
        .then(function (data) {
            document.getElementsByTagName('main')[0].innerHTML = data;

            if (isRegister != undefined) {
                navigateLoginAndRegister(isRegister);
            } else {
                navigateLoginAndRegister();
            }

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
                    location.replace('#');
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
                    userService.login(emailInput, passInput);
                    location.replace('#');
                }

            });
        });

    function navigateLoginAndRegister(isRegister) {
        if (isRegister != undefined) {
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

    function isValidPhoneNumber(phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone));
    }
}