"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  LayoutDashboard, 
  Church, 
  ShieldCheck, 
  History, 
  Menu, 
  X, 
  LogOut,
  ChevronRight,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Youth Members", href: "/admin/youth", icon: Users },
  { name: "Church Hierarchy", href: "/admin/hierarchy", icon: Church },
  { name: "Admins", href: "/admin/admins", icon: ShieldCheck },
  { name: "Audit Logs", href: "/admin/audit-logs", icon: History },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden md:flex flex-col border-r bg-white transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Logo width={isSidebarOpen ? 140 : 40} height={40} className="transition-all" />
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group",
                  Active 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                )}
              >
                <link.icon size={20} className={cn(Active ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                {isSidebarOpen && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:text-secondary hover:bg-secondary/5",
              !isSidebarOpen && "px-0 justify-center"
            )}
            onClick={() => {/* Logout logic */}}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isSidebarOpen ? "md:ml-64" : "md:ml-20"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-md px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-muted-foreground" />
            </button>
            <h1 className="text-lg font-heading font-semibold text-slate-800">
              {sidebarLinks.find(l => l.href === pathname)?.name || "Admin Panel"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-semibold text-slate-900">Joseph Amuyunzu</span>
              <span className="text-xs text-muted-foreground font-medium">Super Admin</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
              <UserCircle size={24} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="container mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Overlays and Menu would go here */}
    </div>
  );
}
