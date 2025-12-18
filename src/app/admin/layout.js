import { verifyToken } from "@/helpers/auth";

import AdminMenu from "@/components/layout/AdminMenu";

async function AdminLayout({ children }) {
    let userData = null;

    const userToken = await verifyToken();
    if (userToken) {
        userData = {
            username: userToken.username,
            role: userToken.role
        }
    }

    const allNavLinks = [
        { label: "สไตล์บ้าน", href: "/admin/house-style-setting", roles: ["admin", "super"] },
        { label: "ประเภทที่พักอาศัย", href: "/admin/property-type-setting", roles: ["admin", "super"] },
        { label: "ผลงาน", href: "/admin/project-setting", roles: ["admin", "super"] },
        { label: "แบบบ้าน", href: "/admin/home-design-setting", roles: ["admin", "super"] },
        { label: "บทความ", href: "/admin/article-setting", roles: ["admin", "super"] },
        { label: "ผู้ใช้งาน", href: "/admin/user-setting", roles: ["super"] },
    ];

    const navLinks = userData?.role ? allNavLinks.filter((item) => item.roles.includes(userData.role)) : [];

    return (
        <AdminMenu navLinks={navLinks} >
            {children}
        </ AdminMenu>
    );
}

export default AdminLayout;
