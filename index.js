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
 * STEP 1: API CALL#1: FETCH IP ADDRESS
 *
 * Let's start with step 1, which is to fetch our public IP Address, which will
 * later help (approximately) locate us geographically. Define a function
 * `fetchMyIP` which will asynchronously return our IP Address using an API.
 *
 *
 */