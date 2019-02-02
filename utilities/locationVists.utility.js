var mongoose = require('mongoose');
var LocationVisit = mongoose.model('LocationVisit');
const appRoot = require('app-root-path');
var errorCodes = require(appRoot + '/utilities/errorConfig.js');


module.exports.addNewLocationVisit = async (location) => {
    try{
        if (location._id === null || location._id === undefined) {
            return(errorCodes.locationVisitErrors.noLocationIDPassed);
        } else {
            var locVisit = new LocationVisit({
                locationID: location._id,
                wouldRevisit: location.wouldRevisit 
            });

            let createdVisit = await LocationVisit.create(locVisit)
            let populatedVisit = await createdVisit.populate('locationID').execPopulate()
            return (populatedVisit)
        }
    }
    catch(err){
        return err
    }
};


