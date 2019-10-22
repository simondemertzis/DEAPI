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
        return res.status(200).json(accessData)
    } catch (err) {
        res.status(400).json(err)
    }
}



module.exports.getAndUpdateCase = async (req, res) => {
    try {
        const dataToReturn = req.body || {}
        const invoiceNumber = dataToReturn.invoiceNumber || "";
        
            res.status(200).json({'message' : 'The System Has Updated Invoice#: ' + invoiceNumber, invoiceUpdated:true})
        
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

module.exports.dedup =  async (req, res) => {
    try {
       
       return res.status(200).json({
            dedupResult : Math.random() >= 0.5
        })    
        
        
    } catch (err) {
       res.status(400).json(err)
    }
}

module.exports.fraudCheck =  async (req, res) => {
    try {
       
       return res.status(200).json({
            fraudCheck : Math.random() >= 0.5
        })    
        
    } catch (err) {
       res.status(400).json(err)
    }
}