"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logOut, selectUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  sidebarAdminNavItems,
  sidebarUserNavItems,
} from "./config/SidebarItems";
import { useEffect, useState } from "react";
import { serverLogout } from "@/services/auth";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

// const NavItem = ({ href, label, icon: Icon, badge }: NavItemProps) => {
//   const pathname = usePathname();
//   const isActive = pathname === href;

//   return (
//     <Button
//       asChild
//       variant={isActive ? "secondary" : "ghost"}
//       className={`w-full justify-start rounded-lg transition-colors ${
//         isActive
//           ? "bg-gray-700 text-white hover:bg-gray-600"
//           : "text-gray-300 hover:bg-gray-700 hover:text-white"
//       }`}
//     >
//       <Link href={href}>
//         <Icon className="mr-3 h-5 w-5" />
//         <span className="flex-grow text-left">{label}</span>
//         {badge && (
//           <Badge className="ml-auto bg-red-500 text-white hover:bg-red-600">
//             {badge}
//           </Badge>
//         )}
//       </Link>
//     </Button>
//   );
// };

export function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [clickedLogout, setClickedLogut] = useState(false);

  const NavItem = ({ href, label, icon: Icon, badge }: NavItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    const handleClick = () => {
      if (onLinkClick) onLinkClick();
    };

    return (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-start rounded-lg transition-colors ${
          isActive
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
        onClick={handleClick}
      >
        <Link href={href}>
          <Icon className="mr-3 h-5 w-5" />
          <span className="flex-grow text-left">{label}</span>
          {badge && (
            <Badge className="ml-auto bg-red-500 text-white hover:bg-red-600">
              {badge}
            </Badge>
          )}
        </Link>
      </Button>
    );
  };

  const handleLogout = async () => {
    setClickedLogut(true);
    try {
      await serverLogout();
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    } catch (error) {
      if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        console.log("Logout redirect initiated by server action.");
      } else {
        console.error("Error during server-side logout:", error);
      }
    }
    dispatch(logOut());
  };

  useEffect(() => {
    if (clickedLogout === true) {
      router.push("/");
      router.refresh();
    }
  }, [clickedLogout]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="flex h-full flex-col p-4 text-gray-300 md:mt-8">
          {clickedLogout && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-white/50">
              <div className="flex flex-col items-center text-white">
                <svg
                  className="animate-spin h-8 w-8 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="mt-3 text-lg text-blue-500">Logging out...</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30">
              <Avatar className="border-2 border-gray-600">
                <AvatarImage
                  src="https://placehold.co/40x40/E2E8F0/4A5568?text=SG"
                  alt="User"
                  className="bg-gray-600"
                />
                <AvatarFallback className="bg-gray-600">SG</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white">
                  {user?.firstName + " " + user?.lastName}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-4">
              <div className="space-y-1">
                {user && user.role === "user"
                  ? sidebarUserNavItems.main.map((item) => (
                      <NavItem key={item.href} {...item} />
                    ))
                  : sidebarAdminNavItems.main.map((item) => (
                      <NavItem key={item.href} {...item} />
                    ))}
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Manage account
                </h3>
                <div className="space-y-1">
                  {user && user.role === "user"
                    ? sidebarUserNavItems.account.map((item) => (
                        <NavItem key={item.href} {...item} />
                      ))
                    : sidebarAdminNavItems.account.map((item) => (
                        <NavItem key={item.href} {...item} />
                      ))}
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Customer service
                </h3>
                <div className="space-y-1">
                  {user && user.role === "user"
                    ? sidebarUserNavItems.service.map((item) => (
                        <NavItem key={item.href} {...item} />
                      ))
                    : sidebarAdminNavItems.service.map((item) => (
                        <NavItem key={item.href} {...item} />
                      ))}
                </div>
              </div>
            </nav>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start mt-auto text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log out
          </Button>
        </div>
      )}
    </>
  );
}

export default SidebarContent;
