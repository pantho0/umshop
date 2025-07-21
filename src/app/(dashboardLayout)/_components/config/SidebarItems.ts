import { LucideIcon, PackagePlus, ShoppingBasket } from "lucide-react";
import {
  Bell,
  CreditCard,
  FileText,
  Heart,
  HelpCircle,
  LayoutDashboard,
  MapPin,
  User,
  Package,
  Settings,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

type NavSection = {
  [key: string]: NavItem[];
};

export const sidebarAdminNavItems: NavSection = {
  main: [
    {
      href: "/dashboard/all-orders",
      label: "All Orders",
      icon: Package,
    },
    {
      href: "/dashboard/my-orders",

      label: "My Orders",
      icon: Package,
    },
    {
      href: "/dashboard/add-product",
      label: "Add Product",
      icon: PackagePlus,
    },
    {
      href: "/dashboard/products",
      label: "Products",
      icon: ShoppingBasket,
    },
    {
      href: "/dashboard/wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      href: "/dashboard/payment",
      label: "Payment Methods",
      icon: CreditCard,
    },
    {
      href: "/dashboard/reviews",
      label: "My Reviews",
      icon: LayoutDashboard,
    },
  ],
  account: [
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/dashboard/addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ],
  service: [
    {
      href: "/dashboard/help",
      label: "Help Center",
      icon: HelpCircle,
    },
    {
      href: "/dashboard/terms",
      label: "Terms & Conditions",
      icon: FileText,
    },
  ],
};

export const sidebarUserNavItems: NavSection = {
  main: [
    {
      href: "/user-dashboard/my-orders",
      label: "My Orders",
      icon: Package,
    },
    {
      href: "/user-dashboard/wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      href: "/user-dashboard/payment",
      label: "Payment Methods",
      icon: CreditCard,
    },
    {
      href: "/user-dashboard/reviews",
      label: "My Reviews",
      icon: LayoutDashboard,
    },
  ],
  account: [
    {
      href: "/user-dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/user-dashboard/addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      href: "/user-dashboard/notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      href: "/user-dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ],
  service: [
    {
      href: "/user-dashboard/help",
      label: "Help Center",
      icon: HelpCircle,
    },
    {
      href: "/user-dashboard/terms",

      label: "Terms & Conditions",
      icon: FileText,
    },
  ],
};
