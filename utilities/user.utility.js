var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const appRoot = require('app-root-path');
var errorCodes = require(appRoot + '/utilities/errorConfig.js');


module.exports.getUserByIDHelper = (userID) => {
    return new Promise((resolve, reject) => {
        User
            .findById(userID)
            .then((document) => { resolve(document); })
            .catch((err) => { reject(err) });
    });
};

module.exports.searchForExistingVisitedLocation = (locationID, locationArray) => {
    console.log(locationID + '  ' + locationArray[0].toString())
    return new Promise((resolve, reject) => {
       var index =  locationArray.findIndex(responseIndex => {
           console.log(responseIndex.toString())
            responseIndex.toString() == locationID
        });
        resolve(index);
    });
}

module.exports.updateUserObjectID = (newID, oldID) => {
    return new Promise((resolve, reject) =>{
        getUserByIDHelper(oldID)
        .then((user) => {
        })
    })
}