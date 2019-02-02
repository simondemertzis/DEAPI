var blueBird = require("bluebird");
var _ = require('lodash');
const appRoot = require('app-root-path');
var errorCodes = require(appRoot + '/utilities/errorConfig.js');


const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBbod9wuYu1chMIh187X1s7qhrpYplFbkE',
    Promise: Promise
})

module.exports.getPlacesDataAndConcatinateLocalData = async (location) =>{
    let locationArray = location;
    if(!locationArray.isArray)
        locationArray = [location];
    let googlePlacesDataArray = await this.getGoogleMapsPlacesInformation(locationArray)
    let concatinatedPlaceData = await this.concatinateMapsPlacesInformation(locationArray,googlePlacesDataArray)
    return concatinatedPlaceData
}

module.exports.getGoogleMapsPlacesInformation = (locationVisitsArray) => {
    return new Promise(function (resolve, reject) {
        blueBird.map(locationVisitsArray, function (locationVisit) {
            if(locationVisit.locationID.googlePlaceID)
                return googleMapsClient.place({ placeid: locationVisit.locationID.googlePlaceID }).asPromise()
            else return ({'error': 'Places ID not Valid'})
        })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error)//need to build error handling for google api does not return data or returns an error
            });
    });
}

module.exports.concatinateMapsPlacesInformation = (locationsArray, googlePlacesDataArray) => {
    return new Promise(function (resolve, reject) {
        locationsArray.forEach((element, index) => {
                let matchingGooglePlace =  _.find(googlePlacesDataArray, (responseIndex) => {
                    return (responseIndex.json.result.place_id == element.locationID.googlePlaceID);
                })
                let currentElement = locationsArray[index];
                if(matchingGooglePlace){
                    currentElement.locationID.name = matchingGooglePlace.json.result.name;
                    currentElement.locationID.address = matchingGooglePlace.json.result.formatted_address;
                }else{
                    currentElement.locationID.error = {
                        'errorCode' : 40009,
                        'description' : 'No matching place id found from google rsults'
                    }
                }
                //TODO: Add code that will delete the places page data element in order to have the next find search
                //for inceremently less items each time
            });

        if (locationsArray.length >= 1) {
            resolve(locationsArray);
        } else {
            reject({'error' : 'No elements passed and concatinated'});
        }
    });
}
