import axios from "axios";

const API_URL =
  "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data) {
      localStorage.setItem("universitiesResponse", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    let listOfUniversities = null;

    const storedData = localStorage.getItem("universitiesResponse");
    if (storedData) {
      try {
        listOfUniversities = JSON.parse(storedData);
      } catch (parseError) {
        console.error("Error parsing local storage data:", parseError);
      }
    }

    if (listOfUniversities) {
      return listOfUniversities;
    } else {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
      // Optionally, you can throw the error to be handled further up the call stack
      throw error;
    }
  }
};
