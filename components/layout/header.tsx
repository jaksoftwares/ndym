"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getInitialUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Logo width={140} height={40} className="hover:opacity-90 transition-opacity" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                pathname.startsWith("/admin") ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              )}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {!loading && (
            <>
              {!user ? (
                <>
                  <Link href="/login" className="hidden sm:block">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary">Get Started</Button>
                  </Link>
                </>
              ) : (
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-foreground">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <User size={16} className="text-primary" />
                    </div>
                    <span>{user.email?.split('@')[0]}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-2 text-lg font-medium",
                    pathname === link.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.name}
                  <ChevronRight size={18} className="text-muted-foreground" />
                </Link>
              ))}
              
              {user && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-2 text-lg font-medium",
                    pathname.startsWith("/admin") ? "text-primary" : "text-foreground"
                  )}
                >
                  Dashboard
                  <ChevronRight size={18} className="text-muted-foreground" />
                </Link>
              )}

              <hr className="my-2" />

              {!loading && (
                <>
                  {!user ? (
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full">Login</Button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="primary" className="w-full">Register</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-3 px-1">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User size={20} className="text-primary" />
                        </div>
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <Button variant="outline" className="w-full justify-center gap-2" onClick={handleLogout}>
                        <LogOut size={18} />
                        Sign Out
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

