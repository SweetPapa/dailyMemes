const secrets = require("./secrets")
const tumblr = require('tumblr.js');

class tumblrAPI {
    #client
    blogIDs = [
        "cleanmemes",
        "wholesomememes"
    ]
    memePosts = []

    constructor(){
        this.#client = tumblr.createClient({
          consumer_key: secrets.consumer_key,
          consumer_secret: secrets.consumer_secret,
          returnPromises: true
        //   token: '<oauth token>',
        //   token_secret: '<oauth token secret>'
        });
    }

    async getBlogPost(){
        for (let blogID in this.blogIDs){
            let BlogPosts = await this.#client.blogPosts(this.blogIDs[blogID])
            this.memePosts.push(BlogPosts)
        }

        return this.memePosts
    }
}

module.exports = {
    tumblrAPI
}