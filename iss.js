// IMPORTS
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

    // The body looks like a JSON string. It will need to be deserialized into
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



/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for
 * the given lat/lng coordinates.
 *
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 *
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(locationCoords, callback) {

  const flyoverUrl = `https://iss-flyover.herokuapp.com/json/?lat=${locationCoords.latitude}&lon=${locationCoords.longitude}`;

  // Query the Mock Flyover Times API to find your co-ordinates.
  request(flyoverUrl, (error, response, body) => {

    if (error) {

      // If the request returns an error, invoke the callback and return the
      // `error` object and null for the `description` parameter.
      callback(error, null);
      return;

    }

    // The body looks like a JSON string. It will need to be deserialized into
    // a JavaScript Object.
    const bodyObj = JSON.parse(body);
    // console.log(bodyObj);

    // This server doesn't seem to send back status code errors. If the
    // request goes through successfully and the server returns a response...
    // but the response notes a failure...
    if (bodyObj.message !== "success") {

      // Create a message about the error and fill it with necessary details...
      const message = `Error Message: ${bodyObj.message} when fetching ISS Flyover times.`;
      // ... and bubble it back to the caller, so they can deal with it.
      callback(message, null);

    } else {

      // We need only the flyover times from the body, so extract them into
      // this object:
      const flyoverTimesObj = bodyObj.response;

      // This is an array of objects with two elements, `risetime` & `duration`.
      // console.log(flyoverTimesObj);

      // Return this object to caller.
      callback(null, flyoverTimesObj);

    }

  });

};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming
 * ISS fly overs for the user's current location.
 *
 * Input:
 *
 *   - A callback with an error or results.
 *
 * Returns (via Callback):
 *
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {

  // STEP 1: Call `fetchMyIP()`...
  fetchMyIP((error, ip) => {

    // NOTE: Because this is an asynchronous function call, this step is
    // particularly likely to fail. So, the FIRST THING TO DO when you are
    // invoking callbacks, and especially when you're nesting callbacks, is to
    // handle the errors. If the callback executes properly, you can move on
    // to the next step.
    if (error) {
      callback(error, null);
    }


    // Step 1 should have returned the IP address or an error. If the program
    // made it to this point, the first callback must have executed without
    // errors.
    //
    // STEP 2: Call `fetchCoordsByIP()`...
    fetchCoordsByIP(ip, (err, coords) => {

      if (error) {
        callback(error, null);
      }

      // Step 2 should have returned an object with the geographical
      // co-ordinates of the IP.
      //
      // STEP 3: Call `fetchISSFlyOverTimes()`...
      fetchISSFlyOverTimes(coords, (error, times) => {

        if (error) {
          callback(error, null);
        }


        // If the third callback also executes without issues, then you should
        // have an array containing an object. The object will contain 5
        // "risetime's"; the times of the next 5 ISS flyovers over your position.
        // Return this object to the caller.
        callback(null, times);

      });

    });

  });

};



// EXPORTS
module.exports = { /* fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, */
  nextISSTimesForMyLocation
};