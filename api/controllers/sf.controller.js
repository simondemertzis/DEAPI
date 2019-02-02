const fetch = require("node-fetch");

module.exports.loginStandard = async (req, res) => {
    try {
        let requestData = {};
        requestData.client_id = '3MVG9KsVczVNcM8zbbWWRVwjudmdhP72u1lPPl4NP7ICeTE6CF7D1rkhayB8YMfzPQAHKkGT4.1W9s4oqL_ww'
        requestData.client_secret = '7887312157021743770'
        requestData.username = req.body.username || 'simondemertzis@gmail.com'
        requestData.password = req.body.password || 'test@1234gWWUFYv7MOfGKEdzwVNHzpsp'
        requestData.grant_type = 'password'
            
        const accessData = await fetchSfAccessToken(requestData)
        console.log(accessData)
        return res.status(200).json(accessData)

    } catch (err) {
        res.status(400).json(err)
    }
}



module.exports.getAndUpdateCase = async (req, res) => {
    try {
        let accessToken
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            accessToken = req.headers.authorization.split(' ')[1];
        else
            res.status(400).json({
                'message': 'No access token passed or credentials were passed'
            })


        const instance = 'https://na85.salesforce.com'
        const apiPath = '/services/data/v42.0/sobjects/'
        const object = 'Case/'
        const objectID = req.body.objectID || '5001U000004ZfOiQAK'
        const getUrl = instance+apiPath+object+objectID;
        const getOptions = {
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' + accessToken
            }
        }
        const caseResponse = await fetch(getUrl, getOptions);
        const caseJson = await caseResponse.json();

        let updateBody = {}
        if(caseJson.Subject.toLowerCase() == 'test'){
            updateBody = {"Subject" : "Test01"}
        }
        else if(caseJson.Subject.toLowerCase() = 'test01'){
            updateBody = {"Subject" : "Test"}
        }
        else{
            return res.status(200).json({'message' : 'No matching subject line found, current case subject line =' + caseJson.Subject || 'No Subject'})
        }

        const patchUrl = instance+apiPath+object+objectID;
        const patchOptions = {
            method: 'patch',
            body: JSON.stringify(updateBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        }

        const updateCaseResponse = await fetch(patchUrl, patchOptions);
        if(updateCaseResponse.status && updateCaseResponse.status == 204)
            res.status(200).json({'message' : 'Case Subject has been updated to: ' + updateBody.Subject})
        else
            res.status(400).json({'message' : 'Error in patch request to SF'})
        
    } catch (err) {
        res.status(400).json(err);
    }
}

async function fetchSfAccessToken(requestData) {
    try {
        const url = 'https://login.salesforce.com/services/oauth2/token';
        const options = {
            method: 'POST',
            body: encodeURI('grant_type=' + requestData.grant_type + '&client_id=' + requestData.client_id + '&client_secret=' + requestData.client_secret + '&username=' + requestData.username + '&password=' + requestData.password + ''),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const accessResponse = await fetch(url, options);
        return accessResponse.json();
    } catch (err) {
        return (err)
    }
}