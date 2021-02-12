const { fetchMyIp } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

fetchMyIp((error, ip) => {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log('It Worked! returned IP:' , ip);
    return ip;
  }
});

fetchCoordsByIp('174.0.247.128', (error, coordinates) =>{
  if (error) {
    return console.log('could not get coordinates', error);
  } else {
    console.log('it worked! Returned coordinates:', coordinates);
  }
});

fetchISSFlyOverTimes({ latitude: 51.1391, longitude: -114.2002}, (error, times) =>{
  if (error) {
    return console.log('could not get fly over data', error);
  } else {
    console.log('it worked! Returned flyover time:', times);
  }
});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('could not get fly over data', error);
  } else {
    console.log('it worked! Returned flyover time:', passTimes);
  }
});


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});