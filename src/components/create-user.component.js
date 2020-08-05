import React, { useState } from "react";

import ExerciseService from "../service/ExerciseService";

import { toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function CreateUser(props) {
  // this.state = {
  //   username: "",
  // };

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
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
