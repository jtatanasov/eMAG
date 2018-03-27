function loginAndRegisterController(isRegister) {
    showAndHideAside();
    
    $.get('assets/js/templates/loginAndRegisterTemplate.html')
        .then(function (data) {
            $('main').html(data);

            if (isRegister != undefined) {
                navigateLoginAndRegister(isRegister);
            } else {
                navigateLoginAndRegister();
            }

            $('#login-submit').on('click', function (event) {
                event.preventDefault();

                var emailInput = $('#login-email').val(),
                    passInput = $('#login-password').val();


                var errSpan = $('<span style="color:red"></span>');

                if (!isValidMail(emailInput)) {
                    errSpan.text('Невалиден email адрес!');
                    $('#login-email').eq(0).after(errSpan.eq(0));

                    $('#login-email').on('focus', () => errSpan.remove());
                    return;
                }
                if (!isValidPassword(passInput)) {
                    errSpan.text('Невалидна парола!');
                    $('#login-password').eq(0).after(errSpan.eq(0));

                    $('#login-password').on('focus', () => errSpan.remove());
                    return;
                }

                if (!userService.login(emailInput, passInput)) {
                    errSpan.text('Невалиден email адрес или парола!');
                    $('#login-password').eq(0).after(errSpan.eq(0));

                    $('#login-email').on('focus', () => errSpan.remove());
                    $('#login-password').on('focus', () => errSpan.remove());
                } else {
                    userController();
                    location.replace('#');
                }
            });

            var passConditions = $('#password-conditions').eq(0);
            $('#register-submit').on('click', function (event) {
                event.preventDefault();

                var emailInput = $('#register-email').val(),
                    passInput = $('#register-password').val(),
                    confirmPassInput = $('#confirm-password').val(),
                    fullNameInput = $('#fullname').val();

                var errSpan = $('<span style="color:red"></span>');

                if (!isValidString(fullNameInput)) {
                    errSpan.text('Невалидно име!');
                    $('#fullname').eq(0).after(errSpan.eq(0));

                    $('#fullname').on('focus', () => errSpan.remove());
                    return;
                }
                if (!isValidMail(emailInput)) {
                    errSpan.text('Невалиден email адрес!');
                    $('#register-email').eq(0).after(errSpan.eq(0));

                    $('#register-email').on('focus', () => errSpan.remove());
                    return;
                }
                if (!isValidPassword(passInput)) {
                    errSpan.text('Невалидна парола!');
                    $('#register-password').eq(0).after(errSpan.eq(0));
                    $('#password-conditions').eq(0).remove();

                    $('#register-password').on('focus', () => {
                        errSpan.remove();
                        $('#register-password').eq(0).after(passConditions);
                    });
                    return;
                }
                if (passInput !== confirmPassInput) {
                    errSpan.text('Невалидно потвърждение!');
                    $('#confirm-password').eq(0).after(errSpan.eq(0));

                    $('#confirm-password').on('focus', () => errSpan.remove());
                    return;
                }

                if (!userService.register(emailInput, fullNameInput, passInput)) {
                    errSpan.text('Вече има съществуващ потребител с такъв email адрес!');
                    $('#confirm-password').eq(0).after(errSpan.eq(0));

                    $('#register-email').on('focus', () => errSpan.remove());
                } else {
                    userService.login(emailInput, passInput);
                    userController();
                    location.replace('#');
                }

            });
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