import { NavItem } from "@/types/nav"
import { Icons } from "@/components/shared/icons"

export const navConfig: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Icons.home />,
  },
  {
    title: "My patients",
    href: "/my-patients",
    icon: <Icons.myPatients />,
  },
  {
    title: "Create new patient",
    href: "/my-patients/new",
    icon: <Icons.newPatient />,
  },
]
