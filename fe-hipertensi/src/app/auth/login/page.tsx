"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import AuthStyle from "@/components/ui/AuthStyle";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Section Kiri */}
      <AuthStyle />

      {/* Section Kanan */}
      <div className=" flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-gradient-to-r from-cyan-800 to-[#0872C2] lg:bg-[#f9fafb] lg:from-transparent lg:to-transparent ">
        <div className="w-full max-w-md space-y-8 bg-white/10 lg:bg-transparent p-8 sm:p-10 rounded-3xl backdrop-blur-md lg:backdrop-blur-none shadow-2xl lg:shadow-none border border-white/20 lg:border-none">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white lg:text-slate-800 leading-tight">Mulai Sekarang</h2>
            <p className="mt-2 text-cyan-200 lg:text-gray-500 font-medium">Silahkan masuk ke akun Anda</p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            className="space-y-6"
          >
            {/* Pesan Error */}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center font-medium">{error}</div>}

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-white lg:text-slate-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 lg:bg-gray-50 border border-white/30 lg:border-gray-200 text-white lg:text-slate-900 placeholder:text-cyan-100 lg:placeholder:text-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 lg:focus:ring-cyan-500 transition-all shadow-inner"
              />
            </div>

            {/* Kata Sandi */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-white lg:text-slate-700">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Masukkan Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/20 lg:bg-gray-50 border border-white/30 lg:border-gray-200 text-white lg:text-slate-900 placeholder:text-cyan-100 lg:placeholder:text-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 lg:focus:ring-cyan-500 transition-all shadow-inner"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-100 lg:text-gray-400 hover:text-white lg:hover:text-cyan-600 transition-colors">
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full bg-white hover:bg-gray-300 lg:bg-gradient-to-r lg:from-cyan-800 lg:to-[#0872C2] text-cyan-900 lg:text-white lg:hover:from-cyan-700 hover:to-[#0A7FD4] font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm sm:text-base text-white lg:text-gray-600  pt-1 sm:pt-2">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-cyan-200 lg:text-cyan-600 lg:hover:text-cyan-800 font-medium transition-colors duration-200 underline-offset-4 hover:underline">
                Daftar Sekarang
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
