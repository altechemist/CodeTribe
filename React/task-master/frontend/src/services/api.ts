import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const createUser = (name: string, email: string, password: string, tasks: string) => {
    return api.post('/user', { name, email, password, tasks });
};

export const createTask = (title: string, date: string, time: string, priority: string, status: string, uid: number) => {
    return api.post('/task', { title, date, time, priority, status, uid });
};

export const updateTask = (title: string, date: string, time: string, priority: string, status: string) => {
    return api.put('/task', { title, date, time, priority, status });
};

export const deleteTask = (title: string) => {
    return api.delete('/task', { data: { title } });
};

export const getAllTasks = (uid: number) => {
    return api.get(`/tasks/${uid}`);
};
