"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthStyle from "@/components/ui/AuthStyle";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi sederhana
    if (!formData.name || !formData.email || !formData.password || !formData.gender) {
        setError("Mohon lengkapi semua data.");
        setLoading(false);
        return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Registrasi gagal");

      alert("Registrasi Berhasil! Silakan login.");
      router.push("/auth/login"); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- STYLE INPUT DIKEMBALIKAN KE VERSI TRANSPARAN (SEPERTI SEBELUMNYA) ---
  const inputStyle = "w-full px-4 py-3 bg-white/20 lg:bg-gray-50 border border-white/30 lg:border-gray-200 text-white lg:text-slate-900 placeholder:text-cyan-100 lg:placeholder:text-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 lg:focus:ring-cyan-500 transition-all shadow-inner";

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Section Kiri */}
      <AuthStyle />

      {/* Section Kanan */}
      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-gradient-to-r from-cyan-800 to-[#0872C2] lg:bg-[#f9fafb] lg:from-transparent lg:to-transparent">
        <div className="w-full max-w-md space-y-8 bg-white/10 lg:bg-transparent p-8 sm:p-10 rounded-3xl backdrop-blur-md lg:backdrop-blur-none shadow-2xl lg:shadow-none border border-white/20 lg:border-none">
          
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white lg:text-slate-800 leading-tight">Buat Akun</h2>
            <p className="mt-2 text-cyan-200 lg:text-gray-500 font-medium">Lengkapi data untuk mendaftar</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5 md:space-y-6">
            
            {/* Pesan Error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center font-medium">
                    {error}
                </div>
            )}

            {/* Nama Lengkap */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-white lg:text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Masukkan Nama Lengkap"
                className={inputStyle}
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-semibold text-white lg:text-slate-700">Jenis Kelamin</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className={`${inputStyle} appearance-none cursor-pointer`}
              >
                <option value="" disabled hidden className="text-slate-400">Pilih Jenis Kelamin</option>
                <option value="Laki-laki" className="text-slate-900">Laki-Laki</option>
                <option value="Perempuan" className="text-slate-900">Perempuan</option>
              </select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-white lg:text-slate-700">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Masukkan Email"
                className={inputStyle}
              />
            </div>

            {/* Kata Sandi */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-white lg:text-slate-700">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan Kata Sandi"
                  className={`${inputStyle} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-100 lg:text-gray-400 hover:text-white lg:hover:text-cyan-600 transition-colors"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Daftar */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full bg-white hover:bg-gray-300 lg:bg-gradient-to-r lg:from-cyan-800 lg:to-[#0872C2] text-cyan-900 lg:text-white lg:hover:from-cyan-700 hover:to-[#0A7FD4] font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Daftar"}
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm sm:text-base text-white lg:text-gray-600 pt-1 sm:pt-2">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="text-cyan-200 lg:text-cyan-600 lg:hover:text-cyan-800 font-medium transition-colors duration-200 underline-offset-4 hover:underline">
                Masuk Sekarang
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}