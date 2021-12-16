import axios from "axios";
import { API_URL } from '../config/config'
const WORKING_TIME_URL = API_URL + "getall";
const WORKING_TIME_AT_DATE_URL = API_URL + "getallatdate";
const WORKING_TIME_UPDATE_URL = API_URL + "workingtime";
const WORKING_TIME_TOGGLE_URL = API_URL + "toggle";
const WORKING_TIME_GET_STATE_URL = API_URL + "state";
const WORKING_TIME_GET_DURATION_URL = API_URL + "getduration";

export const getAllWorkingTimes = () => {
  return axios.get(WORKING_TIME_URL);
};

export const getAllWorkingTimesByDate = date => {
  return axios.get(`${WORKING_TIME_AT_DATE_URL}?date=${date.toISOString()}`);
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

export const getDuration = (date) => {
  return axios.get(`${WORKING_TIME_GET_DURATION_URL}?date=${date.toISOString()}`);
}
