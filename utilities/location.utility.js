var mongoose = require('mongoose');
var Location = mongoose.model('Location');
const appRoot = require('app-root-path');
var errorCodes = require(appRoot + '/utilities/errorConfig.js');


module.exports.getLocationByIDHelper = (locationID) => {
    return new Promise((resolve, reject) => {
        Location
            .findById(locationID)
            .then((document) => {
                resolve(document);
            })
            .catch((err) => {
                reject(err)
            });
    });
};

module.exports.getOrCreateLocation = async (locationParams) => {
    try {
        let parsedLocation = JSON.parse(locationParams);
        let location = await getLocationByGooglePlacesIDOrID(parsedLocation.place_id)
        if (location && location._id) {
            return (location);
        } else {
            return await createLocation(parsedLocation)
        }
    } catch (err) {
        res.status(400).json(err)
    }
};

var createLocation = async (locationParams) => {
    try {
        if (!locationParams.place_id) {
            return (errorCodes.locationErrors.missingPlaceIDParam);
        }
        let localParams = {
            googlePlaceID: locationParams.place_id
        };
        let loc = new Location(localParams);
        let newLocation = await Location.create(loc)
        return (newLocation)
    } catch (err) {
        return err
    }

}

var getLocationByGooglePlacesIDOrID = (googlePlaceID) => {
    return new Promise((resolve, reject) => {
        Location
            .findOne({
                'googlePlaceID': googlePlaceID
            })
            .then((location) => resolve(location))
            .catch((err) => {
                reject(err)
            });
    });
};


module.exports.getLocationByGooglePlacesIDOrID = getLocationByGooglePlacesIDOrID;