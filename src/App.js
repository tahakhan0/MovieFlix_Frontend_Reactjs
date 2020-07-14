import React, { Component, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import ProtectedRoute from "./components/common/ProtectedRoute";
import { CurrentUser } from "./services/users";
import Logout from "./components/utils/Logout";

export class App extends Component {
  state = {};

  async componentDidMount() {
    try {
      const { data: user } = await CurrentUser();
      this.setState({ user });
    } catch (ex) {
      return null;
    }
  }
  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <div className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={NewMovies} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
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
}

export default App;
