// src/features/user/UserFormModal.tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"
// import { Role, Permission, UserInput } from "@/types/user"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ROLES, PERMISSIONS } from "@/config/permissions.config"
import type { User } from "../type/type"
import type { Permission } from "@/type/type.g"
import { useTranslation } from "react-i18next"

interface UserFormModalProps {
    open: boolean
    mode: "create" | "edit"
    initialData?: User
    onClose: () => void
    onSubmit: (data: User) => void
}

export function UserFormModal({
    open,
    mode,
    initialData,
    onClose,
    onSubmit,
}: UserFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
    } = useForm<any>({
        defaultValues: {
            name: "",
            email: "",
            role: "staff",
            permissions: [],
        },
    })
    const { t } = useTranslation();

    const selectedPermissions = watch("permissions")

    useEffect(() => {
        if (mode === "edit" && initialData) {
            reset(initialData)
        }

        if (mode === "create") {
            reset({
                name: "",
                email: "",
                role: "staff",
                permissions: [],
            })
        }
    }, [mode, initialData, reset])


    const togglePermission = (perm: Permission) => {
        const current = watch("permissions")
        if (current.includes(perm)) {
            setValue(
                "permissions",
                current.filter((p: any) => p !== perm)
            )
        } else {
            setValue("permissions", [...current, perm])
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Input placeholder="Tên" {...register("name", { required: true })} />
                    <Input placeholder="Email" type="email" {...register("email", { required: true })} />

                    <select {...register("role")} className="w-full border rounded px-2 py-2">
                        {Object.entries(ROLES).map(([label, value]) => (
                            <option key={label} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <div>
                        <p className="font-medium text-sm mb-1">Quyền</p>
                        <div className="grid grid-cols-1 gap-1">
                            {Object.entries(PERMISSIONS).map(([label, value]) => (
                                <label key={value} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={(selectedPermissions || []).includes(value)}
                                        onChange={() => togglePermission(value)}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        {mode === "create" ? t("user.form.btnSaveCreate") : t("user.form.btnSaveUpdate")}
                    </Button>

                    <Button type="button" onClick={reset}>Clear</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
