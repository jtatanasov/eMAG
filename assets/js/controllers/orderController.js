function orderController() {
    showAndHideAside();
    ctgsBtn();

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

                    location.replace('#');
                }
            });
        })
        .catch(function (error) {
            throw new Error(error);
        });

}

