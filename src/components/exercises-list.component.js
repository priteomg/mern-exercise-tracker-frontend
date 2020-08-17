import React, { useEffect, useState } from "react";

import ExerciseService from "../service/ExerciseService";

import EditExercises from "./edit-exercise.component";

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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    ExerciseService.getAllExercise()
      .then((res) => {
        setExercise(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const DialogDel = () => {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure to delete this ? {}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const deleteExercise = (id) => {
    if (window.confirm("Are you sure")) {
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
    }
  };

  const exercisesList = () => {
    return exercise.map((currentExercise) => {
      return (
        <StyledTableRow
          key={currentExercise._id}
          className="animate__animated animate__fadeInDown"
        >
          <TableCell component="th" scope="row" align="center">
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
