
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "@/theme/ThemeSwitcher";
import { ModeToggle } from "@/theme/ModeToggle";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { usePermission } from "@/context/PermissionContext";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import type { Role } from "@/type/type.g";

export function NavigationMenuDemo() {
    const { user, setUserCustomer, hasRoles } = usePermission();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserCustomer(null);
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    // 👇 Cấu hình menu + roles cho phép
    const menuItems = [
        { label: "Home", to: "/", roles: null }, // public hoặc luôn hiển thị nếu đã đăng nhập
        { label: "User", to: "/users", roles: ["admin", "manager"] },
        { label: "Product", to: "/product", roles: ["admin", "staff"] },
        { label: "Report", to: "/report", roles: ["admin"] },
    ];

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-background shadow">
            {/* Menu links */}
            <NavigationMenu>
                <NavigationMenuList className="flex gap-2">
                    {menuItems
                        .filter(({ roles }) => {
                            if (!roles) return true; // public hoặc không giới hạn role
                            return hasRoles(roles as Role[]); // ✅ kiểm tra role hiện tại có nằm trong list được phép
                        })
                        .map(({ label, to }) => (
                            <NavigationMenuItem key={to}>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <NavLink to={to}>{label}</NavLink>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right controls */}
            <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
                <ModeToggle />

                {/* Login / Logout */}
                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">👤 {user.name}</span>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </div>
                ) : (
                    <Button size="sm" onClick={() => navigate("/login")}>
                        Đăng nhập
                    </Button>
                )}
            </div>
        </div>
    );
}

// import * as React from "react"
// import { NavLink, useNavigate } from "react-router-dom"
// import { ThemeSwitcher } from "@/theme/ThemeSwitcher"
// import { ModeToggle } from "@/theme/ModeToggle"
// import LanguageSwitcher from "@/i18n/LanguageSwitcher"
// import { usePermission } from "@/context/PermissionContext"
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"
// import { Button } from "@/components/ui/button"

// export function NavigationMenuDemo() {
//     const { user, setUserCustomer, hasPermission, hasRoles } = usePermission()
//     const navigate = useNavigate()

//     const handleLogout = () => {
//         setUserCustomer(null)
//         sessionStorage.removeItem("user")
//         navigate("/login")
//     }

//     return (
//         <div className="flex items-center justify-between px-4 py-2 bg-background shadow">
//             {/* Menu links */}
//             <NavigationMenu>
//                 <NavigationMenuList className="flex gap-2">
//                     {[
//                         { label: "Home", to: "/", roles: [''] },
//                         { label: "User", to: "/users", roles: [''] },
//                         { label: "Product", to: "/product", roles: [''] },
//                         { label: "Report", to: "/report", roles: [''] },
//                     ].map(({ label, to }) => {
//                         if (hasRoles([user?.role!])) {
//                             console.log(user?.role!);

//                             return (
//                                 <NavigationMenuItem key={to}>
//                                     <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//                                         <NavLink to={to}>{label}</NavLink>
//                                     </NavigationMenuLink>
//                                 </NavigationMenuItem>
//                             )
//                         }
//                     })}
//                 </NavigationMenuList>
//             </NavigationMenu>

//             {/* Right controls */}
//             <div className="flex items-center gap-4">
//                 <LanguageSwitcher />
//                 <ThemeSwitcher />
//                 <ModeToggle />

//                 {/* Login / Logout */}
//                 {user ? (
//                     <div className="flex items-center gap-2">
//                         <span className="text-sm text-muted-foreground">👤 {user.name}</span>
//                         <Button variant="outline" size="sm" onClick={handleLogout}>
//                             Đăng xuất
//                         </Button>
//                     </div>
//                 ) : (
//                     <Button size="sm" onClick={() => navigate("/login")}>
//                         Đăng nhập
//                     </Button>
//                 )}
//             </div>
//         </div>
//     )
// }
