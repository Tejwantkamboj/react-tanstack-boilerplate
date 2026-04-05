import { useState } from 'react';
import { useDeleteUser, useUsersList } from '../../api/user';
import { KeyTable, SearchBar, Button } from '../../../../components/Elements';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { AdminUser } from '../../types';

export const UserList = () => {
  const navigate = useNavigate();
  const { mutate, isPending: deleteLoading } = useDeleteUser();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dailogLoading, setDailogLoading] = useState(false);

  const { data, isPending, isError, refetch } = useUsersList({
    search,
    page,
    limit,
  });

  const keys = [
    {
      label: 'First Name',
      value: 'firstName',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Date & Time Joining',
      value: 'createdAt',
    },
    {
      label: 'Status',
      value: 'isEmailVerified',
    },
  ];

  const editUser = (row: AdminUser) => {
    const id = row._id ? row._id : row.id;
    if (!id) return;
    navigate(`edit/${id}`);
  };

  const handleView = (row: AdminUser) => {
    const id = row._id ? row._id : row.id;
    if (!id) return;
    navigate(`/admin/view-user/${encodeURIComponent(`${id}`)}`);
  };

  const handleConfirmDelete = async (row: AdminUser) => {
    try {
      const id = row._id ? row._id : row.id;
      if (!id) return;
      mutate(`${id}`);
      toast.success('Deleted successfully.');
    } catch (error) {
      toast.error('Error deleting item.');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">User Management</h3>

        <Button name="Add User" onClick={() => navigate('/admin/add-user')} />
      </div>
      {!isPending && !isError && (
        <div>
          <SearchBar value={search} setValue={setSearch} setPage={setPage} />
          <KeyTable
            dailogeloading={dailogLoading}
            keys={keys}
            data={data.results}
            page={page}
            totalPages={data?.totalPages}
            totalCount={data?.totalResults}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            isEdit={true}
            isDelete={true}
            isView={true}
            view={handleView}
            edit={editUser}
            delete={handleConfirmDelete}
          />
        </div>
      )}
    </>
  );
};
