import axios from "axios";
const API_URL = "http://nuc01:8085/";
const WORKING_TIME_URL = API_URL + "getall";
const WORKING_TIME_UPDATE_URL = API_URL + "workingtime";

export const getAllWorkingTimes = () => {
  return axios.get(WORKING_TIME_URL);
};

export const updateWorkingTime = (workingTime) => {
  console.log(`workingTime from Service`, workingTime)
  return axios.put(`${WORKING_TIME_UPDATE_URL}/${workingTime.id}`, workingTime);
};
