import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercises from "./components/edit-exercise.component";
import CreateExercises from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercises} />
          <Route path="/create" component={CreateExercises} />
          <Route path="/user" component={CreateUser} />
        </div>
        <ToastContainer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
