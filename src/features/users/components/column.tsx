import { type ColumnDef, type SortingFnOption } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { User } from "../type/type";
import { usePermission } from "@/context/PermissionContext";

type ActionHandlers = {
    onView: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
};



export const userColumnDef = ({
    onView,
    onEdit,
    onDelete,
}: ActionHandlers): ColumnDef<User>[] => {
    const { t } = useTranslation();
    const { hasPermission } = usePermission()
    return [
        {
            id: "select",
            header: ({ table }) => (

                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
                    className="border-foreground"
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                    className="border-foreground"
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => (
                <span className="text-muted-foreground text-center w-full" > {row.getValue("id")} </span>
            ),
        },

        {
            accessorKey: "name",
            sortingFn: "customSortByLastName" as SortingFnOption<User>,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("user.table.name")}
                    < ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-medium text-blue-600" >
                    {row.getValue("name")}
                </div>
            ),
            enableHiding: false,
        },

        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
                <span className="text-muted-foreground" > {row.getValue("email")} </span>
            ),
        },


        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex">
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
                );
            },
            enableHiding: false,
        },
    ];
}




