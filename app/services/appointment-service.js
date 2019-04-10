const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
var dataStore = Kinvey.DataStore.collection('appointment', Kinvey.DataStoreType.Network);

/*
* Handles error messages
*/
function handleErrors(error) {
    console.error(error.message);
}

/*
* Saves new appointment
* @returns js promise
*/
exports.save = function(appointment) {
    return new Promise((resolve, reject) => {
        dataStore.save({
            dateTime: appointment.dateTime
        })
        .then(resolve)
        .catch((error) => { handleErrors(error); reject(); })
    });
}

/*
* Removes appointment 
* @returns js promise
*/
exports.remove = function(id) {
    return new Promise((resolve, reject) => {
        dataStore.removeById(id)
        .then(resolve)
        .catch((error) => { handleErrors(error); reject(); })
    });
}