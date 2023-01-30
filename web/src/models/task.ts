export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITaskStore {
  task: ITask | null;
  setTask: (task: ITask) => void;
  removeTask: () => void;
}
