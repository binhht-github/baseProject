import type { Permission, Role } from "@/type/type.g";

// Kiểu chính của User
export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    permissions: Permission[];
    createdAt?: string;
    updatedAt?: string;
}

export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;

export type TPram = {
    page?: number;
    limit?: number;
    search?: string;
}


export interface TResponse<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

