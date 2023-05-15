export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface Task {
  _id: string;
  description: string;
  completed: boolean;
  createdDate: Date;
  updatedDate: Date;
  notify?: {
    email: string;
    notifyDate: Date;
  };
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export enum ActionTypes {
  ADD_TASK = "ADD_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  DELETE_TASK = "DELETE_TASK",
  FETCH_TASK = "FETCH_TASK",
  FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE",
}

export interface FetchTaskAction {
  type: ActionTypes.FETCH_TASK;
  payload: Task[];
}

export interface AddTaskAction {
  type: ActionTypes.ADD_TASK;
  payload: {
    _id: string;
    description: string;
  };
}

export interface DeleteTaskAction {
  type: ActionTypes.DELETE_TASK;
  payload: {
    _id: string;
  };
}

export interface UpdateTaskAction {
  type: ActionTypes.UPDATE_TASK;
  payload: Task;
}

export type TaskAction =
  | AddTaskAction
  | UpdateTaskAction
  | DeleteTaskAction
  | FetchTaskAction;
