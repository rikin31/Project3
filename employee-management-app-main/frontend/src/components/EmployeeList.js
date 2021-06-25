import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveEmployees,
  findEmployeesByName,
  deleteAllEmployees,
} from "../actions/employee";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const employees = useSelector(state => {
    console.log(state);
    return state.employees;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveEmployees());
  }, []);

  const onChangeSearchName = e => {
    const searchTitle = e.target.value;
    setSearchName(searchTitle);
  };

  const refreshData = () => {
    setCurrentEmployee(null);
    setCurrentIndex(-1);
  };

  const setActiveEmployee = (employee, index) => {
    setCurrentEmployee(employee);
    setCurrentIndex(index);
  };

  const removeAllEmployees = () => {
    dispatch(deleteAllEmployees())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    refreshData();
    dispatch(findEmployeesByName(searchName));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Employees List</h4>

        <ul className="list-group">
          {console.log(employees)}
          {employees &&
            employees.map((employee, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEmployee(employee, index)}
                key={index}
              >
                {employee.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllEmployees}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentEmployee ? (
          <div>
            <h4>Employee</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentEmployee.name}
            </div>
            <div>
              <label>
                <strong>Role:</strong>
              </label>{" "}
              {currentEmployee.role}
            </div>
            <div>
              <label>
                <strong>Department:</strong>
              </label>{" "}
              {currentEmployee.department}
            </div>

            <Link
              to={"/employee/" + currentEmployee.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;