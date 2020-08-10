import React, { useState } from "react";

import ExerciseService from "../service/ExerciseService";

import { toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginTop: "15px",
  },
  formControl: {
    //margin: theme.spacing(1),
    marginTop: "15px",
    //minWidth: 500,
  },
}));

export default function CreateUser(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    // this.setState({
    //   username: e.target.value,
    // });
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
    };
    console.log(user);

    // axios
    //   .post("https://exercise-log-nodejs-mongodb.herokuapp.com/users/add", user)
    ExerciseService.addNewUser(user)
      .then((res) => console.log(res.data))
      .then(() =>
        toast.success("Create User Success", {
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

    // this.setState({
    //   username: "",
    // });
    setUsername("");
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        {/* <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div> */}
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            className={classes.formControl}
            label="Username"
            variant="outlined"
            required
            value={username}
            onChange={onChangeUsername}
          />
        </FormControl>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<CreateIcon />}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
