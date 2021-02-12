const { fetchMyIp } = require('./iss');

fetchMyIp((error, ip) => {
  if (error) {
    console.log(error);
    return;
  } else {
    console.log('It Worked! returned IP:' , ip);
  }
});