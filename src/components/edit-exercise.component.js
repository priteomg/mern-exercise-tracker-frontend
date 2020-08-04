import React, { useEffect, useState, useRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExerciseService from "../service/ExerciseService";

export default function EditExercises(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [user, setUser] = useState([]);

  const userInput = useRef(null);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(exercise);

    ExerciseService.updateExercise(props.match.params.id, exercise)
      .then((res) => console.log(res.data))
      .then(() => (window.location = "/"));
  };

  return (
    <div>
      <h3>Update New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            value={exercise.username}
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
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
