import { PERMISSIONS, ROLES } from "@/config/permissions.config";
import { usePermission } from "@/context/PermissionContext";
import type { User, Role, Permission } from "@/type/type.g";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState<Role | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
    const [error, setError] = useState("");

    const { setUserCustomer } = usePermission();
    const navigate = useNavigate();

    const handlePermissionChange = (perm: Permission) => {
        setSelectedPermissions((prev) =>
            prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!role || selectedPermissions.length === 0) {
            setError("điền đầy đủ thông tin")
            return
        }

        const user: User = {
            id: crypto.randomUUID(),
            name: username,
            role: role!,
            permissions: selectedPermissions,
        };

        setUserCustomer(user);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-muted shadow-md rounded-lg p-6 w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>

                <div>
                    <label className="block text-sm font-medium">Họ và Tên</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2 text-black"
                        placeholder="Nhập họ tên"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>


                <div>
                    <label id="role" className="block text-sm font-medium mb-1">Vai trò</label>
                    <select
                        value={role ?? ""}
                        onChange={(e) => setRole(e.target.value as Role)}
                        className="w-full border rounded px-3 py-2 text-black"
                    >
                        <option value="">-- Chọn vai trò --</option>
                        {Object.entries(ROLES).map(([key, value]) => (
                            <option key={key} value={value}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Quyền</label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(PERMISSIONS).map(([key, value]) => (
                            <label key={key} className="inline-flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={value}
                                    checked={selectedPermissions.includes(value)}
                                    onChange={() => handlePermissionChange(value)}
                                />
                                <span>{key}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
