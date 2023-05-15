// import { ObjectId } from "mongodb";
import { ActionTypes, Task, TaskAction } from "../types/Task";

export const addTask = (_id: string, description: string): TaskAction => ({
  type: ActionTypes.ADD_TASK,
  payload: { _id, description },
});

export const deleteTask = (_id: string): TaskAction => ({
  type: ActionTypes.DELETE_TASK,
  payload: { _id },
});

export const updateTask = (task: Task): TaskAction => ({
  type: ActionTypes.UPDATE_TASK,
  payload: task,
});

export const fetchTask = (tasks: Task[]): TaskAction => ({
  type: ActionTypes.FETCH_TASK,
  payload: tasks,
});
