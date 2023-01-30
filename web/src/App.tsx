import { CaretDown } from 'phosphor-react';

import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Task } from '@components/Task';
import { ErrorMessage } from '@components/ErrorMessage';
import { Loading } from '@components/Loading';

import { useGetTasks } from '@resources/task';

import { useTask } from '@store/useTask';

import '@/styles/global.css';
export function App(): JSX.Element {
  const { data: tasks, isFetching, isLoading, error } = useGetTasks();

  const task = useTask((state) => state.task);

  if (isFetching || isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-5xl p-6 flex flex-col">
        <Header />
        <div className="flex mb-1 border border-border-input bg-white flex items-center px-4">
          <CaretDown className="text-gray-300" size={24} />
          <Input placeholder="What needs to be done?" dataSelected={task} />
        </div>

        {tasks?.map((task) => (
          <Task key={task.id} data={task} />
        ))}

        {Boolean(error) && error instanceof Error ? (
          <ErrorMessage message={error.message} />
        ) : null}
      </div>
    </div>
  );
}
