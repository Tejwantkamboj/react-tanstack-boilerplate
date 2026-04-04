import { useState } from 'react';
import { useUsersList } from '../../api/user';

export const UserList = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const duhfbauekwy = useUsersList();
  const { data, isPending, isError, refetch } = useUsersList({
    search,
    page,
    limit,
  });

  return <>{!isPending && !isError && <div>User List</div>}</>;
};
