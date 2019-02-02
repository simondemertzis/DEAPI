module.exports = {

    userErrors : {
        userNotFoundError : {
            errorCode : 40000,
            description: 'A user with this passed ID was not found'
        },
        userIDNotPassed : {
            errorCode : 40003,
            description : 'No ID passed user could not be created'
        }
    },
    locationVisitErrors : {
        noLocationsVisitsPasses : {
            errorCode : 40001,
            description : 'No visited locations found'
        },
        noLocationIDPassed : {
            errorCode : 40004,
            description : 'Missing Parameter Location ID'
        },
        locationVisitAlreadyExists : {
            errorCode : 40005,
            descriptions : 'A visit to this location already exists'
        },
        locationVisitNotFound : {
            errorCode : 40006,
            descriptions : 'A the visit was not found because there was no visit with passed ID found'
        },
        noVisitedLocationsFoundForUser : {
            errorCode : 40007,
            description : 'No visited locations were found for this user check the passed user id'
        },
        noUpdateParamsPassed : {
            errorCode : 40008,
            description : 'No update paramaters were passed'
        }
    },
    locationErrors : {
        missingPlaceIDParam : {
            errorCode : 40007,
            decription : 'Place ID was not passed location was not created'
        }
    }
}