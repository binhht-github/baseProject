import type { PERMISSIONS, ROLES } from "@/config/permissions.config";

export type Role = (typeof ROLES)[keyof typeof ROLES];
;
// export type Role = "admin" | "editor" | "viewer";

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export interface User {
    id: string;
    name: string;
    role: Role;
    permissions: Permission[];
}
