import { NavItem } from "@/types/nav"
import { Icons } from "@/components/shared/icons"

export const navConfig: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Icons.home />,
  },
  {
    title: "All clients",
    href: "/patients",
    icon: <Icons.myPatients />,
  },
  {
    title: "Add new client",
    href: "/patients/add",
    icon: <Icons.newPatient />,
  },
]
