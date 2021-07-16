import secrets from "./secrets"

let apiURL = 'https://us-central1-daily-memes-1fd52.cloudfunctions.net/tumblr'

if (process.env.DEV === true){
    apiURL = "http://localhost:5001/daily-memes-1fd52/us-central1/tumblr"
}


export default {
    async getBlogPosts(){
        var axios = require('axios');

        var config = {
        method: 'get',
        url: `${apiURL}/getPosts`,
        headers: { 
            'Authorization': secrets.tumblrAPIkey
        }
        };

        let response = await axios(config)
        return response.data
    }
}