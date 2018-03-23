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

        var firstNavExtension = null;
        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if(!logged) {
            firstNavExtension = document.getElementsByClassName('nav-extensions')[0];
        }
        //todo logged user

        firstNavExtension.style.display = 'block';

        firstNavExtension.addEventListener('mouseleave', function() {
            firstNavExtension.style.display = 'none';
            myAccLink.style.color = '#ffffff';
        })
    }, false);


    //todo
    myFavsLink.addEventListener('click', function(event) {

    }, false)
    myFavsLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myFavsLink.style.color = '#E9EBEE';

        var secondNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if(!logged) {
            secondNavExtension = document.getElementsByClassName('nav-extensions')[1];
        }
        //todo logged user
            
        secondNavExtension.style.display = 'block';
        secondNavExtension.style.left = '-190%';

        secondNavExtension.addEventListener('mouseleave', function() {
            secondNavExtension.style.display = 'none';
            myFavsLink.style.color = '#ffffff';
        })
      
    }, false);

    
    myCartLink.addEventListener('mouseenter', function (event) {
        event.preventDefault();

        myCartLink.style.color = '#E9EBEE';

        var thirdNavExtension = null;

        var logged = JSON.parse(sessionStorage.getItem('isLogged'));
        if(!logged) {
            thirdNavExtension = document.getElementsByClassName('nav-extensions')[2];
        }
        //todo logged user
            
        thirdNavExtension.style.display = 'block';
        thirdNavExtension.style.left = '-105%';

        thirdNavExtension.addEventListener('mouseleave', function() {
            thirdNavExtension.style.display = 'none';
            myCartLink.style.color = '#ffffff';
        });
      
    }, false);

});