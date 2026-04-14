import { useQueryClient, keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';
import api from '../../../lib/axios';
import type { AdminUser, GetUsersParams, UsersListResponse, PaginationType } from '../types/index';

export const getUsers = async ({ search = '', page = 1, limit = 10 }: GetUsersParams = {}): Promise<
  PaginationType<AdminUser>
> => {
  const response = await api.get('/admin/user', {
    params: {
      search: search || '',
      page: page || 1,
      limit: limit || 10,
    },
  });
  return response.data;
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
