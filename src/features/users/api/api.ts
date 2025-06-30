import type { CreateUserInput, TPram, TResponse, User } from "../type/type";

import axios from "@/lib/axios";




export const getUsers = async (params: TPram): Promise<TResponse<User>> => {
    console.log(params);

    const { page = 1, limit = 10, search = "" } = params;
    const start = (page - 1) * limit;

    const url = `user?_start=${start}&_limit=${limit}&name_like=${encodeURIComponent(search)}`;

    const res = await axios.get<User[]>(url, {
        validateStatus: status => status < 500,
    });

    const totalItems = parseInt(res.headers["x-total-count"] || "0");
    const totalPages = Math.ceil(totalItems / limit);
    console.log(res);

    return {
        data: res.data,
        totalItems,
        totalPages,
        currentPage: page,
    };
};

export const createUser = async (data: CreateUserInput): Promise<User> => {
    const now = new Date().toISOString();

    const payload = {
        ...data,
        createdAt: now,
    };

    const res = await axios.post<User>("user", payload);
    return res.data;
};

export const updateUser = async (data: User): Promise<User> => {
    const now = new Date().toISOString();
    const payload = {
        ...data,
        updatedAt: now,
    };
    const res = await axios.put<User>(`user/${data.id}`, payload);
    return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`user/${id}`);
};


