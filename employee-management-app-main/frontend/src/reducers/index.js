import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import employees from "./employee";

export default combineReducers({
  auth,
  message,
  employees
});
