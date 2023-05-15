import { FC } from "react";
import type { TodoAddProps } from "./TodoAdd.types";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  TASK_INITIAL_VALUES,
  TASK_VALIDATION_SCHEMA,
} from "../../lib/validationSchema/taskValidation";
import { TodoInitial } from "../../lib/types/Todo";

const TodoAdd: FC<TodoAddProps> = ({ onAddTask }) => {
  const handleFormSubmit = async (
    values: TodoInitial,
    actions: FormikHelpers<TodoInitial>
  ) => {
    try {
      if (values.task.trim() !== "") {
        onAddTask(values.task);
        actions.resetForm();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container mx-auto flex mb-4 justify-center">
      <Formik
        initialValues={TASK_INITIAL_VALUES}
        validationSchema={TASK_VALIDATION_SCHEMA}
        onSubmit={handleFormSubmit}
      >
        {() => (
          <Form className="max-w-md w-full flex justify-center">
            <Field
              id="task"
              type="text"
              name="task"
              className="mr-2 p-2 border border-gray-300 rounded w-3/4"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded w-1/4"
            >
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoAdd;
