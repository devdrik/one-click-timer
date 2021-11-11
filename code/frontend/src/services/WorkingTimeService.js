import axios from "axios";
const API_URL = "http://nuc01:8085/";
const WORKING_TIME_URL = API_URL + "getall";
const WORKING_TIME_UPDATE_URL = API_URL + "workingtime";
const WORKING_TIME_TOGGLE_URL = API_URL + "toggle";
const WORKING_TIME_GET_STATE_URL = API_URL + "state";

export const getAllWorkingTimes = () => {
  return axios.get(WORKING_TIME_URL);
};

export const updateWorkingTime = (workingTime) => {
  return axios.put(`${WORKING_TIME_UPDATE_URL}/${workingTime.id}`, workingTime);
};

export const toggleWorkingTime = () => {
  return axios.get(WORKING_TIME_TOGGLE_URL);
}

export const getWorkingState = () => {
  return axios.get(WORKING_TIME_GET_STATE_URL);
}
