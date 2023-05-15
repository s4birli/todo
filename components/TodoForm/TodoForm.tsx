import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../lib/redux/store";
import { Task } from "../../lib/types/Task";
import {
  addTask,
  deleteTask,
  fetchTask,
  updateTask,
} from "../../lib/redux/actions";
import TodoAdd from "../TodoAdd";
import TodoList from "../TodoList";

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [uncompletedTasks, setUncompletedTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await axios.get<Task[]>("/api/todos");
        dispatch(fetchTask(response.data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTaskList();
  }, [dispatch]);

  useEffect(() => {
    setList(tasks);
  }, [tasks]);

  const setList = (tasks: Task[]) => {
    const completed = tasks
      .filter((task: Task) => task.completed)
      .sort((a: Task, b: Task) => {
        const dateA = new Date(a.updatedDate);
        const dateB = new Date(b.updatedDate);

        const timeA = dateA instanceof Date ? dateA.getTime() : 0;
        const timeB = dateB instanceof Date ? dateB.getTime() : 0;

        return timeB - timeA;
      });

    const uncompleted = tasks
      .filter((task: Task) => !task.completed)
      .sort((a: Task, b: Task) => {
        const dateA = new Date(a.updatedDate);
        const dateB = new Date(b.updatedDate);

        const timeA = dateA instanceof Date ? dateA.getTime() : 0;
        const timeB = dateB instanceof Date ? dateB.getTime() : 0;

        return timeB - timeA;
      });

    setCompletedTasks(completed);
    setUncompletedTasks(uncompleted);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAddTask = async (task: string) => {
    try {
      if (task.trim() !== "") {
        const response = await axios.post<Task>("/api/todos", { task });

        if (response.status === 200) {
          const newTask = response.data;
          dispatch(addTask(newTask._id, newTask.description));
        } else {
          console.error("Error adding task:", response.status);
        }
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleCompleted = async (task: Task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
      updatedDate: new Date(),
    };

    try {
      const response = await axios.put<Task>("/api/todos", updatedTask);

      if (response.status === 200) {
        dispatch(updateTask(response.data));
      } else {
        console.error("Error updating task:", response.status);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAlarm = async (task: Task) => {};

  const handleDeleteTask = async (task: Task) => {
    try {
      const response = await axios.delete(`/api/todos?id=${task._id}`);

      if (response.status === 200) {
        dispatch(deleteTask(task._id));
      } else {
        console.error("Error deleting task:", response.status);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <TodoAdd onAddTask={handleAddTask} />
      <h1 className="text-2xl font-bold mb-1 text-center">Tasks</h1>
      <TodoList
        todos={uncompletedTasks}
        onChangeTodo={handleToggleCompleted}
        onDeleteTodo={handleDeleteTask}
        onSetAlarm={handleAlarm}
      />
      <h2 className="font-bold mb-1 pt-3 text-center">Completed</h2>
      <TodoList
        todos={completedTasks}
        onChangeTodo={handleToggleCompleted}
        onDeleteTodo={handleDeleteTask}
        onSetAlarm={handleAlarm}
      />
    </div>
  );
};

export default TodoForm;
