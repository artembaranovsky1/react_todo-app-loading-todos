import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3983;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (title: string) => {
  return client.post<Todo>(`/todos`, {
    userId: USER_ID,
    title,
    completed: false,
  });
};

// console.log(getTodos());

// Add more methods here
