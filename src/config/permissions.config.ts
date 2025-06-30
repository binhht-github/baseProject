
export const PERMISSIONS = {
    USER_CREATE: "user:create",
    USER_EDIT: "user:edit",
    USER_UPDATE: "user:update",
    USER_DELETE: "user:delete",
    PRODUCT_VIEW: "product:view",
    PRODUCT_EDIT: "product:edit",
    REPORT_EXPORT: "report:export",
} as const;

export const ROLES = {
    ADMIN: "admin",
    STAFF: "staff",
    ACCOUNTANT: "accountant",
} as const;

