import { PlusCircle, Megaphone, Building, Home, User } from "lucide-react";

export const AUTH_COOKIE_NAME = "auth-session";

export const userSidebarNavs = [
  {
    href: "/user/ad/new",
    label: "New Ad",
    icon: PlusCircle,
  },
  {
    href: "/user/ad",
    label: "My Ads",
    icon: Megaphone,
  },
  {
    href: "/user/house",
    label: "Houses",
    icon: Building,
  },
  {
    href: "/user/flat",
    label: "Flats",
    icon: Home,
  },
  {
    href: "/user/profile",
    label: "Profile",
    icon: User,
  },
];
