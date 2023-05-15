export interface Todo {
  _id: string;
  task: string;
  completed: boolean;
  createdDate: Date;
  updatedDate: Date;
}

export interface TodoData {
  task: string;
  completed: boolean;
}

export interface TodoInitial {
  task: string;
}
