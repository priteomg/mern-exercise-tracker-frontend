import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import ExerciseService from "../service/ExerciseService";

import { toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UpdateIcon from "@material-ui/icons/Update";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
}));

export default function EditExercises(props) {
  const classes = useStyles();

  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: null,
  });

  const [user, setUser] = useState([]);

  const getExerciseData = () => {
    ExerciseService.getOneExercise(props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setExercise({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsersData = () => {
    ExerciseService.getAllUser().then((res) => {
      if (res.data.length > 0) {
        let users = res.data.map((user) => user.username);
        setUser(users);
      }
    });
  };

  useEffect(() => {
    getExerciseData();
    getUsersData();
  }, []);

  const onChangeUsername = (e) => {
    setExercise({ ...exercise, username: e.target.value });
  };

  const onChangeDescription = (e) => {
    setExercise({ ...exercise, description: e.target.value });
  };

  const onChangeDuration = (e) => {
    setExercise({ ...exercise, duration: e.target.value });
  };

  const onChangeDate = (date) => {
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(exercise);

    ExerciseService.updateExercise(props.match.params.id, exercise)
      .then((res) => console.log(res.data))
      .then(() =>
        toast.success("Update Exercise Success!", {
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
    //.then(() => (window.location = "/"));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        <h3>Update New Exercise Log</h3>
        <form onSubmit={onSubmit}>
          <FormControl className={classes.formControl}>
            <InputLabel>Username</InputLabel>
            <Select
              required
              value={exercise.username}
              onChange={onChangeUsername}
            >
              {user.map((user) => {
                return (
                  <MenuItem value={user} key={user}>
                    {user}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={exercise.description}
              onChange={onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minute): </label>
            <input
              type="text"
              className="form-control"
              value={exercise.duration}
              onChange={onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <KeyboardDatePicker
                margin="none"
                format="MM/dd/yyyy"
                value={exercise.date}
                onChange={onChangeDate}
              />
            </div>
          </div>
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            startIcon={<UpdateIcon />}
          >
            Update
          </Button>
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
}
