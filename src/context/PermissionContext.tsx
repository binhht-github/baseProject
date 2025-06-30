import { createContext, useContext, useEffect, useState } from "react";
import type { Permission, Role, User } from "@/type/type.g";

interface PermissionContextProps {
    user: User | null;
    setUserCustomer: (user: User | null) => void;
    hasPermission: (perm: Permission) => boolean;
    hasRole: (role: Role) => boolean;
    hasRoles: (role: Role[]) => boolean;
    isInitialized: boolean,
}

const PermissionContext = createContext<PermissionContextProps>({
    user: null,
    setUserCustomer: (user: User | null) => { },
    hasPermission: () => false,
    hasRole: () => false,
    hasRoles: () => false,
    isInitialized: false,
});

export const usePermission = () => useContext(PermissionContext);

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                sessionStorage.removeItem("user");
            }
        }
        setIsInitialized(true);
    }, []);

    const setUserCustomer = (user: User | null) => {
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
        setUser(user);
    };

    const hasPermission = (perm: Permission) =>
        user?.permissions.includes(perm) ?? false;

    const hasRole = (role: Role) => user?.role === role;

    const hasRoles = (roles: Role[]) => {
        return user ? roles.includes(user.role) : false;
    };

    return (
        <PermissionContext.Provider value={{ isInitialized, user, setUserCustomer, hasPermission, hasRole, hasRoles }}>
            {children}
        </PermissionContext.Provider>
    );
};
