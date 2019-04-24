const HomeViewModel = require("./home-view-model");
const homeViewModel = new HomeViewModel();
const topmost = require("tns-core-modules/ui/frame").topmost;
var observableArray = require("tns-core-modules/data/observable-array");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
var dataStore = Kinvey.DataStore.collection('appointment', Kinvey.DataStoreType.Network);

let page;

/*
* Fetches all user appointments
* and loads them on page load 
*/
exports.onNavigatingTo = function(args) {
    page = args.object;

    let arr = new observableArray.ObservableArray();

    const dateInput = page.getViewById('input');
    dateInput.set("date", new Date());
    dateInput.set("minDate", new Date());
    dateInput.set("maxDate", new Date(2021, 01, 01));

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
    let li = args.object;

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
    let date = page.getViewById('input').date.toString();
    date = date.split(' ').slice(0, 4).join(' ');

    dataStore.save({ date })
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

