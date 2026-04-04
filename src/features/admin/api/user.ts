import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../../../lib/axios';
import type { AdminUser, GetUsersParams, UsersListResponse } from '../types/index';

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

export const useUsersList = (params: GetUsersParams = {}) => {
  const { search = '', page = 1, limit = 10 } = params;

  return useQuery({
    queryKey: ['admin-users', search, page, limit],
    queryFn: () => getUsers({ search, page, limit }),
    placeholderData: keepPreviousData,
  });
};
