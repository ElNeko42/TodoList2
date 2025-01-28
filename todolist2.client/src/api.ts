import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:5082/api",
});

export const getTasks = () => api.get("/tasks");
export const getTask = (id: number) => api.get(`/tasks/${id}`);
export const createTask = (task: { title: string; description: string }) =>
    api.post("/tasks", task);
export const updateTask = (id: number, task: { title: string; description: string; isCompleted: boolean }) =>
    api.put(`/tasks/${id}`, task);
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);
