import Sidebar from "@/components/Sidebar";
import RoleProtected from "@/components/RoleProtected";

export default function DashboardLayout({ children }) {
  return (
    <RoleProtected allowedRoles={["admin"]}>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 ml-72">{children}</div>
      </div>
    </RoleProtected>
  );
}
