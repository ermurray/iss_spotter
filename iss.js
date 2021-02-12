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

module.exports = { fetchMyIp };