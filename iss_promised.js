// IMPORTS
const requestPN = require("request-promise-native");


/*
 * Requests user's ip address from https://www.ipify.org/
 *
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string.
 */
const fetchMyIP = function() {

  return requestPN(`https://geo.ipify.org/api/v2/country?apiKey=at_IJJYLKOpKd3XL8cLMLHrV37F4GSGr`);

};


/*
 * Makes a request to `ipwho.is` using the provided IP address to get its
 * geographical information (latitude/longitude).
 *
 * Input: JSON string containing the IP address.
 * Returns: Promise of request for latitude & longitude.
 */
const fetchCoordsByIP = function(body) {

  // The body looks like a JSON string. It will need to deserialized into
  // a JavaScript Object.
  const bodyObj = JSON.parse(body);

  // Retrieve the IP Address field from `bodyObj`.
  const ipAddress = bodyObj.ip;

  // We will use the `IPWho` service. This is its co-ordinates.
  return requestPN(`http://ipwho.is/${ipAddress}`);

};


/*
 * Requests data from https://iss-flyover.herokuapp.com using provided latitude
 * & longitude data.
 *
 * Input: JSON body containing geo data response from `ipwho.is`.
 * Returns: Promise of request for fly over data, returned as JSON string.
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return requestPN(url);
};


/*
 * Input: None
 *
 * Returns: Promise for fly over data for users location.
 */
const nextISSTimesForMyLocation = function() {

  // Call the three other functions in sequence.
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });

};


// EXPORTS

// FOR PRIMARY INVOCATION
module.exports = { nextISSTimesForMyLocation };

// FOR SECONDARY INVOCATION
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };