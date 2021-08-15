import axios from "axios";

function getTodos() {
  return axios.get("api/todos");
}

function addTodo(title) {
  return axios.post("api/todos", { title });
}

function deleteTodo(id) {
  return axios.delete("api/todos/" + id);
}

function changeTodoState(id) {
  return axios.put("api/todos/" + id);
}

export default {
  getTodos, addTodo, deleteTodo, changeTodoState
}
