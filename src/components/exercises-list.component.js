import React, { Component } from "react";

import ExerciseService from "../service/ExerciseService";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <button
        className="btn btn-primary"
        onClick={() => (window.location = `/edit/${props.exercise._id}`)}
      >
        Edit
      </button>{" "}
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    // axios
    //   .get("https://exercise-log-nodejs-mongodb.herokuapp.com/exercises")
    ExerciseService.getAllExercise()
      .then((res) => {
        this.setState({ exercises: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    // axios
    //   .delete(
    //     "https://exercise-log-nodejs-mongodb.herokuapp.com/exercises/" + id
    //   )
    ExerciseService.deleteExercise(id).then((res) => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exercisesList() {
    return this.state.exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration(min)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </div>
    );
  }
}
