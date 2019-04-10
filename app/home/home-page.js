const HomeViewModel = require("./home-view-model");
const homeViewModel = new HomeViewModel();
const topmost = require("tns-core-modules/ui/frame").topmost;
var observableArray = require("tns-core-modules/data/observable-array");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
var dataStore = Kinvey.DataStore.collection('appointment', Kinvey.DataStoreType.Network);

var page;

/*
* Fetches all user appointments
* and loads them on page load 
*/
exports.onNavigatingTo = function(args) {
    page = args.object;
    var arr = new observableArray.ObservableArray();

    dataStore.find()
    .subscribe(function(entities) {
        arr.push(entities);
        homeViewModel.appointments = { appointments: arr};
        page.bindingContext = homeViewModel;
    });
}

/*
* Removes appointment by ID
* whose x button was tapped.
* Then alerts if there was success
* or failure upon deletion.
*/
exports.removeAppointment = function(args) {
    var li = args.object;

    dataStore.removeById(li.value)
    .then(() => {
        topmost().navigate({
            moduleName: "./home/home-page",
            clearHistory: true,
            transition: { 
                name: "fade" 
            }
        });
        alert("Your appointment has been cancelled.");
    })
    .catch(() => {
        alert("Your appointment could not be cancelled.");
    });
}

/*
* Creates appointment when
* the + button is tapped.
* Collects data from input field,
* then alerts if there was success
* or failure upon save.
*/
exports.createAppointment = function() {
    var date = page.getViewById('input').text;

    if (date.trim() === "") {
        alert("Date cannot be blank.");
        return;
    }

    var regex = /^\d{2}-\d{2}-\d{4}$/;
    if(!regex.test(date)){
        alert("Required date format MM-DD-YYYY.");
        return;
    }

    dataStore.save({dateTime: date})
    .then(() => {
        topmost().navigate({
            moduleName: "./home/home-page",
            clearHistory: true,
            transition: { 
                name: "fade" 
            }
        });
        alert("Appointment created successfully.");
    })
    .catch((e) => {
        alert("Unfortunately we could not save your appointment.");
    });
}

exports.selectDate = function() {

}

