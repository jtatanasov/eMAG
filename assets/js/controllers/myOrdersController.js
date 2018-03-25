function myOrdersController() {
    $('aside').hide();
    getTemplate('assets/js/templates/myOrdersTemplate.js')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));
            var template = Handlebars.compile(data);
            var html = template(user);
            var userName = user.fullname;
            var title = user.title;

            $('main').html(html);

            $('#fullname').val(userName);
            $('#option-my-orders').addClass('active-option');

            $('#option-personal-data').click(function(event) {
                event.preventDefault();

                location.replace('#edit-profile');
            });
            
            $('#option-my-favs').click(function(event) {
                event.preventDefault();

                location.replace('#my-favorite-products');
            });
            
            $('#option-my-cart').click(function(event) {
                event.preventDefault();

                location.replace('#my-cart');
            });
           

            $('#save-profile-edits-btn').click(function (event) {
                event.preventDefault();

                var errSpan = $('<p>');
                errSpan.css('color', 'red');
                errSpan.css('margin-top', '-2em');
                errSpan.css('margin-left', '40%');

                var radioBtnInput = $('input[name=title]:checked').val(),
                    fullNameInput = $('#fullname').val(),
                    phoneInput = $('#mobile-number').val();

                if (!isValidString(fullNameInput)) {
                    errSpan.text("Невалидно име!");

                    $('#fullname').parent()[0].after(errSpan[0]);

                    $('#fullname').focus(() => errSpan.remove());
                    return;
                }

                if (!isValidPhoneNumber(phoneInput)) {
                    errSpan.text("Невалиден телефонен номер!");

                    $('#mobile-number').parent()[0].after(errSpan[0]);

                    $('#mobile-number').focus(() => errSpan.remove());
                    return;
                }

                var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
                var currUser = userService.getUserById(loggedU.id);

                if (radioBtnInput !== 'undefined') {
                    userService.addTitle(currUser.id, radioBtnInput);
                }
                userService.changeName(currUser.id, fullNameInput);
                userService.addPhoneNumber(currUser.id, phoneInput);

                var successSpan = $('<span>');
                successSpan.text("Промените са запазени успешно!");
                successSpan.css('margin-left', '2em');
                successSpan.css('color', 'green');
                $('#save-profile-edits-btn')[0].after(successSpan[0]);

                successSpan.fadeOut(2000);

            });

            var modal = $('#myModal');
            var span = $(".close");
            $('#add-address').click(function (event) {
                event.preventDefault();
                configureAddress();

            });


            $('#edit-address').click(function (event) {
                event.preventDefault();

                var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
                var currUser = userService.getUserById(loggedU.id);

                var tmpAddress = currUser.address;
                $('#address').val(tmpAddress);

                configureAddress();

            });


            span.click(function () {
                modal.css('display', 'none');
            });

            $(window).click(function (event) {
                if (event.target == modal[0]) {
                    modal.css('display', 'none');
                }
            });

            $('#delete-address').click(function (event) {
                event.preventDefault();
                var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
                var currUser = userService.getUserById(loggedU.id);


                userService.deleteAddress(currUser.id);
                editProfileController();
            });

            $('#save-new-email').click(function (event) {
                event.preventDefault();

                var newEmail = $('#new-email').val(),
                    confirmNewEmail = $('#confirm-new-email').val();

                var errSpan = $('<p>');
                errSpan.css('color', 'red');
                errSpan.css('margin-top', '-2em');
                errSpan.css('margin-left', '40%');

                if (!isValidMail(newEmail)) {
                    errSpan.text("Невалиден email адрес!");

                    $('#new-email').parent()[0].after(errSpan[0]);

                    $('#new-email').focus(() => errSpan.remove());
                    return;
                }

                if (!isValidMail(confirmNewEmail) || newEmail !== confirmNewEmail) {
                    errSpan.text("Невалидно потвъждение на email адреса!");

                    $('#confirm-new-email').parent()[0].after(errSpan[0]);

                    $('#confirm-new-email').focus(() => errSpan.remove());
                    return;
                }

                var successSpan = $('<span>');
                successSpan.text("Email адресът е запазен успешно!");
                successSpan.css('margin-left', '2em');
                successSpan.css('color', 'green');
                $('#save-new-email')[0].after(successSpan[0]);

                successSpan.fadeOut(2500);

                var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
                var currUser = userService.getUserById(loggedU.id);


                userService.changeMail(currUser.id, newEmail);


                $('#new-email').val('');
                $('#confirm-new-email').val('');

            });

            $('#save-new-password').click(function (event) {
                event.preventDefault();

                var oldPass = $('#old-password').val(),
                    newPass = $('#new-password').val(),
                    confirmNewPass = $('#confirm-new-password').val();

                var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
                var currUser = userService.getUserById(loggedU.id);

                var errSpan = $('<p>');
                errSpan.css('color', 'red');
                errSpan.css('margin-top', '-2em');
                errSpan.css('margin-left', '40%');

                if (!userService.checkPassword(currUser.id, oldPass)) {
                    errSpan.text("Невалидна парола!");

                    $('#old-password').parent()[0].after(errSpan[0]);

                    $('#old-password').focus(() => errSpan.remove());
                    return;
                }
                if (!isValidPassword(newPass)) {
                    errSpan.text("Невалидна парола!");

                    $('#new-password').parent()[0].after(errSpan[0]);

                    $('#new-password').focus(() => errSpan.remove());
                    return;
                }

                if (!isValidPassword(confirmNewPass) || newPass !== confirmNewPass) {
                    errSpan.text("Невалидно потвъждение на паролата!");

                    console.log()
                    $('#confirm-new-password').parent()[0].after(errSpan[0]);

                    $('#confirm-new-password').focus(() => errSpan.remove());
                    return;
                }

                var successSpan = $('<span>');
                successSpan.text("Паролата е записана успешно!");
                successSpan.css('margin-left', '2em');
                successSpan.css('color', 'green');
                $('#save-new-password')[0].after(successSpan[0]);

                successSpan.fadeOut(2500);

                var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
                var currUser = userService.getUserById(loggedU.id);


                userService.changePassword(currUser.id, newPass);
                $('#old-password').val('');
                $('#new-password').val('');
                $('#confirm-new-password').val('');

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
    function configureAddress() {
        var modal = $('#myModal');
        var span = $(".close");
        modal.css('display', 'block');

        $('#save-address').click(function (event) {
            console.log('save-addrssss');
            var addressName = $('#address-name').val(),
                addressPhone = $('#address-mobile-number').val(),
                address = $('#address').val();

            var errSpan = $('<p>');
            errSpan.css('color', 'red');
            errSpan.css('margin-top', '-2em');
            errSpan.css('margin-left', '37%')

            if (!isValidString(addressName)) {
                errSpan.text("Невалидно име!");

                $('#address-name').parent()[0].after(errSpan[0]);

                $('#address-name').focus(() => errSpan.remove());
                return;
            }
            if (!isValidPhoneNumber(addressPhone)) {
                errSpan.text("Невалиден телефонен номер!");

                $('#address-mobile-number').parent()[0].after(errSpan[0]);

                $('#address-mobile-number').focus(() => errSpan.remove());
                return;
            }
            if (!isValidString(address)) {
                errSpan.text("Невалиден адрес!");

                $('#address').parent()[0].after(errSpan[0]);

                $('#address').focus(() => errSpan.remove());
                return;
            }

            var successSpan = $('<span>');
            successSpan.text("Адресът е запазен успешно!");
            successSpan.css('margin-left', '2em');
            successSpan.css('color', 'green');
            $('#save-address')[0].after(successSpan[0]);

            successSpan.fadeOut(2500);
            modal.fadeOut(3000);

            var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
            var currUser = userService.getUserById(loggedU.id);

            userService.addAddress(currUser.id, address);

            setTimeout(editProfileController, 2000);
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

