import { Outlet, Link } from "react-router-dom";
import Appbar from "@/components/includes/Appbar";
import Drawer from "@/components/includes/Drawer";
export default function AuthLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        {/* MAIN CONTENT */}
        <Outlet />
      </div>
    </>
  );
}
