/* M02 W05 CHALLENGE: ISS SPOTTER (INTERNATIONAL SPACE STATION)
 *
 * For this activity, we will solve a slightly larger problem because it will
 * require us to make multiple API requests in succession in order to answer a
 * larger question. We'll also be writing unit tests for it, and therefore
 * keeping the code modular and testable while building it out, to avoid heavy
 * refactoring at the end.
 *
 *
 * THE PROBLEM
 *
 * We'll build a cool little app for space enthusiasts who are interested in
 * spotting the International Space Station (ISS). The ISS completes multiple
 * revolutions around Earth per day. In fact, it passes overhead every ~90
 * minutes, and in some cases can even be spotted with the naked eye, though
 * not every time.
 *
 *
 * THE APPROACH
 *
 * We'll be making API requests to three different services to solve this
 * problem.
 *
 *   1. Fetch our IP Address.
 *   2. Fetch the geo coordinates (Latitude & Longitude) for our IP.
 *   3. Fetch the next ISS flyovers for our geo coordinates.
 *
 * Each later step is dependent on data from the previous one.
 *
 * We will eventually be able to use our app in the following way:
 *
 *     > node index.js
 *     Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
 *     Next pass at Fri Jun 01 2021 14:36:08 GMT-0700 (Pacific Daylight Time) for 632 seconds!
 *     Next pass at Fri Jun 01 2021 16:12:35 GMT-0700 (Pacific Daylight Time) for 648 seconds!
 *     Next pass at Fri Jun 01 2021 17:49:29 GMT-0700 (Pacific Daylight Time) for 648 seconds!
 *     Next pass at Fri Jun 01 2021 19:26:12 GMT-0700 (Pacific Daylight Time) for 643 seconds!
 *
 *
 * STEP 1: API CALL #1: FETCH IP ADDRESS
 *
 * Let's start with step 1, which is to fetch our public IP Address, which will
 * later help (approximately) locate us geographically. Define a function
 * `fetchMyIP` which will asynchronously return our IP Address using an API.
 *
 *
 * STEP 2: API CALL #2: FETCH GEO COORDINATES BY IP
 *
 * Our next function, `fetchCoordsByIP()` will be one that takes in an IP
 * address and returns the latitude and longitude for it.
 *
 * There are again various APIs that can help. We'll go with `ipwho.is`. Give
 * the documentation a brief look, but don't read too deeply.
 *
 * Perform the same incremental steps as we did earlier with the `fetchMyIP()`
 * function.
 */


// IMPORTS
const { fetchMyIP } = require("./iss.js");
const { fetchCoordsByIP } = require("./iss.js");


// This function will call a service to check your IP Address and return it.
// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });



// The function takes your local IP and returns your geo-coordinates of your
// location.
// fetchCoordsByIP("178.249.214.10", (error, data) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! :', data);

// });