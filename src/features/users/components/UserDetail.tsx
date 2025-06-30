// src/features/user/UserDetail.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { User } from "../type/type"

interface UserDetailProps {
    user: User
    onClose: () => void
}

export function UserDetail({ user, onClose }: UserDetailProps) {
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chi tiết người dùng</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Họ tên:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Vai trò:</strong> {user.role}</p>
                    <p><strong>Quyền:</strong></p>
                    <ul className="list-disc list-inside">
                        {user.permissions.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    )
}
