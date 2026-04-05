import { useQueryClient, keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';
import api from '../../../lib/axios';
import type { AdminUser, GetUsersParams, UsersListResponse } from '../types/index';
import toast from 'react-hot-toast';

export const getUsers = async ({ search = '', page = 1, limit = 10 }: GetUsersParams = {}) => {
  const response = await api.get('/admin/user', {
    params: {
      search: search || '',
      page: page || 1,
      limit: limit || 10,
    },
  });
  return response.data as Promise<UsersListResponse>;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/admin/user/${id}`);
  return res.data;
};

export const useUsersList = (params: GetUsersParams = {}) => {
  const { search = '', page = 1, limit = 10 } = params;

  return useQuery({
    queryKey: ['admin-users', search, page, limit],
    queryFn: () => getUsers({ search, page, limit }),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};
