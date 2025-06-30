import { useToast } from "@/hooks/useToast";
import { useMutation, useQuery, useQueryClient, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query"
import type { TPram, TResponse, User } from "../type/type";
import { createUser, deleteUser, getUsers, updateUser } from "../api/api";




export const useQueryCustomers = (params: TPram = {}) => {
    return useQuery<TResponse<User>, Error>({
        queryKey: ["users", params],
        queryFn: () => getUsers(params),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnReconnect: true,
        // keepPreviousData: true // nếu dùng pagination
    });
}

export const useCreateUser = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: User) => createUser(data),

        onMutate: async (newCustomer) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });
            const previousCustomers = queryClient.getQueryData<any>(['users']);
            queryClient.setQueryData(['users'], (old: any) => {
                if (!Array.isArray(old)) return old;
                return [
                    { ...newCustomer, id: 'temp-' + Date.now() },
                    ...old,
                ];
            });
            return { previousCustomers };
        },

        onError: (_error, _variables, context) => {
            queryClient.setQueryData(['users'], context?.previousCustomers);
            toast.error("Thêm thất bại");
        },

        onSuccess: (newCustomer) => {
            queryClient.setQueriesData({ queryKey: ['users'] }, (oldData: any) => {
                if (!Array.isArray(oldData)) return oldData;
                return [...oldData, newCustomer];
            });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success("Thêm thành công");
        },
    });
};


export const useUpdateUser = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: User) => updateUser(data),
        onError: (error) => {
            toast.error("Update thất bại");
        },
        onSuccess: (updatedCustomer) => {
            // Update cache for single item (if applicable)
            queryClient.setQueryData(['users', updatedCustomer.id], updatedCustomer);

            //  Update array cache for ['product'] list
            queryClient.setQueriesData({ queryKey: ['users'] }, (oldData: any) => {
                if (!Array.isArray(oldData)) return oldData;

                const newData = oldData.map((product: any) =>
                    product.id === updatedCustomer.id ? updatedCustomer : product
                );

                return newData;
            });

            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success("Update thành công");
        },
    });

};

export const useDeleteUser = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id) => deleteUser(id),

        onError: () => {
            toast.error("Delete thất bại");
        },

        onSuccess: (_data) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success("Delete thành công");
        },
    });
};

