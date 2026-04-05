import * as React from 'react';
import { FaArchive, FaTimes } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ConfirmationDialog from '../../PopUp/ConfirmationDialog';
import { useState } from 'react';

export type TableProps<Entry> = {
  data: Entry[];
  keys?: { label: string; value: string }[];
  rowsPerPage?: number;
  page?: number;
  setPage?: (val: number) => void;
  limit?: number;
  setLimit?: (val: number) => void;
  totalPages: number;
  totalCount?: number;
  hideRowsSelection?: boolean;
  hideRowsPerPage?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  isView?: boolean;
  edit?: (row: Entry) => void;
  delete?: (row: Entry) => void;
  view?: (row: Entry) => void;
  dailogeloading?: boolean;
};

export const KeyTable = <Entry extends Record<string, any> & { _id?: string; id?: string }>({
  data,
  keys,
  rowsPerPage = 10,
  page = 1,
  setPage,
  limit,
  setLimit,
  totalCount,
  totalPages,
  hideRowsSelection,
  hideRowsPerPage,
  isEdit = false,
  isDelete = false,
  isView = false,
  dailogeloading,
  edit: handleEdit,
  delete: handleDelete,
  view: handleView,
}: TableProps<Entry>) => {
  const limitValues = [5, 10, 15, 20];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [resolveFn, setResolveFn] = useState<(val: boolean) => void>();

  const getPaginationString = () => {
    const start = ((page ?? 1) - 1) * (limit ?? rowsPerPage) + 1;
    let end = start + (limit ?? rowsPerPage) - 1;
    if (end > (totalCount ?? 0)) {
      end = totalCount ?? 0;
    }
    return `Showing ${start} to ${end} of ${totalCount ?? 0} entries`;
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit?.(newLimit);
    setPage?.(1);
  };

  const handleChangePage = (event: any, value: number) => {
    const newPage = Math.max(1, Math.min(value, totalPages));
    setPage?.(newPage);
  };

  const handleConfirmDelete = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setIsDialogOpen(true);
      setResolveFn(() => resolve);
    });
  };

  const handleConfirm = async () => {
    setDialogLoading(true);
    resolveFn?.(true);
    setIsDialogOpen(false);
    setDialogLoading(false);
  };

  const handleCancel = () => {
    resolveFn?.(false);
    setIsDialogOpen(false);
  };

  const onDeleteClick = async (row: any) => {
    handleDelete?.(row);
    // const confirmed = await handleConfirmDelete();
    // if (confirmed) {
    //   handleDelete?.(row);
    // }
  };

  const onViewClick = async (row: any) => {
    handleView?.(row);
  };
  const edit = (row: any) => {
    handleEdit?.(row);
  };

  return (
    <div className="flex flex-col">
      {data && data.length > 0 ? (
        <div className="table-top table-wrapper">
          <div className="main-table w-100 inline-block min-w-full align-middle p-0">
            <div className="table-view">
              <table className="min-w-full divide-y divide-gray-200 w-100">
                <thead className="thead-light lightbg-col">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-center" style={{ color: '#232323' }}>
                      S.No
                    </th>
                    {keys &&
                      keys.map((item: any, index) => (
                        <th key={index} className="px-2 py-3 text-left" style={{ color: '#232323' }}>
                          {item.label}
                        </th>
                      ))}
                    {(isEdit || isDelete || isView) && <th className="px-3 py-2 text-left">Actions</th>}
                  </tr>
                </thead>
                <tbody className="common-table-body bg-white">
                  {keys &&
                    data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="text-center">{((page ?? 1) - 1) * (limit ?? rowsPerPage) + rowIndex + 1}</td>
                        {keys.map((key: any) => (
                          <td key={key.value} className="px-2 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {row[key.value] !== undefined &&
                            row[key.value] !== null &&
                            String(row[key.value]).trim() !== '' ? (
                              typeof row[key.value] === 'boolean' ? (
                                row[key.value] ? (
                                  <span className="text-green-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <circle cx="8" cy="8" r="8" fill="#424530" />
                                      <path
                                        d="M11.83 5.63087L6.46085 11L4 8.53915L4.63087 7.90828L6.46085 9.73378L11.1991 5L11.83 5.63087Z"
                                        fill="#FEFEFE"
                                        stroke="#FEFEFE"
                                        strokeWidth="0.5"
                                      />
                                    </svg>
                                  </span>
                                ) : (
                                  <span className="text-red-500">
                                    <FaTimes />
                                    {/* <img src={cross} style={{ maxWidth: '18px' }} className="d-block w-100" /> */}
                                  </span>
                                )
                              ) : key.value === 'name' ? (
                                <span className="user-name-cell text-capitalize">{String(row[key.value])}</span>
                              ) : (
                                String(row[key.value])
                              )
                            ) : (
                              'N/A'
                            )}
                          </td>
                        ))}
                        {(isEdit || isDelete || isView) && (
                          <td className="px-2 py-4 text-sm font-medium text-gray-900 whitespace-nowrap action-icons">
                            <div className="d-flex space-x-5 gap-2">
                              {isEdit && (
                                <button onClick={() => edit?.(row)} className="bg-transparent border-0 p-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="37"
                                    height="37"
                                    viewBox="0 0 37 37"
                                    fill="none"
                                  >
                                    <circle cx="18.3198" cy="18.3198" r="18.3198" fill="#F2FFF2" />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M21.0062 9.09582C21.3633 8.96806 21.7479 8.96806 22.105 9.09582C22.3622 9.18785 22.5592 9.34386 22.7143 9.48883C22.8556 9.62081 23.0096 9.79045 23.1675 9.96437L24.754 11.7114C24.9127 11.8861 25.0672 12.0562 25.1874 12.2121C25.3193 12.3832 25.4612 12.6004 25.5449 12.884C25.6609 13.2773 25.6608 13.7008 25.5448 14.0939C25.4612 14.3774 25.3195 14.5945 25.1876 14.7655C25.0676 14.9212 24.9132 15.0912 24.7548 15.2655L24.7266 15.2966L16.5904 24.2559H25.1111C25.602 24.2559 26 24.6941 26 25.2347C26 25.7753 25.602 26.2135 25.1111 26.2135H10.8889C10.398 26.2135 10 25.7753 10 25.2347V21.3194C10 21.0599 10.0937 20.8108 10.2603 20.6273L17.3715 12.7968L19.9258 9.98405L19.9429 9.96518C20.1011 9.791 20.2552 9.62118 20.3965 9.48908C20.5517 9.34401 20.7489 9.1879 21.0062 9.09582ZM18 14.8732L11.7778 21.7249V24.2559H14.0762L20.2985 17.4042L18 14.8732ZM21.5556 16.0199L23.4851 13.8952C23.6665 13.6954 23.766 13.5846 23.8323 13.4986C23.8349 13.4952 23.8373 13.492 23.8396 13.4889C23.8373 13.4858 23.8348 13.4825 23.8321 13.479C23.7648 13.3917 23.6633 13.2788 23.4769 13.0736L21.9304 11.3707C21.7448 11.1663 21.6428 11.055 21.5639 10.9813C21.561 10.9786 21.5582 10.976 21.5556 10.9736C21.5529 10.9761 21.55 10.9787 21.547 10.9815C21.468 11.0554 21.3659 11.1668 21.18 11.3715L21.1756 11.3763L19.2571 13.4889L21.5556 16.0199Z"
                                      fill="#0AB40C"
                                    />
                                  </svg>
                                </button>
                              )}
                              {isView && (
                                <button className="bg-transparent border-0 p-0" onClick={() => onViewClick?.(row)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="37"
                                    height="37"
                                    viewBox="0 0 37 37"
                                    fill="none"
                                  >
                                    <circle cx="18.3198" cy="18.3198" r="18.3198" fill="#F0FAFF" />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M22.5476 18.7896C22.5476 20.8651 20.8651 22.5475 18.7897 22.5475C16.7142 22.5475 15.0317 20.8651 15.0317 18.7896C15.0317 16.7142 16.7142 15.0317 18.7897 15.0317C20.8651 15.0317 22.5476 16.7142 22.5476 18.7896ZM21.1384 18.7896C21.1384 20.0868 20.0868 21.1383 18.7897 21.1383C17.4925 21.1383 16.441 20.0868 16.441 18.7896C16.441 17.4925 17.4925 16.4409 18.7897 16.4409C20.0868 16.4409 21.1384 17.4925 21.1384 18.7896Z"
                                      fill="#2790C3"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M9.76304 19.5303C9.62293 19.0468 9.62293 18.5324 9.76304 18.0489C10.8972 14.1351 14.5083 11.2738 18.7877 11.2738C23.0672 11.2738 26.6783 14.1351 27.8124 18.0489C27.9525 18.5324 27.9525 19.0468 27.8124 19.5303C26.6783 23.4442 23.0672 26.3055 18.7877 26.3055C14.5083 26.3055 10.8972 23.4442 9.76304 19.5303ZM11.1166 18.4411C12.0808 15.1135 15.1523 12.683 18.7877 12.683C22.4232 12.683 25.4946 15.1135 26.4589 18.4411C26.5248 18.6684 26.5248 18.9108 26.4589 19.1381C25.4946 22.4658 22.4232 24.8962 18.7877 24.8962C15.1523 24.8962 12.0808 22.4658 11.1166 19.1381C11.0507 18.9108 11.0507 18.6684 11.1166 18.4411Z"
                                      fill="#2790C3"
                                    />
                                  </svg>
                                </button>
                              )}
                              {isDelete && (
                                <button onClick={() => onDeleteClick?.(row)} className="bg-transparent border-0 p-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="37"
                                    height="37"
                                    viewBox="0 0 37 37"
                                    fill="none"
                                  >
                                    <circle cx="18.3198" cy="18.3198" r="18.3198" fill="#FFE9E2" />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M13.9996 12.6421C13.9375 12.6503 13.8784 12.6663 13.8232 12.6891C13.0843 12.7468 12.436 12.8042 11.9691 12.8475C11.7303 12.8696 11.5388 12.8881 11.4069 12.9011L11.255 12.9161L11.2024 12.9215L11.2014 12.9216C10.8143 12.9613 10.5327 13.3073 10.5725 13.6945C10.6122 14.0816 10.9582 14.3632 11.3454 14.3234L11.3447 14.3167C11.3454 14.3234 11.3454 14.3234 11.3454 14.3234L11.396 14.3183L11.5446 14.3035C11.6743 14.2908 11.8632 14.2726 12.0992 14.2507C12.5715 14.2069 13.2316 14.1485 13.9831 14.0901C15.4911 13.9729 17.3475 13.8574 18.7892 13.8574C20.231 13.8574 22.0874 13.9729 23.5954 14.0901C24.3468 14.1485 25.007 14.2069 25.4792 14.2507C25.7152 14.2726 25.9042 14.2908 26.0339 14.3035L26.1825 14.3183L26.2324 14.3233C26.6195 14.3631 26.9662 14.0816 27.006 13.6945C27.0457 13.3073 26.7641 12.9613 26.377 12.9216L26.3234 12.9161L26.1716 12.9011C26.0396 12.8881 25.8481 12.8696 25.6093 12.8475C25.1425 12.8042 24.4941 12.7468 23.7552 12.6891C23.7067 12.6691 23.6553 12.6543 23.6013 12.6454C23.1365 12.5687 22.7453 12.2554 22.5688 11.8187L22.4838 11.6084C22.0007 10.4126 20.84 9.6297 19.5503 9.6297H18.2846C17.0119 9.6297 15.8667 10.4022 15.3899 11.5822C15.1587 12.1543 14.6377 12.5579 14.026 12.6386L13.9996 12.6421ZM18.2846 11.0389C17.5864 11.0389 16.9581 11.4627 16.6965 12.1101C16.6397 12.2506 16.5733 12.3856 16.4983 12.5143C17.2961 12.4743 18.0868 12.4481 18.7892 12.4481C19.5687 12.4481 20.457 12.4804 21.3431 12.5279C21.3141 12.4687 21.2871 12.4083 21.2622 12.3466L21.1772 12.1363C20.9093 11.4731 20.2656 11.0389 19.5503 11.0389H18.2846Z"
                                      fill="#EB6753"
                                    />
                                    <path
                                      d="M25.128 16.0322C25.1618 15.6445 24.8748 15.3029 24.4871 15.2692C24.0994 15.2355 23.7578 15.5225 23.7241 15.9101L22.9677 24.6096C22.8727 25.7019 21.9582 26.5403 20.8618 26.5403H16.3411C15.2093 26.5403 14.2784 25.649 14.2292 24.5183L13.8563 15.9406C13.8394 15.5518 13.5105 15.2503 13.1217 15.2672C12.733 15.2841 12.4315 15.613 12.4484 16.0018L12.8213 24.5795C12.9033 26.4639 14.4549 27.9495 16.3411 27.9495H20.8618C22.6892 27.9495 24.2133 26.5522 24.3716 24.7317L25.128 16.0322Z"
                                      fill="#EB6753"
                                    />
                                    <path
                                      d="M15.9708 23.7219C15.5816 23.7219 15.2662 24.0373 15.2662 24.4265C15.2662 24.8156 15.5816 25.1311 15.9708 25.1311H21.6077C21.9968 25.1311 22.3123 24.8156 22.3123 24.4265C22.3123 24.0373 21.9968 23.7219 21.6077 23.7219H15.9708Z"
                                      fill="#EB6753"
                                    />
                                    <path
                                      d="M15.2662 21.6081C15.2662 21.2189 15.5816 20.9034 15.9708 20.9034H21.6077C21.9968 20.9034 22.3123 21.2189 22.3123 21.6081C22.3123 21.9972 21.9968 22.3127 21.6077 22.3127H15.9708C15.5816 22.3127 15.2662 21.9972 15.2662 21.6081Z"
                                      fill="#EB6753"
                                    />
                                    <path
                                      d="M15.9708 18.085C15.5816 18.085 15.2662 18.4005 15.2662 18.7896C15.2662 19.1788 15.5816 19.4942 15.9708 19.4942H21.6077C21.9968 19.4942 22.3123 19.1788 22.3123 18.7896C22.3123 18.4005 21.9968 18.085 21.6077 18.085H15.9708Z"
                                      fill="#EB6753"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {!hideRowsSelection && data.length > 0 && (
            <div className="pagination-admin d-flex justify-content-between align-items-center mt-4">
              {totalPages > 1 && (
                <Stack spacing={2}>
                  <Pagination
                    className="pagination"
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              )}
              <p className="ms-0 mb-0 f-14">{getPaginationString()}</p>
              <div className="d-flex justify-content-end my-0 me-0 pe-2 pagination-number">
                {!hideRowsPerPage && (
                  <div className="d-flex me-0 pe-0 table-select-btm align-items-center">
                    <label className="mb-0 mt-2 f-14 me-2" htmlFor="rows-per-page-select">
                      Rows per page:
                    </label>
                    <select
                      id="rows-per-page-select"
                      onChange={handleLimitChange}
                      className="form-select form-select-sm"
                      style={{ width: '80px' }}
                      value={limit ?? rowsPerPage}
                    >
                      {limitValues.map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col hv-30 items-center justify-center text-gray-500 bg-white h-80">
          <center style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <FaArchive fontSize="large" />
            <h4>No Entries Found</h4>
          </center>
        </div>
      )}
      {isDelete && dailogeloading && (
        <ConfirmationDialog
          isOpen={dailogeloading || isDialogOpen}
          loading={dialogLoading || isDialogOpen}
          text="Are you sure you want to delete this item?"
          onConfirm={handleConfirm}
          onClose={handleCancel}
        />
      )}
    </div>
  );
};
