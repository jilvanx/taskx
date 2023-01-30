import { create } from 'zustand';

import { type ITask, type ITaskStore } from '@models/task';

export const useTask = create<ITaskStore>((set) => ({
  task: null,

  setTask: (task: ITask) => {
    set(() => ({ task }));
  },

  removeTask: () => {
    set(() => ({ task: null }));
  }
}));
