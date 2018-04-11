document.addEventListener('DOMContentLoaded', function () {
    function router() {
        var page = location.hash.slice(1);
        if((page.search("products") >= 0) && (page.search("favorite") < 0)){
            page = "products";
        };

        if (!JSON.parse(sessionStorage.getItem('isLogged')) && page != '' && page != 'login' && page != 'register') {
            location.replace('#login');
            return;
        }
        console.log(page);
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
                break;
            case 'products':
                typesOfProductsPageController();
                break;
            case 'product':
                productPageController();
                break;
            default:
                userController();
                break;
        }
    }

    window.addEventListener('hashchange', router);
    router();
});