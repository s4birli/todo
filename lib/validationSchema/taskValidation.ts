import * as Yup from "yup";
import { TodoInitial } from "../types/Todo";

export const TASK_INITIAL_VALUES: TodoInitial = {
  task: "",
};

export const TASK_VALIDATION_SCHEMA = Yup.object().shape({
  task: Yup.string().required(),
});
