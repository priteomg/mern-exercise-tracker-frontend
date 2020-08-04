import React, { useEffect, useState } from "react";

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

export default function ExercisesList(props) {
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    ExerciseService.getAllExercise()
      .then((res) => {
        setExercise(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    ExerciseService.deleteExercise(id).then((res) => console.log(res.data));

    const totalExercise = exercise.filter((el) => el._id !== id);
    setExercise(totalExercise);
  };

  const exercisesList = () => {
    return exercise.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

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
        <tbody>{exercisesList()}</tbody>
      </table>
    </div>
  );
}
