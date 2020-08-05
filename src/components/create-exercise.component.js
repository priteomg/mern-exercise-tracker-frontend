import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import ExerciseService from "../service/ExerciseService";

export default function CreateExercise(props) {
  // this.state = {
  //   username: "",
  //   description: "",
  //   duration: 0,
  //   date: new Date(),
  //   users: [],
  // };
  const userInput = useRef(null);

  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [user, setUser] = useState([]);

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
        console.log(username);
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
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            value={exercise.control}
            onChange={onChangeUsername}
          >
            {user.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
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
            <DatePicker selected={exercise.date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
