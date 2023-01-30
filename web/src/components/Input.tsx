import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type ChangeEvent,
  useEffect
} from 'react';

import { useCreateTask, useUpdateTask } from '@services/resources/task';
import { ErrorMessage } from '@components/ErrorMessage';
import { useTask } from '@store/useTask';
import { type ITask } from '@models/task';

interface InputProps {
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  dataSelected?: ITask | null;
}

export function Input({
  disabled = false,
  placeholder = '',
  value = '',
  dataSelected = null,
  ...props
}: InputProps): JSX.Element {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, error } = useCreateTask();
  const { mutate: mutateUpdate, error: errorUpdate } = useUpdateTask();

  const task = useTask((state) => state.task);
  const removeTask = useTask((state) => state.removeTask);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleOnKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        if (inputRef.current != null && inputRef.current.value.length > 0) {
          if (task != null) {
            mutateUpdate({
              id: task.id,
              title: inputRef.current.value,
              status: task.completed
            });

            removeTask();
          } else {
            mutate({
              title: inputRef.current.value
            });
          }
        }
      }
    },
    [mutate, mutateUpdate, removeTask, task]
  );

  useEffect(() => {
    task != null && setInputValue(task.title);
    inputRef.current?.focus();
  }, [task]);

  useEffect(() => {
    inputValue === '' && removeTask();
  }, [inputValue, removeTask]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="px-4 py-3 text-gray-800 bg-white focus:outline-none placeholder:italic placeholder:font-thin font-thin flex-1"
        disabled={disabled}
        placeholder={placeholder}
        value={
          inputValue.length > 0 || inputValue === '' ? inputValue : task?.title
        }
        onChange={(e) => {
          handleOnChange(e);
        }}
        onKeyDown={(e) => {
          handleOnKeyDown(e);
        }}
        {...props}
      />

      {Boolean(error) && error instanceof Error ? (
        <ErrorMessage message={error.message} />
      ) : null}
      {Boolean(errorUpdate) && errorUpdate instanceof Error ? (
        <ErrorMessage message={errorUpdate.message} />
      ) : null}
    </>
  );
}
