const LoginViewModel = require("./login-view-model");

const loginViewModel = new LoginViewModel();

exports.onNavigatingTo = function (args) {
    const page = args.object;
    page.bindingContext = loginViewModel;
}