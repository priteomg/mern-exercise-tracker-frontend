import React, { useEffect, useState } from "react";

import ExerciseService from "../service/ExerciseService";

import { toast, Flip } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#ce2929d4",
    color: "white",
  },
});

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Button
        onClick={() => (window.location = `/edit/${props.exercise._id}`)}
        variant="contained"
        color="primary"
        size="medium"
        startIcon={<EditIcon />}
      >
        Edit
      </Button>{" "}
      <Button
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
        variant="contained"
        className={props.classes}
        size="medium"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      {/* <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </button> */}
    </td>
  </tr>
);

export default function ExercisesList(props) {
  const classes = useStyles();
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
    ExerciseService.deleteExercise(id)
      .then((res) => console.log(res.data))
      .then(() =>
        toast.success("Delete Exercise Success!", {
          position: "bottom-center",
          transition: Flip,
        })
      )
      .catch((err) =>
        toast.error(err.message, {
          position: "bottom-center",
          transition: Flip,
        })
      );

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
          classes={classes.button}
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
