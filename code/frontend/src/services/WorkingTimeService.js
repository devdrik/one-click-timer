import axios from "axios";
const API_URL = "http://nuc01:8085/";
const WORKING_TIME_URL = API_URL + "getall";

export const getAllWorkingTimes = () => {
  return axios.get(WORKING_TIME_URL);
};
