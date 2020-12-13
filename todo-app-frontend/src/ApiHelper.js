import axios from "axios";

const API_URL="http://localhost:8080/todos/"
const CREATE_TODO = "http://localhost:8080/addTodo"

async function createTodo(name) {
    const { data: newTodo } = await axios.post(CREATE_TODO, {
        name
    });
    return newTodo;
}

async function deleteTodo(id) {
    return await axios.delete(`${API_URL}${id}`);
}

async function updateTodo(id, payload) {
    const {data:newTodo} = await axios.put(`${API_URL}${id}`, payload);
    return newTodo;
}

async function getAllTodos() {
    const { data: todos } = await axios.get(API_URL);
    return todos;
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos };