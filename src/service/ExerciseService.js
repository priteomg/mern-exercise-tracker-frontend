import http from "../http.common";

const getAllExercise = () => {
  return http.get("/exercises");
};

const deleteExercise = (id) => {
  return http.delete(`/exercises/${id}`);
};

const getOneExercise = (id) => {
  return http.get(`/exercises/${id}`);
};

const getAllUser = () => {
  return http.get(`/users`);
};

const updateExercise = (id, data) => {
  return http.post(`/exercises/update/${id}`, data);
};

const addNewUser = (data) => {
  return http.post("/users/add", data);
};

const createExercise = (data) => {
  return http.post("/exercises/add", data);
};

export default {
  getAllExercise,
  deleteExercise,
  getOneExercise,
  getAllUser,
  updateExercise,
  addNewUser,
  createExercise,
};
