import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

import { toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import ExerciseService from "../service/ExerciseService";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "15px",
    display: "flex",
    margin: theme.spacing(1),
  },
  formControl: {
    //margin: theme.spacing(1),
    marginTop: "15px",
    //minWidth: 500,
  },
  datepick: {
    marginTop: "15px",
    marginLeft: "5px",
  },
}));

export default function CreateExercise() {
  // this.state = {
  //   username: "",
  //   description: "",
  //   duration: 0,
  //   date: new Date(),
  //   users: [],
  // };

  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: "",
    date: new Date(),
  });

  const [user, setUser] = useState([""]);

  const classes = useStyles();

  // componentDidMount() {
  //   // axios
  //   //   .get("https://exercise-log-nodejs-mongodb.herokuapp.com/users")
  //   ExerciseService.getAllUser().then((res) => {
  //     if (res.data.length > 0) {
  //       this.setState({
  //         users: res.data.map((user) => user.username),
  //         username: res.data[0].username,
  //       });
  //     }
  //   });
  // }

  useEffect(() => {
    ExerciseService.getAllUser().then((res) => {
      if (res.data.length > 0) {
        let users = res.data.map((user) => user.username);
        let username = res.data[0].username;
        // this.setState({
        //   users: res.data.map((user) => user.username),
        //   username: res.data[0].username,
        // });
        console.log(users);

        setUser(users);
        setExercise({ ...exercise, username });
      }
    });
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

    ExerciseService.createExercise(exercise)
      .then((res) => console.log(res.data))
      .then(() =>
        toast.success("Create Exercise Success", {
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
        <h3>Create New Exercise Log</h3>
        <form onSubmit={onSubmit}>
          <FormControl
            className={classes.formControl}
            variant="outlined"
            fullWidth
          >
            <InputLabel>Username</InputLabel>
            <Select
              required
              value={exercise.username}
              onChange={onChangeUsername}
              label="Username"
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

          <FormControl fullWidth className={classes.formControl}>
            <TextField
              className={classes.formControl}
              label="Description"
              variant="outlined"
              required
              value={exercise.description}
              onChange={onChangeDescription}
            />
          </FormControl>

          {/* <div className="form-group">
            <label>Duration (in minute): </label>
            <input
              type="text"
              className="form-control"
              value={exercise.duration}
              onChange={onChangeDuration}
            />
          </div> */}
          <FormControl fullWidth className={classes.formControl}>
            <TextField
              className={classes.formControl}
              label="Duration (min)"
              variant="outlined"
              required
              value={exercise.duration}
              onChange={onChangeDuration}
              type="number"
            />
          </FormControl>

          <KeyboardDatePicker
            className={classes.datepick}
            label="Date"
            margin="normal"
            format="MM/dd/yyyy"
            value={exercise.date}
            onChange={onChangeDate}
          />

          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            size="medium"
            className={classes.button}
            startIcon={<CreateIcon />}
          >
            Update
          </Button>
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
}
