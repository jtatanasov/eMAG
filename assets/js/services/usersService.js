var isLogged = false;
var loggedUser = null;

var userService = (function () {
    function isValidMail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidString(str) {
        return (typeof str === 'string' && str.length > 0);
    }
    function hasNumber(str) {
        return /\d/.test(str);
    }
    function isValidPassword(pass) {
        return (typeof pass === 'string' && pass.length >= 6 && hasNumber(pass))
    }
    function isValidPhoneNumber(phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone));
    }
    function isValidTitle(title) {
        return (title === 'mr' || title === 'mrs' || title === 'miss')
    }
    function User(email, fullname, password) {
        this.id = ++User.nextId;

        if (isValidMail(email)) {
            this.email = email;
        } else {
            throw new Error('Invalid email!');
        }
        if (isValidString(fullname)) {
            this.fullname = fullname;
        } else {
            throw new Error('Invalid name');
        }

        if (isValidPassword(password)) {
            this.password = password;
        } else {
            throw new Error('Invalid password');
        }

        this.phoneNumber = '';
        this.address = '';
        this.title = '';

        this.orders = []; //maybe this.orders = new Orders() ?
        this.favoriteProducts = []; //maybe this.favouriteProducts = new Products() ?
        this.cart = []; //?

        this.photo = '';
    }

    User.nextId = 0;

    User.prototype.addPhoneNumber = function (newPhoneNumber) {
        if (isValidPhoneNumber(newPhoneNumber)) {
            this.phoneNumber = newPhoneNumber;
        }
    }
    User.prototype.addAddress = function (newAddress) {
        if (isValidString(newAddress)) {
            this.address = newAddress;
        }
    }
    User.prototype.addTitle = function (title) {
        if (isValidTitle(title)) {
            this.title = title;
        }
    }

    //?? order instaceof Order?
    User.prototype.ordering = function () {
        if (this.cart.length != 0) {
            this.cart.forEach(product => this.orders.push(product));
        } else {
            throw new Error('The cart is empty!');
        }
    }

    //?? instaceof
    User.prototype.addFavourite = function (product) {
        this.favoriteProducts.push(product);
    }
    //?? instanceof 
    User.prototype.addToCart = function (product) {
        this.cart.push(product);
    }


    function UserStorage() {
        if(localStorage.getItem('users')) {
            this.users = JSON.parse(localStorage.getItem('users'));
        } else {
            this.users = [];
        }
    }

    UserStorage.prototype.register = function(email, fullname, password) {
        if(!this.users.find(u => u.email === email)) {
            var newUser = new User(email, fullname, password);
            this.users.push(newUser);
            localStorage.setItem('users', JSON.stringify(this.users));
            return newUser.id; //?
        } else {
            // throw new Error('Existing user with this email!');
            return false;
        }
    }

    UserStorage.prototype.login = function(email, password) {
        
        var user = this.users.find(u => (u.email === email && u.password === password));
        
        if(user) {
            // delete user.password;
            isLogged = true;
            loggedUser = JSON.stringify(user);
            loggedUser = JSON.parse(loggedUser);
            delete loggedUser.password;
            loggedUser = JSON.stringify(loggedUser);
            sessionStorage.setItem('isLogged', isLogged);
            sessionStorage.setItem('loggedUser', loggedUser);
            return user.id;
        } else {
            return false;
        }
    }

    UserStorage.prototype.logout = function() {
        sessionStorage.setItem('isLogged', false);
        sessionStorage.setItem('loggedUser', null);
    }

    return new UserStorage();
})();