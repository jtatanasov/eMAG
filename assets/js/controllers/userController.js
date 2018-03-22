document.addEventListener('DOMContentLoaded', function () {
    var templatePath = '';
    var myAccLink = document.getElementById('my-account'),
        myFavsLink = document.getElementById('my-favorites'),
        myCartLink = document.getElementById('my-cart');

    //todo
    myAccLink.addEventListener('click', function(event) {
        event.preventDefault();

    })
    myAccLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myAccLink.style.color = '#E9EBEE';
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if(!logged) {
            templatePath = 'assets/js/templates/loggedOutUserAcc.js';
        }
        //todo logged user

        getTemplate(templatePath)
            .then(function (data) {
                var li = myAccLink.parentNode;
                li.innerHTML += data;

                var div = li.lastChild;
                div.addEventListener('mouseleave', function () {
                    myAccLink.style.color = '#FFFFFF';
                    li.removeChild(div);
                });

            })
            .catch(function (error) {

            });
    }, false);


    //todo
    myFavsLink.addEventListener('click', function(event) {

    }, false)
    myFavsLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if(!logged) {
            templatePath = 'assets/js/templates/loggedOutUserFavs.js';
        }
        
        //todo logged user

        getTemplate(templatePath)
            .then(function (data) {
                var li = myFavsLink.parentNode;
                li.innerHTML += data;
                var div = li.lastChild;
                div.style.left = '-190%';
                div.addEventListener('mouseleave', function () {
                    li.removeChild(div);
                });

            })
            .catch(function (error) {

            });
    }, false);

    
    myCartLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if(!logged) {
            templatePath = 'assets/js/templates/loggedOutUserCart.js';
        }
        
        //todo logged user
        
        getTemplate(templatePath)
            .then(function (data) {
                var li = myCartLink.parentNode;
                li.innerHTML += data;
                var div = li.lastChild;
                // div.style.left = '-40%';
                div.addEventListener('mouseleave', function () {
                    li.removeChild(div);
                });

            })
            .catch(function (error) {

            });
    }, false);

});