import React, { Fragment } from "react";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/utils/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import LoginForm from "./components/utils/LoginForm";
import RegisterForm from "./components/utils/RegisterForm";
import NewMovies from "./components/utils/NewMovies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/movies/:id" component={NewMovies} />
          <Route path="/movies" component={Movies} />
          <Route path="/login" component={LoginForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
