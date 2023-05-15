import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, initialState } from "../types/Task";
import axios from "axios";

export const fetchSliceTasks = createAsyncThunk(
  "todos/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>("/api/todos");
    return response.data;
  }
);

export const addSliceTask = createAsyncThunk(
  "todos/addTask",
  async (description: string) => {
    const newTask: Task = {
      _id: "new ObjectId()",
      description,
      completed: false,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    await axios.post("/api/todos", newTask);
    return newTask;
  }
);

export const deleteSliceTask = createAsyncThunk(
  "todos/deleteTask",
  async (taskId: string) => {
    await axios.delete(`/api/todos/${taskId}`);
    return taskId;
  }
);

export const updateSliceTask = createAsyncThunk(
  "todos/updateTask",
  async (task: Task) => {
    await axios.put(`/api/todos/${task._id}`, task);
    return task;
  }
);

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliceTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliceTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchSliceTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addSliceTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteSliceTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(updateSliceTask.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task._id === _id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
