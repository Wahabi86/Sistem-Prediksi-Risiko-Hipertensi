"use client";
import React, { useState, useEffect } from "react";
import { UserPen, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface UpdatePayload {
  nama_lengkap: string;
  password?: string;
}

export default function EditPage() {
  const { updateProfile, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // State untuk data awal
  const [initialData, setInitialData] = useState({
    nama_lengkap: "",
  });

  // State untuk form
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    jenis_kelamin: "",
    password: "", // Kosongkan secara default
  });

  // Load data dari localStorage saat halaman dibuka
  useEffect(() => {
    // Logic untuk mengatasi user yang tidak mempunyai token
    const token = localStorage.getItem("token");
    // Jika token tidak ada arahkan ke login
    if (!token) {
      router.push("/auth/login");
    } else {
      // Jika ada izinkan konten tampil
      setIsAuthorized(true);
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const data = {
        nama_lengkap: user.nama_lengkap || "",
        email: user.email || "",
        jenis_kelamin: user.jenis_kelamin || "",
        password: "",
      };
      setFormData(data);
      // Simpan nama awal untuk deteksi perubahan
      setInitialData({ nama_lengkap: user.nama_lengkap || "" });
    }
  }, [router]);

  // Jangan tampilkan apapun sebelum status login terkonfirmasi
  if (!isAuthorized) return null;

  // Logika Deteksi Perubahan:
  const isUnchanged = formData.nama_lengkap === initialData.nama_lengkap && formData.password.trim() === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cek apakah ada perubahan
    if (isUnchanged) {
      Swal.fire({
        title: "Tidak Ada Perubahan",
        text: "Silakan ubah nama atau kata sandi Anda terlebih dahulu sebelum menyimpan.",
        icon: "warning",
        customClass: {
          confirmButton: "swal-btn-gradient",
        },
        buttonsStyling: false,
      });
      return;
    }

    // Siapkan data yang akan dikirim (Password hanya dikirim jika diisi)
    const payload: UpdatePayload = {
      nama_lengkap: formData.nama_lengkap,
    };

    if (formData.password.trim() !== "") {
      payload.password = formData.password;
    }

    const result = await updateProfile(payload);

    if (result.success) {
      Swal.fire({
        title: "Berhasil",
        text: "Profil diperbarui!",
        icon: "success",
        customClass: {
          confirmButton: "swal-btn-gradient",
        },
        buttonsStyling: false,
      });
      // Pemicu agar Navbar tahu ada perubahan data
      window.dispatchEvent(new Event("user-updated"));

      // Update data awal agar tombol kembali disabled setelah sukses
      setInitialData({ nama_lengkap: formData.nama_lengkap });
      setFormData((prev) => ({ ...prev, password: "" }));
    } else {
      Swal.fire({
        title: "Gagal",
        text: result.msg,
        icon: "error",
        customClass: {
          confirmButton: "swal-btn-gradient",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="container mx-auto max-w-5xl my-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Title */}
        <div className="flex items-center gap-2 text-cyan-600 mb-6">
          <UserPen className="w-5 h-5 sm:w-6 sm:h-6" />
          <h1 className="text-base sm:text-lg md:text-xl font-bold">Edit Profil</h1>
        </div>

        {/* Foto Profile */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 text-black rounded-full border-2 border-[#C0BCBC] flex items-center justify-center font-bold text-3xl sm:text-4xl">{formData.nama_lengkap.charAt(0).toUpperCase() || "U"}</div>
        </div>

        {/* Data User */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Pengguna */}
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2">Nama Pengguna</label>
              <input
                type="text"
                value={formData.nama_lengkap}
                onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2">Jenis Kelamin</label>
              <input type="text" value={formData.jenis_kelamin} disabled className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none text-gray-400 cursor-not-allowed" />
            </div>

            {/* Email */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" value={formData.email} disabled className="w-full px-4 py-3 bg-gray-200 border border-gray-300 text-gray-400 rounded-lg focus:outline-none cursor-not-allowed" />
            </div>

            {/* Kata Sandi */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Ganti Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white lg:hover:text-cyan-600 transition-colors cursor-pointer">
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5 " />}
                </button>
              </div>
            </div>
          </div>

          {/* Button Simpan */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-cyan-800 to-[#0872C2] hover:from-cyan-700 hover:to-[#0A7FD4] text-white px-10 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:from-cyan-700 hover:to-[#0A7FD4]"
              }`}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
