export type GetUsersParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type AdminUser = {
  id?: string;
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UsersListResponse = {
  results: AdminUser[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export type PaginationType<T> = {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};
