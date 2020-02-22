import axios from "axios";

require("dotenv").config();

const axiosWithAuth = {
  endpoint: process.env.REACT_APP_API_URL || "http://localhost:2525",

  axiosHeaders: function() {
    // console.log(this.endpoint, localStorage.getItem("key"));
    // get token from localstorage
    // let token = localStorage.getItem("token");
    return axios.create({
      baseURL: this.endpoint,
    //   headers: {
    //     Authorization: "Token " + token || null
    //   }
    });
  }
};

export default axiosWithAuth;