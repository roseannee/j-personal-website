import {
  ArrowBigRight,
  Calendar,
  Check,
  ChevronsUpDown,
  Download,
  Ellipsis,
  House,
  LoaderCircle,
  LogOut,
  LucideProps,
  Moon,
  NotebookText,
  Phone,
  Plus,
  SquarePen,
  Sun,
  Trash2,
  UserRoundPlus,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  home: (props: LucideProps) => <House size={20} {...props} />,
  myPatients: (props: LucideProps) => <NotebookText size={20} {...props} />,
  newPatient: (props: LucideProps) => <UserRoundPlus size={20} {...props} />,

  sun: (props: LucideProps) => <Sun size={20} {...props} />,
  moon: (props: LucideProps) => <Moon size={20} {...props} />,
  signOut: (props: LucideProps) => <LogOut size={20} {...props} />,

  arrow: (props: LucideProps) => <ArrowBigRight size={20} {...props} />,
  loader: (props: LucideProps) => <LoaderCircle size={20} {...props} />,

  phone: (props: LucideProps) => <Phone size={20} {...props} />,
  pencil: (props: LucideProps) => <SquarePen size={20} {...props} />,

  plus: (props: LucideProps) => <Plus size={16} {...props} />,
  check: (props: LucideProps) => <Check size={16} {...props} />,
  calendar: (props: LucideProps) => <Calendar size={16} {...props} />,
  chevrons: (props: LucideProps) => <ChevronsUpDown size={16} {...props} />,

  download: (props: LucideProps) => <Download size={12} {...props} />,
  delete: (props: LucideProps) => <Trash2 size={12} {...props} />,

  dash: (props: LucideProps) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 7.5C5 7.22386 5.22386 7 5.5 7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H5.5C5.22386 8 5 7.77614 5 7.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),

  ellipsis: (props: LucideProps) => <Ellipsis size={16} {...props} />,
}
