
import { Button } from "@/components/ui/button"
import type { User } from "../type/type"
import { usePermission } from "@/context/PermissionContext"
import { useTranslation } from "react-i18next"

interface UserListProps {
    users: User[]
    onEdit: (user: User) => void
    onDelete: (id: string) => void
    onView: (user: User) => void
}

export function UserList({ users, onEdit, onDelete, onView }: UserListProps) {
    const { hasPermission } = usePermission();
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            {users && users.map((user) => (
                <div
                    key={user.id}
                    className="p-4 border rounded flex items-center justify-between"
                >
                    <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-gray-500">Role: {user.role}</p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => { hasPermission("user:edit") && onView(user) }}
                            className={!hasPermission("user:edit") ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {t("user.action.view")}
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => { hasPermission("user:update") && onEdit(user) }}
                            className={!hasPermission("user:update") ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {t("user.action.update")}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => { hasPermission("user:delete") && onDelete(user.id) }}
                            className={!hasPermission("user:delete") ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {t("user.action.delete")}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
