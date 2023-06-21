// IMPORTS
const { REFUSED } = require("dns");
const request = require("request");


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {

  // ipify.org [Account Required]
  const ipRetrievalServiceUrl = `https://geo.ipify.org/api/v2/country?apiKey=at_IJJYLKOpKd3XL8cLMLHrV37F4GSGr`;


  request(ipRetrievalServiceUrl, (error, response, body) => {

    // Error Handling: Print the error(s) if one occurred.
    // Note: `if(error === true)` DOES NOT WORK. You must use `if (error)`.
    // For regular errors:
    if (error) {

      // If the request returns an error, invoke the callback and return the
      // `error` object and null for the `description` parameter.
      callback(error, null);

    }


    // If the request goes through...but the status code is not 200, then
    // the request failed in a way that requires particular handling. This
    // code block creates a new Error object that can be passed around. Since
    // this is only helper function, you don't want to handle it here, just
    // bubble it back to the caller via the callback.
    if (response.statusCode !== 200) {

      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(message), null);

      // If the request goes through...
    } else {

      // Log the returned resource (i.e. the body) to console so we can see
      // what it looks like:
      // console.log(body);

      // The body looks like a JSON string. It will need to deserialized into
      // a JavaScript Object.
      const bodyObj = JSON.parse(body);

      // Retrieve the IP Address field from `bodyObj`.
      const ipAddress = bodyObj.ip;

      // Return IP Address to caller:
      callback(null, ipAddress);

    }

  });

};


// EXPORTS
module.exports = { fetchMyIP };