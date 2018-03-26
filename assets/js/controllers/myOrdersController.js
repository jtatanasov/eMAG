function myOrdersController() {
    showAndHideAside();
    
    $.get('assets/js/templates/myOrdersTemplate.js')
        .then(function (data) {

            var user = JSON.parse(sessionStorage.getItem('loggedUser'));
            var template = Handlebars.compile(data);
            var html = template(user);
            var userName = user.fullname;
            var title = user.title;

            $('main').html(html);

            $('#fullname').val(userName);
            $('#option-my-orders').addClass('active-option');

            $('#option-personal-data').on('click', function(event) {
                event.preventDefault();

                location.replace('#edit-profile');
            });
            
            $('#option-my-favs').on('click', function(event) {
                event.preventDefault();

                location.replace('#my-favorite-products');
            });
            
            $('#option-my-cart').on('click', function(event) {
                event.preventDefault();

                location.replace('#my-cart');
            });

            //TODO
        });
}

