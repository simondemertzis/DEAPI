var validator = require('validator');

var paramsMap = {
    postLocation : {
        params : [
            {
                name : "name",
                required : true,
                type : "string"
            }
        ]
    }
};

module.exports.validateRequestParameters = (req, type, obj) => {
    var missingFields = "";
    var hasMissingField = false;
    var incorrectFieldType = false;
    paramsMap = paramsMap[type]['params'];
    paramsMap.forEach((param) => {
        if(param.required && (!obj.hasOwnProperty(param.name))){
            missingField = param.name;

        }else if(param.required &&(obj.hasOwnProperty(param.name))&& obj[param.name] === ""){
            missingField = param.name;
        }
    });
};