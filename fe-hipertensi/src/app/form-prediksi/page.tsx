"use client";
import React, { useState } from "react";
import { User, Brain, Stethoscope, Dumbbell, MoveLeft } from "lucide-react";
import PopupHasil from "@/components/ui/PopupHasil";
import Link from "next/link";

interface PredictionResult {
  status: string;
  probability: string;
  factor_supporting: string;
  health_guidelines: string[];
}

export default function FormPage() {
  const [formData, setFormData] = useState({
    gender: "",
    usia: "",
    tingkatStres: "",
    waktuTidur: "",
    riwayatTekananDarah: "",
    riwayatKeluarga: "",
    olahraga: "",
    statusMerokok: "",
    jenisObat: "",
    tinggiBadan: "",
    beratBadan: "",
  });

  const [bmi, setBmi] = useState("");

  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // BMI Calculation Logic
    if (field === "tinggiBadan" || field === "beratBadan") {
      const tinggi = field === "tinggiBadan" ? parseFloat(value) : parseFloat(formData.tinggiBadan);
      const berat = field === "beratBadan" ? parseFloat(value) : parseFloat(formData.beratBadan);

      if (tinggi > 0 && berat > 0) {
        const tinggiMeter = tinggi / 100;
        const bmiValue = berat / (tinggiMeter * tinggiMeter);
        setBmi(bmiValue.toFixed(1));
      } else {
        setBmi("");
      }
    }
  };

  // menampilkan popup hasil
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);

    const requiredFields: (keyof typeof formData)[] = ["usia", "tingkatStres", "waktuTidur", "riwayatTekananDarah", "riwayatKeluarga", "olahraga", "statusMerokok"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("Harap lengkapi semua data");
        setIsLoading(false);
        return;
      }
    }

    if (!bmi) {
      alert("Harap masukkan Tinggi dan Berat Badan untuk menghitung BMI.");
      setIsLoading(false);
      return;
    }

    const payload = {
      usia: formData.usia,
      tingkatStres: formData.tingkatStres,
      waktuTidur: formData.waktuTidur,
      riwayatTekananDarah: formData.riwayatTekananDarah,
      riwayatKeluarga: formData.riwayatKeluarga,
      olahraga: formData.olahraga,
      statusMerokok: formData.statusMerokok,
      bmi: bmi,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/prediksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // menangani error dari backend
        throw new Error(data.message || "Gagal mendapatkan hasil prediksi.");
      }

      // Simpan Hasil dan Tampilkan Popup
      setPredictionResult(data);
      setShowPopup(true);
    } catch (err: unknown) {
      // Melakukan pengecekan apakah err memiliki properti message
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui";

      console.error("Fetch Error:", errorMessage);
      setError(errorMessage);
      alert(`Terjadi Kesalahan: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto shadow-lg">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-cyan-800 to-[#0872C2] rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <div className="text-center text-white">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Prediksi Risiko Hipertensi</h1>
                <p className="text-cyan-100 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">Isi data diri Anda untuk mengetahui tingkat risiko hipertensi</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Section Data Pribadi */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 mr-2" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Data Pribadi</h2>
              </div>
              <hr className="border-gray-300 mb-4 sm:mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Section Jenis Kelamin */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Jenis Kelamin</label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {["Laki-laki", "Perempuan"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange("gender", option)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200
                          ${formData.gender === option ? "bg-cyan-600 text-white border-cyan-600 shadow-md" : "bg-white text-gray-700 border-gray-300 hover:border-cyan-400"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Usia */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Kelompok Usia</label>
                  <select
                    value={formData.usia}
                    onChange={(e) => handleInputChange("usia", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 text-sm"
                  >
                    <option value="">Pilih Usia</option>
                    {["< 20 tahun", "20-29 tahun", "30-39 tahun", "40-49 tahun", "50-59 tahun", "≥ 60 tahun"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section Gaya Hidup */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 mr-2" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Gaya Hidup</h2>
              </div>
              <hr className="border-gray-300 mb-4 sm:mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Section Tingkat Stres */}
                <div>
                  <label className="block text-sm text-gray-700 font-semibold mb-4">Tingkat Stres</label>
                  {/* Slider */}
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={formData.tingkatStres || 0}
                    onChange={(e) => handleInputChange("tingkatStres", e.target.value)}
                    className="stress-slider w-full"
                    style={{
                      background: `linear-gradient(to right, #0891b2 ${Number(formData.tingkatStres) * 10}%, #e5e7eb ${Number(formData.tingkatStres) * 10}%)`,
                    }}
                  />

                  {/* Angka 0–10 */}
                  <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                    {Array.from({ length: 11 }, (_, i) => (
                      <span key={i}>{i}</span>
                    ))}
                  </div>
                  {/* Keterangan */}
                  <div className="mt-3 text-xs sm:text-sm text-gray-600 flex justify-between">
                    <span>0 (Tidak stres)</span>
                    <span>10 (Sangat stres)</span>
                  </div>
                </div>

                {/* Section Waktu Tidur */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Waktu Tidur (per hari)</label>
                  <select
                    value={formData.waktuTidur}
                    onChange={(e) => handleInputChange("waktuTidur", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 text-sm"
                  >
                    <option value="" disabled>
                      Pilih Waktu Tidur
                    </option>
                    {["< 5 jam", "5-6 jam", "7-8 jam", "> 8 jam"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section Olahraga */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Olahraga</label>
                  <select
                    value={formData.olahraga}
                    onChange={(e) => handleInputChange("olahraga", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 text-sm"
                  >
                    <option value="" disabled>
                      Pilih Tingkat Aktivitas Olahraga
                    </option>
                    {["Tidak pernah", "1-2 kali per minggu", "3-4 kali per minggu", "≥ 5 kali per minggu"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section Status Merokok */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Status Merokok</label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {["Tidak merokok", "Perokok aktif"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange("statusMerokok", option)}
                        className={`w-full px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 border ${
                          formData.statusMerokok === option ? "bg-cyan-600 text-white border-cyan-600 shadow" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-cyan-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section Riwayat Kesehatan */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 mr-2" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Riwayat Kesehatan</h2>
              </div>
              <hr className="border-gray-300 mb-4 sm:mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Section Riwayat Tekanan Darah */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Riwayat Tekanan Darah</label>
                  <select
                    value={formData.riwayatTekananDarah}
                    onChange={(e) => handleInputChange("riwayatTekananDarah", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 text-sm"
                  >
                    <option value="" disabled>
                      Pilih Riwayat Tekanan Darah
                    </option>
                    {["Normal (<120 / <80 mmHg)", "Pra-hipertensi (120-139 / 80-89 mmHg)", "Hipertensi (140-159 / 90-99 mmHg)"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section Riwayat Keluarga */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Riwayat Keluarga</label>
                  <select
                    value={formData.riwayatKeluarga}
                    onChange={(e) => handleInputChange("riwayatKeluarga", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-900 text-sm"
                  >
                    <option value="" disabled>
                      Pilih Riwayat Keluarga
                    </option>
                    {["Tidak ada", "Ada hipertensi"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section Data Fisik */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 mr-2" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Data Fisik</h2>
              </div>
              <hr className="border-gray-300 mb-4 sm:mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Section Tinggi Badan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    placeholder="Contoh: 170"
                    value={formData.tinggiBadan}
                    onChange={(e) => handleInputChange("tinggiBadan", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Section Berat Badan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Berat Badan (kg)</label>
                  <input
                    type="number"
                    placeholder="Contoh: 70"
                    value={formData.beratBadan}
                    onChange={(e) => handleInputChange("beratBadan", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Section BMI */}
              <div className="mt-4 sm:mt-6 bg-gradient-to-r  rounded-xl p-4 sm:p-6  shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Hasil Perhitungan BMI</h3>
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-2">{bmi || "--"}</div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {bmi ? (parseFloat(bmi) < 18.5 ? "Kurus" : parseFloat(bmi) < 25 ? "Normal" : parseFloat(bmi) < 30 ? "Kegemukan" : "Obesitas") : "Masukkan tinggi dan berat badan untuk melihat BMI"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto bg-gradient-to-r from-cyan-800 to-[#0872C2] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform transition-all duration-500 ease-in-out active:scale-95 ${
                  isLoading ? "opacity-60 cursor-not-allowed" : "hover:from-cyan-700 hover:to-[#0A7FD4]"
                }`}
              >
                {isLoading ? "Memproses Data..." : "Mulai Prediksi Sekarang"}
              </button>
              <div className="flex justify-center">
                <Link href="/beranda" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200 text-sm sm:text-base">
                  <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </form>

          {/* Untuk memunculkan Popup */}
          {showPopup && predictionResult && <PopupHasil onClose={() => setShowPopup(false)} result={predictionResult} />}
        </div>
      </div>
    </div>
  );
}
