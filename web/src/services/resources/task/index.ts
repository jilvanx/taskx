import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryResult
} from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

import { api } from '@services/api';

import { type ITask } from '@models/task';

async function fetchTasks(): Promise<ITask[]> {
  const { data } = await api.get('/tasks');
  return data;
}

function useGetTasks(): UseQueryResult<ITask[], unknown> {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });
}

async function updateTask(
  id: string,
  title: string,
  status: boolean
): Promise<AxiosResponse<any, any>> {
  return await api({
    method: 'patch',
    url: `/tasks/${id}`,
    data: { title, completed: status }
  });
}

const useUpdateTask = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  {
    id: string;
    title: string;
    status: boolean;
  },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      status
    }: {
      id: string;
      title: string;
      status: boolean;
    }) => await updateTask(id, title, status),
    onSuccess: () => {
      void queryClient.refetchQueries(['tasks']);
    }
  });
};

async function createTask(title: string): Promise<AxiosResponse<any, any>> {
  return await api({
    method: 'post',
    url: '/tasks',
    data: { title }
  });
}

const useCreateTask = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  {
    title: string;
  },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title }: { title: string }) => await createTask(title),
    onSuccess: () => {
      void queryClient.refetchQueries(['tasks']);
    }
  });
};

async function deleteTask(id: string): Promise<AxiosResponse<any, any>> {
  return await api({
    method: 'delete',
    url: `/tasks/${id}`
  });
}

const useDeleteTask = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  {
    id: string;
  },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => await deleteTask(id),
    onSuccess: () => {
      void queryClient.refetchQueries(['tasks']);
    }
  });
};

export { useGetTasks, useUpdateTask, useCreateTask, useDeleteTask };
