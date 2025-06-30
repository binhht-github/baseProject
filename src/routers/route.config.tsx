// src/routes/route.config.ts

import { PERMISSIONS } from "@/config/permissions.config";
import DashBoard from "@/pages/DashBoard";
import ProductPage from "@/pages/ProductPage";
import ReportPage from "@/pages/ReportPage";
import UserPage from "@/pages/UserPage";

export const routes = [
    {
        path: "/",
        element: <DashBoard />,
        permission: null,
        role: null,
    },
    {
        path: "/products",
        element: <ProductPage />,
        permission: null,
        role: null,
    },
    {
        path: "/users",
        element: <UserPage />,
        permission: PERMISSIONS.USER_CREATE,
        role: null,
    },
    {
        path: "/report",
        element: <ReportPage />,
        role: "admin",
        permission: null,
    },
];
