document.addEventListener('DOMContentLoaded', function () {
    function router() {
        var page = location.hash.slice(1);

        switch (page) {
            case 'login':
                loginAndRegisterController();
                break;
            case 'register':
                loginAndRegisterController(true);
                break;
            case 'edit-profile':
                editProfileController();
                break;
            case 'my-orders':
                myOrdersController();
                break;
            case 'my-favorite-products':
                myFavoriteProductsController();
                break;
            case 'my-cart':
                myCartController();
                break;
            case 'order':
                orderController();
            case 'products':
                typesOfProductsPageController();
            default:
                userController();
                break;
        }
    }

    window.addEventListener('hashchange', router);
    router();
});