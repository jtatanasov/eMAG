document.addEventListener('DOMContentLoaded', function () {
    function router() {
        var page = location.hash.slice(1);

        switch (page) {
            case 'edit-profile':
                editProfileController();
                break;
            // case 'praskovi':
            //     praskoviController();
            //     break;
            // case 'addPraskova':
            //     addPraskovaController();
            //     break;

            default:
                userController();
                break;
        }
    }

    window.addEventListener('hashchange', router);
    router();
});