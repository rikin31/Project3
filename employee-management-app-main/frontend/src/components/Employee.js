import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEmployee, deleteEmployee } from "../actions/employee";
import EmployeeService from "../services/employee.service";

const Employee = (props) => {
  const roles = ["user", "moderator", "admin"];
  const departments = ["engineering", "design", "marketing"];
  const initialEmployeeState = {
    id: null,
    name: "",
    role: "",
    department: ""
  };
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getEmployee = id => {
    EmployeeService.get(id)
      .then(response => {
        console.log(response.data);
        setCurrentEmployee(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmployee(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const updateEmployeeData = () => {
    dispatch(updateEmployee(currentEmployee.id, currentEmployee))
      .then(response => {
        console.log(response);

        setMessage("The employee was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeEmployee = () => {
    dispatch(deleteEmployee(currentEmployee.id))
      .then(() => {
        props.history.push("/employee");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmployee ? (
        <div className="edit-form">
          <h4>Employee</h4>
          <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={currentEmployee.name}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            < select
              onChange={handleInputChange}
              id="role"
              className="form-control" 
              value={currentEmployee.role}>
              {
                roles.map((roleName, i) => 
                  <option value={roleName} key={i}>
                    {roleName}
                  </option>
                )
              }
            </select >

          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            < select
              onChange={handleInputChange}
              id="department"
              className="form-control" 
              value={currentEmployee.department}>
              {
                departments.map((departmentName, i) => 
                  <option value={departmentName} key={i}> 
                    {departmentName}
                  </option>
                )
              }
            </select >
          </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeEmployee}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateEmployeeData}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Employee...</p>
        </div>
      )}
    </div>
  );
};

export default Employee;  