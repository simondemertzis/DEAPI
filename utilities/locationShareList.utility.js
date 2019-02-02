var _ = require('lodash');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var LocationVisit = mongoose.model('LocationVisit');
var LocationShare = mongoose.model('LocationShare');
var LocationShareList = mongoose.model('LocationShareList');
const appRoot = require('app-root-path');
var errorCodes = require(appRoot + '/utilities/errorConfig.js');



module.exports.associateListToUser = (listToAssociate, sharedToUserID) => {
    return new Promise(function (resolve, reject) {
        LocationShareList
            .findById({_id : listToAssociate})
            .then((foundLocation) => {
                if(foundLocation != null || foundLocation != undefined){
                    if(foundLocation.sharedToUsers){
                        var foundUser = _.find(foundLocation.sharedToUsers, (responseIndex) => {
                            return (responseIndex._id == sharedToUserID)
                        })

                        if(!foundUser){
                           return  foundLocation.update({$push :{sharedToUsers:sharedToUserID}})
                        }

                        if(foundUser){
                            return ({'error' : "This user is already associated to this list",
                                     'errorCode' : 409})
                        }
                    }else{
                        return  foundLocation.update({$push :{sharedToUsers:sharedToUserID}})
                    }
                }
            }).then((updatedLocation) => {
                resolve(updatedLocation)
            })
            .catch((error) => {
                reject(error)
            })
    });

}