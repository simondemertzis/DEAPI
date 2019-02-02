var _ = require('lodash');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var LocationVisit = mongoose.model('LocationVisit');
var LocationShare = mongoose.model('LocationShare');
var LocationShareList = mongoose.model('LocationShareList');
var blueBird = require("bluebird");
const appRoot = require('app-root-path');
var errorCodes = require(appRoot + '/utilities/errorConfig.js');



module.exports.createLocationShareObject = async (locationsToShare) => {
        if (locationsToShare.isArray == false) {
            locationsToShare = [locationsToShare];
        }

       let locationObject = await blueBird.map(locationsToShare, function (location) {
            let newLocationToShare = new LocationShare({
                locationID : location
            });
            return(LocationShare.create(newLocationToShare))
        })
        return locationObject; 
}
