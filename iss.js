// IMPORTS
const { func } = require("assert-plus");
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


// This function will query an geo-location service and send them your local IP.
// The service will return the latitude & longitude of your location as an
// object.
const fetchCoordsByIP = function(ip, callback) {

  // We will use the `IPWho` service. This is its co-ordinates.
  const geoCoordUrl = `http://ipwho.is/${ip}`;


  // Query the `IPWho` API to find your co-ordinates.
  request(geoCoordUrl, (error, response, body) => {

    // Log the returned resource (i.e. the body) to console so we can see
    // what it looks like:
    // console.log(body);

    // The body looks like a JSON string. It will need to deserialized into
    // a JavaScript Object.
    const bodyObj = JSON.parse(body);

    if (error) {

      // If the request returns an error, invoke the callback and return the
      // `error` object and null for the `description` parameter.
      callback(error, null);

    }

    // This server doesn't seem to send back status code errors. If the
    // request goes through successfully and the server returns a response...
    // but the response notes a failure...
    if (bodyObj.success !== true) {

      // Create a message about the error and fill it with necessary details...
      const message = `Success Message: ${bodyObj.success}. Error: ${bodyObj.message} when fetching coordinates. IP: ${bodyObj.ip}`;
      // ... and bubble it back to the caller, so they can deal with it.
      callback(Error(message), null);

    } else {

      // We need only the Latitude and Longitude values, so extract them into
      // this object:
      const geoLocationObj = {
        latitude: bodyObj.latitude,
        longitude: bodyObj.longitude
      };

      // Check if the two values have been extracted appropriately:
      // console.log(geoLocationObj);

      // Return this object to caller.
      callback(null, geoLocationObj);



    }

  });

};


// EXPORTS
module.exports = { fetchMyIP, fetchCoordsByIP };