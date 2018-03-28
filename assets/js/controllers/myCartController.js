function myCartController() {
    showAndHideAside();
    ctgsBtn();
    
    $.get('assets/js/templates/myCartTemplate.html')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));
            var template = Handlebars.compile(data);
            var html = template(user);

            var userName = user.fullname;
            var title = user.title;

            $('main').html(html);

            $('#fullname').val(userName);
            $('#option-my-cart').addClass('active-option');

            $('#option-personal-data').on('click', function(event) {
                event.preventDefault();

                location.replace('#edit-profile');
            });
            
            $('#option-my-favs').on('click', function(event) {
                event.preventDefault();

                location.replace('#my-favorite-products');
            });
            
            $('#option-my-orders').on('click', function(event) {
                event.preventDefault();

                location.replace('#my-orders');
            });

            $('.delete-from-cart').on('click', function(event) {
                event.preventDefault();

                var row = $(this).closest('tr[cart-product-id]');
                var productId = row.attr('cart-product-id');
                
                userService.removeFromCart(user.id, productId);

                row.closest($('section')).fadeOut(500);
                setTimeout(myCartController, 500);
            });
            
            if($('#delivery-td').html() == ' лв.') {
                $('#delivery-td').html('БЕЗПЛАТНА');
                $('#delivery-td').css('color', 'green');
                $('#delivery-td').css('font-weight', 'bold');
            }

            $('#order-button').on('click', function(event) {
                event.preventDefault();
                var currOrder = new Order(user.cart.products);
                userService.addOrderInProcess(user.id, currOrder);
                location.replace('#order');
                
            })

        });
}

