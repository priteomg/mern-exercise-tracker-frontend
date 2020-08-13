import React, { useEffect, useState } from "react";

import ExerciseService from "../service/ExerciseService";

import { toast, Flip } from "react-toastify";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#ce2929d4",
    color: "white",
  },
  table: {
    minWidth: 650,
  },
  tbCell: {
    backgroundColor: "#007bff6e",
  },
  evenRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#007bff6e",
    },
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f8f9fa",
    },
    animationDuration: "1.5s",
  },
}))(TableRow);

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
        <StyledTableRow
          key={currentExercise._id}
          className="animate__animated animate__fadeInDown"
        >
          <TableCell component="th" scope="row">
            {currentExercise.username}
          </TableCell>
          <TableCell align="center">{currentExercise.description}</TableCell>
          <TableCell align="center">{currentExercise.duration}</TableCell>
          <TableCell align="center">
            {currentExercise.date.substring(0, 10)}
          </TableCell>
          <TableCell align="center">
            <Button
              onClick={() => (window.location = `/edit/${currentExercise._id}`)}
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>{" "}
            <Button
              onClick={() => {
                deleteExercise(currentExercise._id);
              }}
              variant="contained"
              className={classes.button}
              size="medium"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </TableCell>
        </StyledTableRow>
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tbCell}>
                Username
              </TableCell>
              <TableCell align="center" className={classes.tbCell}>
                Description
              </TableCell>
              <TableCell align="center" className={classes.tbCell}>
                Duration (min)
              </TableCell>
              <TableCell align="center" className={classes.tbCell}>
                Date
              </TableCell>
              <TableCell align="center" className={classes.tbCell}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{exercisesList()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
