import axios from "axios";

export default axios.create({
  baseURL: "https://exercise-log-nodejs-mongodb.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
