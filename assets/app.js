document.addEventListener('DOMContentLoaded', function () {
    function router() {
        var page = location.hash.slice(1);

        switch (page) {
            case 'edit-profile':
                editProfileController();
                break;
            case 'login':
                loginAndRegisterController();
                break;
            case 'register':
                loginAndRegisterController(true);
                break;
            default:
                userController();
                break;
        }
    }

    window.addEventListener('hashchange', router);
    router();
});