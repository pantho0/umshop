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

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NavItem = ({ href, label, icon: Icon, badge }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className={`w-full justify-start rounded-lg transition-colors ${
        isActive
          ? "bg-gray-700 text-white hover:bg-gray-600"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
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

export function SidebarContent() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/");
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      {mounted && (
        <div className="flex h-full flex-col p-4 text-gray-300 md:mt-8">
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
                  {user!.firstName + " " + user!.lastName}
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
