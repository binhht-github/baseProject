// src/lib/ProtectedRoute.tsx
import { usePermission } from "@/context/PermissionContext";
import type { Permission, Role } from "@/type/type.g";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
    requirePermission?: Permission;
    requireRole?: Role;
    requireRoles?: Role[];
};

export const ProtectedRoute = ({
    children,
    requirePermission,
    requireRole,
    requireRoles
}: Props) => {
    const { user, hasPermission, hasRole, isInitialized } = usePermission();

    if (!isInitialized) {
        return null;
    }

    if (!user) return <Navigate to="/login" replace />;

    if (requirePermission && !hasPermission(requirePermission)) {
        return <div>Bạn không có quyền truy cập chức năng này.</div>;
    }

    if (requireRole && !hasRole(requireRole)) {
        return <div>Bạn không thuộc vai trò phù hợp.</div>;
    }

    if (requireRoles && !requireRoles.includes(user.role)) {
        return <div>Bạn không nằm trong các vai trò được phép.</div>;
    }

    return <>{children}</>;
};
