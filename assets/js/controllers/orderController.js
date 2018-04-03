function orderController() {
    showAndHideAside();
    ctgsBtn();
    $('#jssor_1').hide();
    $('#emag-info-nav').hide();

    $.get('assets/js/templates/orderTemplate.html')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));

            var template = Handlebars.compile(data);
            var html = template(user);
            $('main').html(html);

            $('#go-to-address-fill').on('click', function (event) {
                event.preventDefault();

                location.replace('#edit-profile');
            });

            $('#cash-payment').on('change', function () {
                $(this).attr('checked', 'checked');
            });

            if($('#order-delivery-price').html() == '0 лв.') {
                $('#order-delivery-price').html('БЕЗПЛАТНА');
                $('#order-delivery-price').css('color', 'green');
                $('#order-delivery-price').css('font-weight', 'bold');
            }

            $('#finish-order-btn').on('click', function (event) {
                event.preventDefault();

                if (user.address === '' || $('#order-name').val() === ''
                    || $('#order-phone').val() === '' || !$('#cash-payment').attr('checked')) {
                    var errSpan = $('<br/><span></span>');
                    errSpan.text('Моля, попълнете всички полета!');
                    errSpan.css('color', 'red');
                    errSpan.css('margin-left', '30em');
                    $('#finish-order').after(errSpan);
                    
                    errSpan.fadeOut("slow");
                } else {
                    var order = user.processingOrder;
                    userService.removeOrderInProcess(user.id, order);
                    userService.ordering(user.id, order);

                    var tmpCart = new Cart();
                    userService.updateCart(user.id, tmpCart);
                    location.replace('#');
                }
            });
        })
        .catch(function (error) {
            throw new Error(error);
        });

}

