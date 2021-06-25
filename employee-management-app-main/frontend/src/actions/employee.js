import {
  CREATE_EMPLOYEE,
  RETRIEVE_EMPLOYEES,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  DELETE_ALL_EMPLOYEES,
} from "./types";

import EmployeeService from "../services/employee.service";

export const createEmployee = (name, role, department) => async (dispatch) => {
  try {
    const res = await EmployeeService.create({ name, role, department });

    dispatch({
      type: CREATE_EMPLOYEE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveEmployees = () => async (dispatch) => {
  try {
    const res = await EmployeeService.getAll();

    dispatch({
      type: RETRIEVE_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateEmployee = (id, data) => async (dispatch) => {
  try {
    const res = await EmployeeService.update(id, data);

    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await EmployeeService.remove(id);

    dispatch({
      type: DELETE_EMPLOYEE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllEmployees = () => async (dispatch) => {
  try {
    const res = await EmployeeService.removeAll();

    dispatch({
      type: DELETE_ALL_EMPLOYEES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findEmployeesByName = (name) => async (dispatch) => {
  try {
    const res = await EmployeeService.findByName(name);

    dispatch({
      type: RETRIEVE_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};