import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type RowSelectionState,
    type SortingFn,
    type SortingState,
} from '@tanstack/react-table';
import { userColumnDef } from './column';
import type { TPram, User } from '../type/type';
import { useTranslation } from 'react-i18next';
import { Pagination } from '@/components/layout/Panigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ExportExcelButton } from '@/components/excel/ExportExcelBtn';
import SearchInput from '@/components/ui/SearchInput';
import { useDeleteUser } from '../hooks/useUser';

interface Props {
    users: User[];
    onView: (user: User) => void;
    onEdit: (user: User) => void;
    // onDelete: (id: string) => void;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    params: TPram;
    setParam: React.Dispatch<React.SetStateAction<TPram>>
}

function UserTable({ users, onView, onEdit, currentPage, totalItems, totalPages, params, setParam }: Props) {
    const { t } = useTranslation();
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const { mutate: deleteUser } = useDeleteUser();
    const onDelete = (id: string) => {


        if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            deleteUser(id, {
                onSuccess: (data) => {
                    console.log("delete success fulluly ", data);
                    if ((totalItems - 1) % params.limit! === 0) {
                        table.setPageIndex(currentPage - 2)

                    }

                }
            })
        }
    }

    const columns = userColumnDef({
        onView,
        onEdit,
        onDelete
    });

    const setPaginationCustomer = (
        updater:
            | ((old: { pageIndex: number; pageSize: number }) => { pageIndex: number; pageSize: number })
            | { pageIndex: number; pageSize: number },
    ) => {
        setParam((prev: TPram) => {
            const old = {
                pageIndex: (prev.page ?? 1) - 1,
                pageSize: prev.limit ?? 10,
            };

            const next = typeof updater === 'function' ? updater(old) : updater;

            const isPageSizeChanged = old.pageSize !== next.pageSize;

            return {
                ...prev,
                page: isPageSizeChanged ? 1 : next.pageIndex + 1,
                limit: next.pageSize,
            };
        });
    };

    const customSortByLastName: SortingFn<User> = (rowA, rowB, columnId) => {
        const nameA = rowA.getValue<string>(columnId)?.trim() ?? '';
        const nameB = rowB.getValue<string>(columnId)?.trim() ?? '';

        const lastWordA = nameA.split(' ').filter(Boolean).pop() ?? '';
        const lastWordB = nameB.split(' ').filter(Boolean).pop() ?? '';

        return lastWordA.localeCompare(lastWordB, 'vi');
    };

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),

        state: {
            sorting,
            rowSelection,
            pagination: {
                pageIndex: (currentPage ?? 1) - 1,
                pageSize: params.limit ?? 10,
            },
        },

        pageCount: totalPages ?? -1,
        manualPagination: true,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPaginationCustomer,

        onRowSelectionChange: setRowSelection,

        sortingFns: {
            customSortByLastName,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });


    const selectedData = table.getSelectedRowModel().rows.map(row => row.original);


    const onChangeSearch = (value: string) => {
        console.log("parent ", value);
        setParam((prev) => ({
            ...prev,
            search: value
        }))
    }

    return (
        <div className="overflow-x-auto rounded-md border">
            <div className=" w-full flex justify-end p-2">
                <div className='flex-1 mx-2 px-2'>
                    <SearchInput onChange={onChangeSearch} deBounce={500} className='rounded-xl' />
                </div>
                <div className='bg-primary p-1 border-border rounded-xl '>
                    <ExportExcelButton data={selectedData} fileName="khach_hang.xlsx" />
                </div>
            </div>
            <table className="min-w-full border-collapse text-sm">
                <thead className="bg-primary">
                    {table.getHeaderGroups().map((group) => (
                        <tr key={group.id}>
                            {group.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    {typeof header.column.columnDef.header === 'string' ? (
                                        t(`user.table.${header.id}`)
                                    ) : (
                                        flexRender(header.column.columnDef.header, header.getContext())
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 border-b border-muted">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 px-4" aria-label="Pagination">
                    <p className="text-sm text-foreground">
                        Showing
                        <span className="font-medium p-1">{(currentPage - 1) * params.limit! + 1}</span>
                        to
                        <span className="font-medium p-1">{Math.min(currentPage * params.limit!, totalItems)}</span>
                        of
                        <span className="font-medium p-1">{totalItems}</span>
                        results
                    </p>
                </div>

                <nav className="flex items-center justify-center flex-1" aria-label="Pagination">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-primary-foreground hover:bg-primary focus:outline-hidden focus:bg-ring disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Previous"
                    >
                        <ChevronLeft />
                        <span className="sr-only">Previous</span>
                    </Button>

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={(e) => table.setPageIndex(e - 1)}
                    />

                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-primary-foreground hover:bg-primary focus:outline-hidden focus:bg-ring disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Next"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRight />
                    </Button>
                </nav>

                <div className="flex items-center justify-end flex-1 px-5" aria-label="Pagination">
                    <div>
                        <select
                            className="bg-background text-foreground border border-border rounded-md px-2 py-1"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[2, 10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;