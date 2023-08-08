/* M02 W05 CHALLENGE: ISS SPOTTER (INTERNATIONAL SPACE STATION)
 *
 * Note: This challenge is implemented first WITHOUT promises and then WITH
 * promises. For this reason, it has been implemented twice in two sets of
 * files: The version WITHOUT promises is implemented in `index.js` and
 * `iss.js`. The version WITH promises is implemented in `index2.js` and
 * `iss_promised.js`.
 *
 * This file also has two ways of invoking it: Primary & Secondary. The primary
 * invocation just calls the `nextISSTimesForMyLocation()` method from
 * `iss_promised.js`. This method handles invoking all the asynchronous
 * functions, processes the data and returns only the rise times. The secondary
 * invocation is just a test—checking how to use the return values from
 * promises. It directly calls all three promises in `iss_promised.js` one at
 * a time.
 *
 *
 * THE CHALLENGE: ISS SPOTTER WITH PROMISES
 *
 * The goal is to avoid "Callback Hell"; so we're implementing `index.js` and
 * `iss.js`, this time using promises.
 *
 * In order to use promises, our HTTP request library needs to support them.
 * `request`, which we've used thus far, does not use promises. We need an
 * alternative.
 *
 * Note: There are various node libraries for making HTTP requests using
 * promises.
 *
 * For now, we will use `request-promise-native` even though it is not the most
 * popular. We pick it because it is related to the `request` library, which
 * we've already used and are somewhat comfortable with.
 */


// IMPORTS

// FOR SECONDARY INVOCATION
// const { fetchMyIP } = require("./iss_promised.js");
// const { fetchCoordsByIP } = require("./iss_promised.js");
// const { fetchISSFlyOverTimes } = require("./iss_promised.js");

// FOR PRIMARY INVOCATION
const { nextISSTimesForMyLocation } = require("./iss_promised.js");



// This function will simply print fly-over times and durations of the ISS in
// an easy readable format.
//
// Note: For some reason, importing this file from `index.js` results in
// errors, so `printFlyoverTimes()` was copied here.
const printFlyoverTimes = function(flyoverTimes) {

  // Iterate over the object...
  for (const passOverTime of flyoverTimes) {

    // Create a new `datetime` object.
    const datetime = new Date(0);

    // Add the `risetime` to it.
    datetime.setUTCSeconds(passOverTime.risetime);

    // Add the duration to the datetime.
    const duration = passOverTime.duration;

    // Log it to console.
    console.log(`The ISS will next pass over your location at ${datetime} for ${duration} seconds!`);
  }

};




// DRIVER CODE

// PRIMARY INVOCATION
// Calls `nextISSTimesForMyLocation` from `index2.js` and executes it.
nextISSTimesForMyLocation()
  .then((passTimes) => {

    console.log(`These are the flyoverTimes for your location: \n`);
    printFlyoverTimes(passTimes);

  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });



// SECONDARY INVOCATION: CALLING PROMISES ONE-BY-ONE AND DOING THINGS WITH THEM

// This is an alternate to the function call to `nextISSTimesForMyLocation()`.
// It calls the promises one-by-one and does things with the data returned from
// each promise. Clearly promises also need to be staggered in a waterfall
// sort of way, just like callbacks.

// fetchMyIP()

//   .then((responseBody) => {

//     console.log(`This is the RAW response body of the IP Request:
//       \n ${responseBody}.\n`);

//     fetchCoordsByIP(responseBody)

//       .then((geoCoords) => {

//         console.log(`This the RAW response body of your Geo-Coordinates Request:
//           \n ${geoCoords}.\n`);
//         fetchISSFlyOverTimes(geoCoords)

//           .then((riseTimesJSON) => {

//             console.log(`These are the RAW rise times at your location:
//               \n ${riseTimesJSON}.\n`);

//             // Parse the JSON string's `response` key section into an object.
//             const flyoverTimes = JSON.parse(riseTimesJSON).response;

//             console.log(`These are the flyoverTimes for your location: \n`);

//             printFlyoverTimes(flyoverTimes);

//           });

//       });

//   })

//   .catch((error) => {
//     console.log("It didn't work: ", error.message);
//   });