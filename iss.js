const request = require("request");
const IPURL = "https://api.ipify.org?format=json";

const fetchMyIP = function (callback) {
  request(IPURL, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
        ),
        null
      );
      return;
    }
    body = JSON.parse(body);
    console.log(body);
    callback(null, body);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  console.log(`lattitude: ${coords.lat} longitude: ${coords.lon}`);
  const flyOverUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`;

  request(flyOverUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
        ),
        null
      );
      return;
    }

    const passes = JSON.parse(body).response;
    console.log(passes);
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

// const coord = { latitude: "49.27670", longitude: "-123.13000" };

// fetchISSFlyOverTimes(coord, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned flyover times:", passTimes);
// });

// fetchCoordsByIP("216.232.132.90", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned Coords:", coords);
//   // const coord = { latitude: "48.4371", longitude: "-123.3597" };
//   const coord = { latitude: "49.27670", longitude: "-123.13000" };
// });

// Don't need to export the other functions since we are not testing them right now.
module.exports = {
  fetchISSFlyOverTimes,
  fetchCoordsByIP,
  fetchMyIP,
  nextISSTimesForMyLocation,
};
