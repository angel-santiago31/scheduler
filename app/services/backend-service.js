const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const kinveyAppKey = "kid_SyCkk1ed4";
const kinveyAppSecret = "f2c0acc699d948b2a16848502f2a7848";

exports.setup = function () {
    Kinvey.init({
        appKey: kinveyAppKey,
        appSecret: kinveyAppSecret
    });
};

// Kinvey.init({
//     apiHostname: 'CUSTDEP_HOST',
//     micHostname: 'CUSTDEP_MIC_HOST',
//     appKey: 'kid_SyCkk1ed4',
//     appSecret: 'f2c0acc699d948b2a16848502f2a7848'
//   })
