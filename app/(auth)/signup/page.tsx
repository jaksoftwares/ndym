"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import FormError from "@/components/ui/FormError";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // In a real app, redirect after success
      // setTimeout(() => router.push("/login"), 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <Card className="glass-card py-12">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-4">Registration Successful!</CardTitle>
            <CardDescription className="text-lg px-8">
              Welcome to the Nairobi Diocese Youth Ministry. Your account has been created successfully.
            </CardDescription>
            <div className="mt-8 px-8">
              <Button asChild className="w-full" onClick={() => (window.location.href = "/login")}>
                Proceed to Login
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo width={200} height={70} className="mb-2" />
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-center">Join the Ministry</CardTitle>
            <CardDescription className="text-center">
              Create an account to join our vibrant youth community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="space-y-1.5 font-sans">
                <label className="text-sm font-semibold text-foreground/80 ml-1">
                  I am joining as a:
                </label>
                <select className="flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent outline-none">
                  <option value="youth">Youth Member</option>
                  <option value="leader">Youth Leader</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                  showPasswordToggle
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  required
                  showPasswordToggle
                />
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-xs text-muted leading-relaxed">
                  I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <FormError message={error} />

              <Button
                type="submit"
                className="w-full mt-2"
                loading={isLoading}
              >
                Register Now
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center text-sm border-t pt-4">
              <span className="text-muted">Already a member? </span>
              <button onClick={() => (window.location.href = "/login")} className="text-primary font-semibold hover:underline">
                Sign In Instead
              </button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
