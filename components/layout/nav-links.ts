import {
  BookOpenText,
  CalendarRange,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Target,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navLinks: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Mata Kuliah", icon: GraduationCap },
  { href: "/assignments", label: "Tugas", icon: BookOpenText },
  { href: "/calendar", label: "Kalender", icon: CalendarRange },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/settings", label: "Pengaturan", icon: Settings },
];
