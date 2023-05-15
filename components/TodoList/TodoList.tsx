import React, { FC } from "react";
import { TodoListProps } from "./TodoList.types";
import { FaTrashAlt, FaBell } from "react-icons/fa";

const TodoList: FC<TodoListProps> = ({ todos, onChangeTodo, onDeleteTodo }) => {
  return (
    <div className="container mx-auto flex justify-center">
      <ul className="max-w-md w-full">
        {todos.map((todo) => (
          <li
            key={todo._id?.toString()}
            className="bg-gray-100 mb-2 p-2 rounded text-left"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                <input
                  id={todo._id?.toString()}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onChangeTodo?.(todo)}
                  className="mr-2"
                />
                <span>{todo.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-300 text-white text-xs items-center rounded p-2 mr-2">
                  <FaBell size={15} />
                </button>
                <button
                  className="bg-red-300 text-white text-xs items-center rounded p-2"
                  onClick={() => onDeleteTodo?.(todo)}
                >
                  <FaTrashAlt size={15} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
