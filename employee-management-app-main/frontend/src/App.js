import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import NavBar from "./components/Navbar";

import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import Employee from "./components/Employee";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <div>

        <NavBar />

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path="/employee" component={EmployeeList} />
            <Route exact path="/add" component={AddEmployee} />
            <Route path="/employee/:id" component={Employee} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
