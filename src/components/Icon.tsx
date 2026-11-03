import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  FileText,
  FolderOpen,
  HeartHandshake,
  Home,
  Layers3,
  Lightbulb,
  Map,
  Megaphone,
  Menu,
  MessageCircle,
  MessagesSquare,
  Palette,
  Play,
  Presentation,
  Rocket,
  Search,
  Send,
  Sparkles,
  Target,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  arrow: ArrowRight,
  bell: Bell,
  briefcase: BriefcaseBusiness,
  building: Building2,
  calendar: CalendarDays,
  check: Check,
  chevron: ChevronRight,
  file: FileText,
  folder: FolderOpen,
  heart: HeartHandshake,
  help: CircleHelp,
  home: Home,
  layers: Layers3,
  lightbulb: Lightbulb,
  map: Map,
  megaphone: Megaphone,
  menu: Menu,
  message: MessageCircle,
  messages: MessagesSquare,
  palette: Palette,
  play: Play,
  policy: FileCheck2,
  presentation: Presentation,
  rocket: Rocket,
  search: Search,
  send: Send,
  sparkles: Sparkles,
  target: Target,
  users: Users,
  x: X,
}

interface IconProps {
  name: string
  className?: string
  strokeWidth?: number
}

export function Icon({ name, className, strokeWidth = 1.8 }: IconProps) {
  const Component = icons[name] ?? Sparkles
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
