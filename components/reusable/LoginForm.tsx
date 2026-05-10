"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Armchair, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { INPUT_CLS } from "@/constants";

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const from         = searchParams.get("from") ?? "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "Invalid credentials.");
        return;
      }

      router.push(from);
      router.refresh();
      toast.success("Signed in successfully");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">

      
      <div className="w-1/2 h-full flex-1 hidden lg:flex">
        <div className="h-full aspect-3/4 overflow-hidden">
          <Image
            src='/int_img.jpg'
            alt="hero image"
            width={200}
            height={200}
            className="h-full w-full object-cover object-center grayscale-100"
          />
        </div>
      </div>

      <div className="w-full h-full flex flex-1">

        <div className="h-full w-full aspect-3/4! overflow-hidden py-12 pl-8">

          <div className="flex flex-col mb-12">
            <Armchair strokeWidth={1.4} size={32} className="text-peach-400 mb-4"/>
            <p className="text-sm  text-zinc-400">welcome to</p>
            <h1 className="text-2xl text-zinc-800 uppercase font-semibold">Wolesite Studio</h1>
            <p className="text-base text-zinc-700 ">✦ dashboard</p>
          </div>

          <div className="w-full max-w-120">
            <h2 className="text-xl font-semibold text-[#2C2520] mb-1">Sign in</h2>
            <p className="text-xs text-zinc-400 mb-4">Enter your credentials to access the dashboard.</p>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="w-full">
                <label className="block text-sm capitalize text-zinc-700 font-medium mb-2">
                  username
                </label>
                <input
                  type="text"
                  className={`bg-zinc-100/50! border-zinc-300! ${INPUT_CLS}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  autoFocus
                  disabled={loading}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm capitalize text-zinc-700 font-medium mb-2">
                  password
                </label>
                <input
                  type="password"
                  className={`bg-zinc-100/50! border-zinc-300! ${INPUT_CLS}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 ">
                  <span><TriangleAlert size={14} strokeWidth={1.4} className="text-red-500"/></span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-8 py-2 bg-zinc-400 text-zinc-50 text-sm font-medium hover:bg-zinc-500 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-default"
              >
                {loading ? <>Signing in <Spinner /></> : <>Sign in <ArrowRight size={18} strokeWidth={1.8}/></>}
              </button>
            </form>
          </div>

          <p className="text-xs text-zinc-400 mt-8">
            Wolesite Studio · CMS Dashboard
          </p>

        </div>
      </div>
    </div>
  );
}