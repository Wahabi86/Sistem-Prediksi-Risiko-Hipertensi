"use client";
import React from "react";

interface RiwayatData {
  id_riwayat: string | number;
  tanggal: string;
  usia: string;
  tinggiBadan: string;
  beratBadan: string;
  bmi: number | string;
  tingkatStres: string;
  statusMerokok: string;
  waktuTidur: string;
  hasilPrediksi: string;
  probabilitas: string;
  faktorPendukung: string;
  panduanKesehatan: string[];
  gender?: string;
}

interface UserData {
  nama_lengkap: string;
  jenis_kelamin?: string;
}

interface PdfTemplateProps {
  riwayat: RiwayatData;
  user: UserData | null;
  id: string;
}

export default function PdfTemplate({ riwayat, user, id }: PdfTemplateProps) {
  return (
    <div id={id} style={{ padding: "40px", backgroundColor: "white", width: "750px", color: "#333" }}>
      {/* HEADER */}
      <div style={{ borderBottom: "2px solid #0872C2", paddingBottom: "10px", marginBottom: "20px" }}>
        <h1 style={{ color: "#0872C2", fontSize: "24px", margin: 0 }}>LAPORAN HASIL PREDIKSI RISIKO HIPERTENSI</h1>
        <p style={{ margin: 0, fontSize: "12px" }}>Waktu Prediksi: {riwayat.tanggal}</p>
      </div>

      {/* Identitas */}
      <div style={{ marginBottom: "20px", fontSize: "14px" }}>
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ width: "150px", padding: "4px 0" }}>Nama</td>
              <td>: {user?.nama_lengkap || "-"}</td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0" }}>Jenis Kelamin</td>
              <td>: {riwayat.gender || user?.jenis_kelamin || "-"}</td>
            </tr>
            <tr>
              <td style={{ padding: "4px 0" }}>Usia</td>
              <td>: {riwayat.usia}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Hasil Utama */}
      <div style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "20px", marginTop: 0, border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "16px", marginTop: 0, fontWeight: "bold" }}>Kesimpulan Prediksi:</h3>
        <p
          style={{
            fontWeight: "bold",
            color: riwayat.hasilPrediksi.toLowerCase().includes("tidak") ? "#16a34a" : " #dc2626",
          }}
        >
          {riwayat.hasilPrediksi}
        </p>
        <p>Probabilitas: {riwayat.probabilitas}</p>
      </div>

      {/* Data Klinis */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", fontSize: "16px" }}>Data Input</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "8px 0", width: "150px" }}>Tinggi Badan</td>
              <td>: {riwayat.tinggiBadan} cm</td>
              <td style={{ width: "150px" }}>Berat Badan</td>
              <td>: {riwayat.beratBadan} kg</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0" }}>BMI</td>
              <td>: {riwayat.bmi}</td>
              <td>Tingkat Stres</td>
              <td>: {riwayat.tingkatStres}/10</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0" }}>Status Merokok</td>
              <td>: {riwayat.statusMerokok}</td>
              <td>Waktu Tidur</td>
              <td>: {riwayat.waktuTidur}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Faktor Risiko */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", fontSize: "16px" }}>Faktor Risiko</h3>
        <p style={{ fontSize: "13px", lineHeight: "1.5", textAlign: "justify" }}>{riwayat.faktorPendukung}</p>
      </div>

      {/* Panduan Kesehatan */}
      <div>
        <h3
          style={{
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
            fontSize: "16px",
            marginTop: 0,
          }}
        >
          Panduan Kesehatan
        </h3>

        {/* Kalimat pembuka*/}
        <p
          style={{
            fontSize: "13px",
            lineHeight: "1.6",
            marginBottom: "8px",
          }}
        >
          {riwayat.panduanKesehatan?.[0]}
        </p>

        {/* Bullet point*/}
        <ul
          style={{
            fontSize: "13px",
            lineHeight: "1.6",
            paddingLeft: 0,
            marginLeft: 0,
            listStyleType: "none",
          }}
        >
          {riwayat.panduanKesehatan?.slice(1).map((item: string, idx: number) => (
            <li
              key={idx}
              style={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {/* Bullet Custom */}
              <span
                style={{
                  marginRight: "10px",
                  color: "#333",
                  fontSize: "18px",
                  lineHeight: "1",
                }}
              >
                •
              </span>
              <span style={{ flex: 1 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
