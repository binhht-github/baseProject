import { usePermission } from "@/context/PermissionContext";


export const useCan = (permission: string) => {
    const { hasPermission } = usePermission();
    return hasPermission(permission);
};
