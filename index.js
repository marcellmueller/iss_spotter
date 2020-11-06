const {
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  fetchMyIP,
  nextISSTimesForMyLocation,
} = require("./iss");

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
fetchMyIP((err, ip) => {
  if (err) {
    console.log("Got an error:", err);
    return;
  }
  console.log("The IP is: ", ip);
  fetchCoordsByIP(ip, (error, coords) => {
    console.log("error: " + error, coords);
    if (error) {
      console.log("FetchCoordsByIp didn't work!", error);
      return;
    }

    console.log("It worked! Returned Coords:", coords);
    // const coord = { latitude: "48.4371", longitude: "-123.3597" };

    fetchISSFlyOverTimes(coords, (error, passTimes) => {
      if (error) {
        console.log("fetchISSFlyOverTimes didn't work!", error);
        return;
      }

      console.log("It worked! Returned flyover times:", passTimes);
      nextISSTimesForMyLocation((error, passTimes) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        // success, print out the deets!
        printPassTimes(passTimes);
      });
    });
  });
});
