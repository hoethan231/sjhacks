"use client"

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTheme } from "next-themes";

/** Login page always forces light theme so it ignores global dark‑mode setting. */
export default function LoginPage() {
  const { setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Force light mode once when component mounts
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with real auth flow
    router.push("/"); // -> dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 p-8 border rounded-xl shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">Emergency Dashboard Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="w-4 h-4 text-gray-500" />}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock className="w-4 h-4 text-gray-500" />}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Forgot your password?{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            Reset it
          </Link>
        </p>
      </div>
    </div>
  );
}
