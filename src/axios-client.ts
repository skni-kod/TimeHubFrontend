import axios from 'axios';

const TimeHubClient = axios.create({
    baseURL: "https://projekt-timehub.herokuapp.com/api/",
    timeout: 1000,
    headers: {
      //"Content-Type": "application/json",
  
    },
  });

  export default TimeHubClient