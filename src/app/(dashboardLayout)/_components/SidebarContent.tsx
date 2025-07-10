"use client";

import {
  LayoutDashboard,
  Heart,
  CreditCard,
  User,
  MapPin,
  Bell,
  HelpCircle,
  FileText,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// You can move this to a separate file, e.g., /config/dashboard.ts
const sidebarNavItems = {
  main: [
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: LayoutDashboard,
      badge: "1",
    },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    {
      href: "/dashboard/payment",
      label: "Payment methods",
      icon: CreditCard,
    },
    { href: "/dashboard/reviews", label: "My reviews", icon: User },
  ],
  account: [
    { href: "/dashboard/personal-info", label: "Personal info", icon: User },
    { href: "/dashboard/addresses", label: "Addresses", icon: MapPin },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: Bell,
    },
  ],
  service: [
    { href: "/dashboard/help", label: "Help center", icon: HelpCircle },
    {
      href: "/dashboard/terms",
      label: "Terms and conditions",
      icon: FileText,
    },
  ],
};

// Reusable NavLink component - Modified to use React state instead of Next.js router
const NavLink = ({
  href,
  label,
  icon: Icon,
  badge,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    // Replaced Next.js Link with a standard anchor tag and an onClick handler
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="block"
    >
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start items-center"
      >
        <Icon className="mr-3 h-5 w-5" />
        <span className="flex-grow text-left">{label}</span>
        {badge && (
          <Badge className="ml-auto bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
            {badge}
          </Badge>
        )}
      </Button>
    </a>
  );
};

// Reusable Sidebar Content component - Modified to manage its own state
function SidebarContent() {
  // Use React state to track the active link, removing the dependency on usePathname
  const [activePath, setActivePath] = useState("/dashboard/orders");

  return (
    <div className="flex h-full flex-col justify-between p-4 bg-white dark:bg-gray-950">
      <div className="flex-grow">
        {/* User Profile Section */}
        <div className="flex items-center space-x-3 mb-8">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://placehold.co/40x40/E2E8F0/4A5568?text=SG"
              alt="Susan Gardner"
            />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">Susan Gardner</p>
            <p className="text-xs text-gray-500">100 bonuses available</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex flex-col space-y-4">
          <div className="space-y-1">
            {sidebarNavItems.main.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                isActive={activePath === item.href}
                onClick={() => setActivePath(item.href)}
              />
            ))}
          </div>

          <div className="pt-4">
            <h3 className="px-4 mb-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">
              Manage account
            </h3>
            <div className="space-y-1">
              {sidebarNavItems.account.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  isActive={activePath === item.href}
                  onClick={() => setActivePath(item.href)}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="px-4 mb-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">
              Customer service
            </h3>
            <div className="space-y-1">
              {sidebarNavItems.service.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  isActive={activePath === item.href}
                  onClick={() => setActivePath(item.href)}
                />
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Log Out Button at the bottom */}
      <div className="mt-6">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  );
}
export default SidebarContent;
