const functions = require("firebase-functions");
const APIauth = require("basic-auth");
const cors = require("cors");
const compare = require("tsscmp");
const secrets = require("./secrets")


// Basic function to validate credentials for example
function check(name, pass) {
    let valid = true;
    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, secrets.name) && valid;
    valid = compare(pass, secrets.pass) && valid;
    return valid;
  }
  
  function checkAuth(request, response) {
    var credentials = APIauth(request);
    // Check credentials
    if (!credentials || !check(credentials.name, credentials.pass)) {
      functions.logger.warn("Unauthorized", { structuredData: true });
      response.send("Access denied").status(401);
      return false;
    }
    return true;
  }

exports.tumblr = functions.https.onRequest(async (request, response) => {
    return cors()(request, response, async () => {
        if (checkAuth(request, response) === false) {
          return
        }

        let selectedApi = request.params;
        let params = request.query;

        const {tumblrAPI} = require("./clsTumblr")

        let tumblr = new tumblrAPI()

        switch (selectedApi[0]) {
            case "getPosts":
            case "/getPosts":
                let result = await tumblr.getBlogPost()
                .then(result => response.send({result: result}).status(200))
                .catch(err => response.send({error: err, result: false}).status(500))
                
                break 
            default:
                response.send({result: "No Valid API Specified"}).status(200)
        }



    })
});
