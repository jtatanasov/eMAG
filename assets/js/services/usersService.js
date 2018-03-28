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
        this.cart = new Cart();

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

        var containProduct = user.favoriteProducts.some((pr) => pr.name === product.name);

        if (!containProduct) {
            user.favoriteProducts.push(product);
        }
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    UserStorage.prototype.getFavoriteProductById = function (id, productId) {
        var user = this.getUserById(id);
        var product = user.favoriteProducts.find(pr => pr.id == productId);
        if (product) {
            return product;
        }
    }
    UserStorage.prototype.deleteFavorite = function (id, productId) {
        var user = this.getUserById(id);
        var index = user.favoriteProducts.findIndex(pr => pr.id == productId);
        user.favoriteProducts.splice(index, 1);

        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    UserStorage.prototype.deleteAllFavorites = function (id) {
        var user = this.getUserById(id);
        user.favoriteProducts = [];
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }
    //?? instanceof 
    UserStorage.prototype.addToCart = function (id, product) {
        var user = this.getUserById(id);

        var containProduct = user.cart.products.some((pr) => pr.name === product.name);
        if (!containProduct) {
            user.cart.products.push(product);
            user.cart.productsPrice = this.calculateProductsInCartPrice(user);
            user.cart.deliveryPrice = this.calculateDeliveryInCartPrice(user);
            user.cart.totalPrice = this.calculateTotalInCartPrice(user);
        }
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    UserStorage.prototype.removeFromCart = function(id, productId) {
        var user = this.getUserById(id);
        
        var index = user.cart.products.findIndex(pr => pr.id == productId);
        user.cart.products.splice(index, 1);
        user.cart.productsPrice = this.calculateProductsInCartPrice(user);
        user.cart.deliveryPrice = this.calculateDeliveryInCartPrice(user);
        user.cart.totalPrice = this.calculateTotalInCartPrice(user);
        
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    UserStorage.prototype.calculateProductsInCartPrice = function (user) {
        var price = 0;
        user.cart.productsPrice = user.cart.products.reduce(function (price, product) {
            return price + product.price;
        }, 0);
        return user.cart.productsPrice;
    }

    UserStorage.prototype.calculateDeliveryInCartPrice = function (user) {
        if (user.cart.productsPrice >= 1000) {
            user.cart.deliveryPrice = null;
        } else {
            user.cart.deliveryPrice = Number((0.05 * user.cart.productsPrice).toFixed(2));
        }
        return user.cart.deliveryPrice;
    }

    UserStorage.prototype.calculateTotalInCartPrice = function (user) {
        if (!user.cart.deliveryPrice) {
            user.cart.totalPrice = user.cart.productsPrice;
        } else {
            user.cart.totalPrice = user.cart.productsPrice + user.cart.deliveryPrice;
        }
        return user.cart.totalPrice;
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