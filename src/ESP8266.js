import axios from 'axios'

const toggleLED = (ipAddress, state) => {
  let url = `http://${ipAddress}/`;
  if (state === 'on') {
    url += 'on';
  } else if (state === 'off') {
    url += 'off';
  }

  return axios.get(url)
    .then((res) => {
      // Request successful
      console.log(`LED turned ${state}`);
    })
    .catch((err) => {
      // Request failed
      console.log(`Failed to send request: ${err.message}`);
    });
};

export { toggleLED };