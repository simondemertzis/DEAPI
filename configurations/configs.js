var config = {};

config.dev = {
        mongoData : {
            mongoCollectionLocation: "ds253468.mlab.com:53468/locations",
            mongoUser: "dbuser",
            mongoPass: "B6HfyLrGmxAdpB4Y74fTj5qVV6ysY7THJQV5E"
        }
};

config.test = {
        mongoData : {
            mongoCollectionLocation: "ds141209.mlab.com:41209/testing_omnomnom",
            mongoUser: "administrator_test_omnomnom",
            mongoPass: "F487crzjd2ENgEBPsSf9WLZNB"
        }
};


config.test.mongoURI = "mongodb://"+config.test.mongoData.mongoUser+":"+config.test.mongoData.mongoPass+"@"+config.test.mongoData.mongoCollectionLocation;
config.dev.mongoURI = "mongodb://"+config.dev.mongoData.mongoUser+":"+config.dev.mongoData.mongoPass+"@"+config.dev.mongoData.mongoCollectionLocation;

function getEnviormentalConfig(){
    switch(process.env.NODE_ENV){
        case 'development':
        case 'dev':
            return config.dev;

        case 'test':
            return config.test;

        case 'production':
            return config.production;

        default:
            return config.dev;
    }
};

module.exports = getEnviormentalConfig();