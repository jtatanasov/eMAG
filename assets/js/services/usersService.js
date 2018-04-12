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

        this.processingOrder = null;
    }

    User.nextId = 0;

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

    UserStorage.prototype.changeName = function (id, newName) {
        var user = this.getUserById(id);
        if (isValidString(fullname)) {
            user.fullname = fullname;
            updateStorage(user, this.users);
        }
    }

    UserStorage.prototype.changeMail = function (id, newEmail) {
        var user = this.getUserById(id);
        if (isValidMail(newEmail)) {
            user.email = newEmail;
            updateStorage(user, this.users);
        }
    }

    UserStorage.prototype.changePassword = function (id, newPass) {
        var user = this.getUserById(id);
        if (isValidPassword(newPass)) {
            user.password = newPass;
            updateStorage(user, this.users);
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
            updateStorage(user, this.users);
        }
    }
    UserStorage.prototype.addAddress = function (id, newAddress) {
        var user = this.getUserById(id);
        if (isValidString(newAddress)) {
            user.address = newAddress;
            updateStorage(user, this.users);
        }
    }

    UserStorage.prototype.deleteAddress = function (id) {
        var user = this.getUserById(id);
        user.address = '';
        updateStorage(user, this.users);
    }
    UserStorage.prototype.addTitle = function (id, title) {
        var user = this.getUserById(id);
        if (isValidTitle(title)) {
            user.title = title;
            updateStorage(user, this.users);
        }
    }

    UserStorage.prototype.ordering = function (id, order) {
        var user = this.getUserById(id);

        user.orders.push(order);

        updateStorage(user, this.users);
    }

    //?? instaceof
    UserStorage.prototype.addFavourite = function (id, product) {
        var user = this.getUserById(id);
        var containProduct = user.favoriteProducts.some((pr) => pr.name === product.name);

        if (!containProduct) {
            user.favoriteProducts.push(product);
        }
        updateStorage(user, this.users);
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

        updateStorage(user, this.users);
    }

    UserStorage.prototype.deleteAllFavorites = function (id) {
        var user = this.getUserById(id);
        user.favoriteProducts = [];
        updateStorage(user, this.users);
    }

    UserStorage.prototype.updateCart = function (id, cart) {
        var user = this.getUserById(id);

        user.cart = cart;

        updateStorage(user, this.users);
    }

    UserStorage.prototype.addOrderInProcess = function (id, order) {
        if (order instanceof Order) {
            var user = this.getUserById(id);

            user.processingOrder = order;
            updateStorage(user, this.users);
        }
    }

    UserStorage.prototype.removeOrderInProcess = function (id, order) {

        var user = this.getUserById(id);

        user.processingOrder = null;
        updateStorage(user, this.users);
    }

    function updateStorage(loggedUser, users) {
        //delete loggedUser.password;
        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        localStorage.setItem('users', JSON.stringify(users));
    }
    return new UserStorage();
})();