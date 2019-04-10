const Kinvey = require("kinvey-nativescript-sdk").Kinvey;

/*
* Handles error messages
*/
function handleErrors(error) {
    console.error(error.message);
}

/*
* Registers user 
* @returns js promise
*/
exports.register = function (user) {
    return new Promise((resolve, reject) => {
        Kinvey.User.logout()
            .then(() => {
                Kinvey.User.signup({ username: user.email, password: user.password })
                    .then(resolve)
                    .catch((error) => { handleErrors(error); reject(); })
            })
            .catch((error) => { handleErrors(error); reject(); })
    });
};

/*
* Logs in user 
* @returns js promise
*/
exports.login = function (user) {
    return new Promise((resolve, reject) => {
        Kinvey.User.logout()
            .then(() => {
                Kinvey.User.login(user.email, user.password)
                    .then(resolve)
                    .catch((error) => { handleErrors(error); reject(); })
            })
            .catch((error) => { handleErrors(error); reject(); })
    });
};

/*
* Resets user password
*/
exports.resetPassword = function (email) {
    return Kinvey.User.resetPassword(email)
        .catch(handleErrors);
}

/*
* Logs out user 
* @returns js promise
*/
exports.logout = function () {
    return new Promise((resolve, reject) => {
        Kinvey.User.logout()
            .then(resolve)
            .catch((error) => { handleErrors(error); reject(); })
    });
}
