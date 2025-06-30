import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { TPram, User } from "@/features/users/type/type"
import { UserFormModal } from "@/features/users/components/UserFormModal"
import { UserDetail } from "@/features/users/components/UserDetail"
import { v4 as uuidv4 } from 'uuid';
import { usePermission } from "@/context/PermissionContext"
import { useCreateUser, useDeleteUser, useQueryCustomers, useUpdateUser } from "@/features/users/hooks/useUser"
import { useTranslation } from "react-i18next"
import UserTable from "@/features/users/components/UserTable"
import NotFound from "./error/NotFound"

export default function UserPage() {

    const { t } = useTranslation();
    const [params, setParam] = useState<TPram>({
        page: 1,
        limit: 10
    })
    const { data: users, isError, isLoading } = useQueryCustomers(params);
    const { mutate: createUser } = useCreateUser();
    const { mutate: updateUser } = useUpdateUser();
    const { mutate: deleteUser } = useDeleteUser();

    const [showDetail, setShowDetail] = useState<User | null>(null)
    const [formOpen, setFormOpen] = useState(false)
    const [formMode, setFormMode] = useState<"create" | "edit">("create")
    const [editingUser, setEditingUser] = useState<User | null>(null)

    const { hasPermission } = usePermission()

    const onView = (user: User) => {
        setShowDetail(user)
    }

    const handleEdit = (user: User) => {
        setEditingUser(user)
        setFormMode("edit")
        setFormOpen(true)
    }

    const onDelete = (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            deleteUser(id, {
                onSuccess: () => {

                }
            })
        }
    }

    const onCreate = () => {
        setEditingUser(null)
        setFormMode("create")
        setFormOpen(true)
        console.log("create");

    }

    const handleFormSubmit = (data: User) => {
        console.log(data);

        if (formMode === "edit" && editingUser) {
            updateUser(data, {
                onSuccess: (data) => {
                    // gì đó sau khi tạo xong
                    console.log(data);

                },
                onError: () => {

                }
            });
        } else {
            const newUser: User = {
                ...data,
                id: uuidv4(),
            }
            createUser(newUser, {
                onSuccess: (data) => {
                    // gì đó sau khi tạo xong
                    console.log(data);

                },
                onError: () => {

                }
            });

        }
        setFormOpen(false)
    }

    if (isLoading) return <div>Loading.....</div>
    if (isError) return <NotFound />

    return (
        <div className="p-6  max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{t("user.form.title")}</h1>
                <Button onClick={() => { hasPermission("user:create") && onCreate() }} className={!hasPermission("user:create") ? "opacity-50 cursor-not-allowed" : ""}>+ {t("user.action.create")}</Button>
            </div>

            <UserTable users={users?.data!} onView={onView} onDelete={onDelete} onEdit={handleEdit}
                currentPage={users?.currentPage!}
                totalItems={users?.totalItems!}
                totalPages={users?.totalPages!}
                params={params}
                setParam={setParam}
            />

            {showDetail && (
                <UserDetail user={showDetail} onClose={() => setShowDetail(null)} />
            )}

            <UserFormModal
                open={formOpen}
                mode={formMode}
                initialData={editingUser ?? undefined}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
}
