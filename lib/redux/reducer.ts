import { ActionTypes, Task, TaskAction } from "../types/Task";

const initialState: Task[] = [];
let lastId = 0;

const reducer = (state = initialState, action: TaskAction): Task[] => {
  switch (action.type) {
    case ActionTypes.ADD_TASK: {
      const newTask: Task = {
        _id: action.payload._id,
        description: action.payload.description,
        completed: false,
        createdDate: new Date(),
        updatedDate: new Date(),
      };
      return [...state, newTask];
    }
    case ActionTypes.DELETE_TASK: {
      return state.filter((task) => task._id !== action.payload._id);
    }
    case ActionTypes.UPDATE_TASK: {
      return state.map((task) =>
        task._id === action.payload._id ? { ...task, ...action.payload } : task
      );
    }
    case ActionTypes.FETCH_TASK: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default reducer;
