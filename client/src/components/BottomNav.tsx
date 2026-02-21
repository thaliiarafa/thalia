import { Link, useLocation } from "wouter";
import { Home, CalendarHeart, ListTodo, Sparkles, Video, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/planner", icon: CalendarHeart, label: "Planner" },
  { href: "/tasks", icon: ListTodo, label: "Tasks" },
  { href: "/glow", icon: Sparkles, label: "Glow" },
  { href: "/studio", icon: Video, label: "Studio" },
  { href: "/inspo", icon: ImageIcon, label: "Inspo" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-white/40 pb-safe z-50">
      <div className="flex justify-around items-center px-1 py-2 pb-4">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 rounded-2xl cursor-pointer",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/20 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon strokeWidth={isActive ? 2.5 : 1.5} size={22} className="mb-1" />
              <span className={cn(
                "text-[10px] font-medium tracking-wide",
                isActive ? "opacity-100" : "opacity-0 translate-y-1 absolute bottom-1 transition-all"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}