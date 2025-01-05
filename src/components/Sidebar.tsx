'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const routes = [
  {
    label: '主页',
    icon: Home,
    href: '/',
  },
  {
    label: '角色管理',
    icon: Users,
    children: [
      {
        label: '角色列表',
        icon: Bot,
        href: '/characters',
      },
      {
        label: '创建角色',
        icon: Plus,
        href: '/create',
      },
    ],
  },
  {
    label: '对话',
    icon: MessageSquare,
    href: '/chat',
  },
  {
    label: '设置',
    icon: Settings,
    href: '/settings',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState<string[]>([]);
  const [expanded, setExpanded] = React.useState(true);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className={cn(
        "flex h-14 items-center border-b px-6",
        !expanded && "justify-center px-2"
      )}>
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          {expanded && <span className="font-bold">AI 角色</span>}
        </Link>
      </div>
      <nav className={cn(
        "flex-1 space-y-1",
        expanded ? "px-3" : "px-2"
      )}>
        {routes.map((route) => {
          if (route.children) {
            const isGroupOpen = openGroups.includes(route.label);
            return (
              <div key={route.label}>
                <button
                  onClick={() => toggleGroup(route.label)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                    "hover:bg-accent hover:text-accent-foreground",
                    "transition-colors"
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
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                          "hover:bg-accent hover:text-accent-foreground",
                          "transition-colors",
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
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                "transition-colors",
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
      <div className={cn(
        "flex h-14 items-center border-t",
        expanded ? "px-3" : "justify-center"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(prev => !prev)}
          className="h-8 w-8"
        >
          {expanded ? (
            <ChevronFirst className="h-4 w-4" />
          ) : (
            <ChevronLast className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "sticky top-0 hidden h-screen border-r bg-background lg:block transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
