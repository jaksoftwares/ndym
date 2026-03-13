"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock authentication state (would be replaced with Supabase auth)
  const isLoggedIn = true; // For demonstration as per user request

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {isLoggedIn &&
            navLinks.map((link) => (
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
        </nav>

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          ) : (
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-sm font-medium text-muted-foreground">Welcome, Member</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
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
              {isLoggedIn ? (
                <>
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
                  <hr className="my-2" />
                  <Button variant="outline" className="w-full justify-center">Logout</Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full justify-center">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
