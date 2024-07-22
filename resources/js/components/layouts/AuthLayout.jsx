import { Outlet, Link } from "react-router-dom";
import Appbar from "@/components/includes/Appbar";
import Drawer from "@/components/includes/Drawer";
export default function AuthLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        {/* DRAWER HERE */}
        <Drawer />

        <div className="flex-1 min-h-screen">
          {/* APPBAR HERE */}
          <Appbar />

          {/* MAIN CONTENT */}

          <main className="h-[calc(100vh-48px)] bg-gray-100 py-3 px-3">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
