function editProfileController() {
    showAndHideAside();
    ctgsBtn();
    searchInput();
    $('#jssor_1').hide();
    $('#emag-info-nav').hide();
    $.get('assets/js/templates/editProfileTemplate.html')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser')),
                template = Handlebars.compile(data),
                html = template(user),
                userName = user.fullname,
                title = user.title;

            
            $('main').html(html);
            if (title !== '') {
                $('input[value=' + title + ']').attr('checked', 'checked');
            }
            $('#fullname').val(userName);
            $('#option-personal-data').addClass('active-option');

            $('#option-my-favs').on('click', function (event) {
                event.preventDefault();

                location.replace('#my-favorite-products');
            });

            $('#option-my-orders').on('click', function (event) {
                event.preventDefault();

                location.replace('#my-orders');
            });

            $('#option-my-cart').on('click', function (event) {
                event.preventDefault();

                location.replace('#my-cart');
            });


            $('#save-profile-edits-btn').on('click', function (event) {
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

                    $('#fullname').parent().eq(0).after(errSpan.eq(0));

                    $('#fullname').on('focus', () => errSpan.remove());
                    return;
                }

                if (!isValidPhoneNumber(phoneInput)) {
                    errSpan.text("Невалиден телефонен номер!");

                    $('#mobile-number').parent().eq(0).after(errSpan.eq(0));

                    $('#mobile-number').on('focus', () => errSpan.remove());
                    return;
                }

                if (radioBtnInput !== 'undefined') {
                    userService.addTitle(user.id, radioBtnInput);
                }
                userService.changeName(user.id, fullNameInput);
                userService.addPhoneNumber(user.id, phoneInput);

                var successSpan = $('<span>');
                successSpan.text("Промените са запазени успешно!");
                successSpan.css('margin-left', '2em');
                successSpan.css('color', 'green');
                $('#save-profile-edits-btn').eq(0).after(successSpan.eq(0));

                successSpan.fadeOut(2000);
            });

            var modal = $('#myModal');
            var span = $(".close");
            $('#add-address').click(function (event) {
                event.preventDefault();
                configureAddress();
            });


            $('#edit-address').on('click', function (event) {
                event.preventDefault();

                var tmpAddress = user.address;
                $('#address').val(tmpAddress);

                configureAddress();
            });

            span.on('click', function () {
                modal.css('display', 'none');
            });

            $(window).on('click', function (event) {
                if (event.target == modal[0]) {
                    modal.css('display', 'none');
                }
            });

            $('#delete-address').on('click', function (event) {
                event.preventDefault();

                userService.deleteAddress(user.id);
                editProfileController();
            });

            $('#save-new-email').on('click', function (event) {
                event.preventDefault();

                var newEmail = $('#new-email').val(),
                    confirmNewEmail = $('#confirm-new-email').val();

                var errSpan = $('<p>');
                errSpan.css('color', 'red');
                errSpan.css('margin-top', '-2em');
                errSpan.css('margin-left', '40%');

                if (!isValidMail(newEmail)) {
                    errSpan.text("Невалиден email адрес!");

                    $('#new-email').parent().eq(0).after(errSpan.eq(0));

                    $('#new-email').on('focus', () => errSpan.remove());
                    return;
                }

                if (!isValidMail(confirmNewEmail) || newEmail !== confirmNewEmail) {
                    errSpan.text("Невалидно потвъждение на email адреса!");

                    $('#confirm-new-email').parent().eq(0).after(errSpan.eq(0));

                    $('#confirm-new-email').focus(() => errSpan.remove());
                    return;
                }

                var successSpan = $('<span>');
                successSpan.text("Email адресът е запазен успешно!");
                successSpan.css('margin-left', '2em');
                successSpan.css('color', 'green');
                $('#save-new-email').eq(0).after(successSpan.eq(0));

                successSpan.fadeOut(2500);

                userService.changeMail(user.id, newEmail);

                $('#new-email').val('');
                $('#confirm-new-email').val('');
                setTimeout(editProfileController, 2500);
            });

            $('#save-new-password').on('click', function (event) {
                event.preventDefault();

                var oldPass = $('#old-password').val(),
                    newPass = $('#new-password').val(),
                    confirmNewPass = $('#confirm-new-password').val();

                var currUser = userService.getUserById(user.id);            

                var errSpan = $('<p>');
                errSpan.css('color', 'red');
                errSpan.css('margin-top', '-2em');
                errSpan.css('margin-left', '40%');

                if (!userService.checkPassword(currUser.id, oldPass)) {
                    errSpan.text("Невалидна парола!");

                    $('#old-password').parent().eq(0).after(errSpan.eq(0));

                    $('#old-password').on('focus', () => errSpan.remove());
                    return;
                }
                if (!isValidPassword(newPass)) {
                    errSpan.text("Невалидна парола!");

                    $('#new-password').parent().eq(0).after(errSpan.eq(0));

                    $('#new-password').on('focus', () => errSpan.remove());
                    return;
                }

                if (!isValidPassword(confirmNewPass) || newPass !== confirmNewPass) {
                    errSpan.text("Невалидно потвъждение на паролата!");

                    $('#confirm-new-password').parent().eq(0).after(errSpan.eq(0));

                    $('#confirm-new-password').on('focus', () => errSpan.remove());
                    return;
                }

                var successSpan = $('<span>');
                successSpan.text("Паролата е записана успешно!");
                successSpan.css('margin-left', '2em');
                successSpan.css('color', 'green');
                $('#save-new-password').eq(0).after(successSpan.eq(0));

                successSpan.fadeOut(2500);

                userService.changePassword(currUser.id, newPass);
                $('#old-password').val('');
                $('#new-password').val('');
                $('#confirm-new-password').val('');

                setTimeout(editProfileController, 2500);

            });
        });
   
    function configureAddress() {
        var modal = $('#myModal');
        var span = $(".close");
        modal.css('display', 'block');

        $('#save-address').on('click', function (event) {
            var addressName = $('#address-name').val(),
                addressPhone = $('#address-mobile-number').val(),
                address = $('#address').val();

            var errSpan = $('<p>');
            errSpan.css('color', 'red');
            errSpan.css('margin-top', '-2em');
            errSpan.css('margin-left', '37%')

            if (!isValidString(addressName)) {
                errSpan.text("Невалидно име!");

                $('#address-name').parent().eq(0).after(errSpan.eq(0));

                $('#address-name').on('focus', () => errSpan.remove());
                return;
            }
            if (!isValidPhoneNumber(addressPhone)) {
                errSpan.text("Невалиден телефонен номер!");

                $('#address-mobile-number').parent().eq(0).after(errSpan.eq(0));

                $('#address-mobile-number').on('focus', () => errSpan.remove());
                return;
            }
            if (!isValidString(address)) {
                errSpan.text("Невалиден адрес!");

                $('#address').parent().eq(0).after(errSpan.eq(0));

                $('#address').on('focus', () => errSpan.remove());
                return;
            }

            var successSpan = $('<span>');
            successSpan.text("Адресът е запазен успешно!");
            successSpan.css('margin-left', '2em');
            successSpan.css('color', 'green');
            $('#save-address').eq(0).after(successSpan.eq(0));

            successSpan.fadeOut(2500);
            modal.fadeOut(3000);

            var loggedU = JSON.parse(sessionStorage.getItem('loggedUser'));
            var currUser = userService.getUserById(loggedU.id);

            userService.addPhoneNumber(currUser.id, addressPhone);
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

