const request = require('request');

const fetchMyIp = function(callback) {
  const requestUrl = 'https://api.ipify.org?format=json';
  request(requestUrl, (error, response, body) =>{
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`${response.statusCode} when fetching IP. response: ${body}`), null);
    } else {
      return callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`${response.statusCode} when fetching coordinates response: ${body}`), null);
    } else {
      const { latitude, longitude } = JSON.parse(body);
      return callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`${response.statusCode} when fetching fly over times response: ${body}`), null);
    } else {
      const passes = JSON.parse(body).response;
      return callback(null, passes);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIp(ip, (error, loc) => {
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



// module.exports = {
//   fetchMyIp,
//   fetchCoordsByIp,
//   fetchISSFlyOverTimes
// };
module.exports = { nextISSTimesForMyLocation };