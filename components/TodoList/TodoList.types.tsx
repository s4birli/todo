import { Task } from "../../lib/types/Task";

export interface TodoListProps {
  todos: Task[];
  onChangeTodo: (task: Task) => void;
  onDeleteTodo: (task: Task) => void;
  onSetAlarm: (task: Task) => void;
}
