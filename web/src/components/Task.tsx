import { useCallback } from 'react';
import { CheckCircle, Circle, Trash } from 'phosphor-react';

import { ErrorMessage } from '@components/ErrorMessage';

import { useUpdateTask, useDeleteTask } from '@resources/task';

import { type ITask } from '@models/task';
import { useTask } from '@store/useTask';

interface TaskProps {
  data: ITask;
}

export function Task({ data }: TaskProps): JSX.Element {
  const { mutate, error } = useUpdateTask();
  const { mutate: mutateDelete, error: errorDelete } = useDeleteTask();

  const setTask = useTask((state) => state.setTask);

  const handleChangeStatus = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, task: ITask) => {
      e.preventDefault();
      mutate({ id: task.id, title: task.title, status: !task.completed });
    },
    [mutate]
  );

  const handleDelete = useCallback(
    (id: string) => {
      mutateDelete({ id });
    },
    [mutateDelete]
  );

  const handleOnClick = useCallback(() => {
    setTask(data);
  }, [data, setTask]);

  return (
    <>
      <div className="border border-border-input bg-white flex items-center px-4">
        <button
          className="cursor-pointer"
          onClick={(e) => {
            handleChangeStatus(e, data);
          }}
        >
          {data.completed ? (
            <CheckCircle
              className="text-green-500 hover:text-green-300"
              size={24}
            />
          ) : (
            <Circle className="text-gray-300 hover:text-gray-600" size={24} />
          )}
        </button>
        <div
          className="flex-1 px-2 py-4 cursor-pointer"
          onClick={handleOnClick}
        >
          <span
            className={`hover:text-gray-600 italic font-thin ${
              data.completed ? 'line-through' : ''
            }`}
          >
            {data.title}
          </span>
        </div>
        <button
          className="cursor-pointer"
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          <Trash className="text-red-500 hover:text-red-300" size={24} />
        </button>
      </div>

      {Boolean(error) && error instanceof Error ? (
        <ErrorMessage message={error.message} />
      ) : null}
      {Boolean(errorDelete) && errorDelete instanceof Error ? (
        <ErrorMessage message={errorDelete.message} />
      ) : null}
    </>
  );
}
