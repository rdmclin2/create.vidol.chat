"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bot,
  Settings,
  Plus,
  Menu,
  Users,
  MessageSquare,
  Home,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

const routes = [
  {
    label: "主页",
    icon: Home,
    href: "/",
  },
  {
    label: "角色列表",
    href: "/characters",
    icon: Users,
  },
  {
    label: "设置",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState<string[]>([]);
  const [expanded, setExpanded] = React.useState(true);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div
        className={cn(
          "flex h-14 items-center px-6 transition-all duration-300",
          !expanded && "justify-center px-2"
        )}
      >
        <Link href="/" className="flex items-center gap-2 transition-colors hover:text-primary">
          <Bot className="h-6 w-6" />
          {expanded && <span className="font-bold">角色梦工厂</span>}
        </Link>
      </div>
      <nav className={cn("flex-1 space-y-2 py-4", expanded ? "px-3" : "px-2")}>
        {routes.map((route) => {
          if (route.children) {
            const isGroupOpen = openGroups.includes(route.label);
            return (
              <div key={route.label}>
                <button
                  onClick={() => toggleGroup(route.label)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium",
                    "hover:bg-accent/50 hover:text-accent-foreground",
                    "transition-all duration-200 ease-in-out"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <route.icon className="h-4 w-4" />
                    {expanded && route.label}
                  </div>
                  {expanded && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isGroupOpen && "rotate-90"
                      )}
                    />
                  )}
                </button>
                {isGroupOpen && expanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {route.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                          "hover:bg-accent/50 hover:text-accent-foreground",
                          "transition-all duration-200 ease-in-out",
                          pathname === child.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        {expanded && child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                "hover:bg-accent/50 hover:text-accent-foreground",
                "transition-all duration-200 ease-in-out",
                pathname === route.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              {expanded && route.label}
            </Link>
          );
        })}
      </nav>
      <div
        className={cn(
          "flex items-center",
          expanded
            ? "h-14 px-3"
            : "flex-col gap-2 py-4 px-2"
        )}
      >
        <div className={cn("flex items-center gap-2", !expanded && "flex-col")}>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded((prev) => !prev)}
            className="h-8 w-8 rounded-lg hover:bg-accent/50 transition-colors duration-200"
          >
            {expanded ? (
              <ChevronFirst className="h-4 w-4" />
            ) : (
              <ChevronLast className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          "h-full transition-all duration-300",
          expanded
            ? "w-64 border-r border-border/10 bg-background"
            : "fixed left-0 top-0 z-40 w-16 bg-background/50 backdrop-blur-xl"
        )}
      >
        <SidebarContent />
      </aside>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 h-8 w-8 rounded-lg lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-background/50 backdrop-blur-xl">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
