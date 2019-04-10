const observableModule = require("tns-core-modules/data/observable");
const topmost = require("tns-core-modules/ui/frame").topmost;
const userService = require("../services/user-service");
const appointmentService = require("../services/appointment-service");

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        logout: () => {
            userService.logout()
            .then(() => {
            topmost().navigate({
                    moduleName: "./login/login-page",
                    clearHistory: true
                });
            })
            .catch((e) => {
                alert("Unfortunately we could not log you out.");
            });
        }
    });

  return viewModel;
}

module.exports = HomeViewModel;
