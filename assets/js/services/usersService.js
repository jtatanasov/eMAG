var isLogged = false;
var loggedUser = null;

var User;

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
    User = function (email, fullname, password) {
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

    UserStorage.prototype.changeName = function (id, newName) {
        var user = this.getUserById(id);
        if (isValidString(fullname)) {
            user.fullname = fullname;
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    UserStorage.prototype.changeMail = function (id, newEmail) {
        var user = this.getUserById(id);
        if (isValidMail(newEmail)) {
            user.email = newEmail;
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    UserStorage.prototype.changePassword = function (id, newPass) {
        var user = this.getUserById(id);
        if (isValidPassword(newPass)) {
            user.password = newPass;
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    UserStorage.prototype.checkPassword = function (id, pass) {
        var user = this.getUserById(id);
        return (user.password === pass)
    }
    UserStorage.prototype.addPhoneNumber = function (id, newPhoneNumber) {
        var user = this.getUserById(id);

        if (isValidPhoneNumber(newPhoneNumber)) {
            user.phoneNumber = newPhoneNumber;
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }
    UserStorage.prototype.addAddress = function (id, newAddress) {
        var user = this.getUserById(id);
        console.log(newAddress);
        if (isValidString(newAddress)) {
            user.address = newAddress;
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    UserStorage.prototype.deleteAddress = function (id) {
        var user = this.getUserById(id);
        user.address = '';
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }
    UserStorage.prototype.addTitle = function (id, title) {
        var user = this.getUserById(id);
        if (isValidTitle(title)) {
            user.title = title;
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }

    //?? order instaceof Order?
    UserStorage.prototype.ordering = function (id) {

        var user = this.getUserById(id);
        if (user.cart.length != 0) {
            user.cart.forEach(product => user.orders.push(product));
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this.users));
        } else {
            throw new Error('The cart is empty!');
        }
    }

    //?? instaceof
    UserStorage.prototype.addFavourite = function (id, product) {
        var user = this.getUserById(id);
        user.favoriteProducts.push(product);
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    UserStorage.prototype.deleteAllFavorites = function(id) {
        var user = this.getUserById(id);
        user.favoriteProducts = [];
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }
    //?? instanceof 
    UserStorage.prototype.addToCart = function (id, product) {
        var user = this.getUserById(id);
        
        var containProduct = user.cart.some((pr) => pr.name === product.name);

        if (!containProduct) {
            user.cart.push(product);
        }
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }


    function UserStorage() {
        if (localStorage.getItem('users')) {
            this.users = JSON.parse(localStorage.getItem('users'));
        } else {
            this.users = [];
        }
    }

    UserStorage.prototype.register = function (email, fullname, password) {
        if (!this.users.find(u => u.email === email)) {
            var newUser = new User(email, fullname, password);
            this.users.push(newUser);
            localStorage.setItem('users', JSON.stringify(this.users));
            return newUser.id; //?
        } else {
            // throw new Error('Existing user with this email!');
            return false;
        }
    }

    UserStorage.prototype.login = function (email, password) {

        var user = this.users.find(u => (u.email === email && u.password === password));

        if (user) {
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

    UserStorage.prototype.getUserById = function (id) {
        return this.users.find(u => u.id == id);
    }

    UserStorage.prototype.logout = function () {
        sessionStorage.setItem('isLogged', false);
        sessionStorage.setItem('loggedUser', null);
    }

    return new UserStorage();
})();