import React from "react";
import { Page, Text, View, Document, StyleSheet, Image as PdfImage } from "@react-pdf/renderer";

interface InputData {
  tinggiBadan: string;
  beratBadan: string;
  tingkatStres: string;
  riwayatTekananDarah: string;
  waktuTidur: string;
  riwayatKeluarga: string;
  olahraga: string;
  statusMerokok: string;
}

interface PredictionResult {
  status: string;
  factor_supporting: string;
  health_guidelines: string[];
}

interface HasilPdfProps {
  data: InputData;
  result: PredictionResult;
  bmi: string;
}

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: "#ffffff", fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 5 },
  logo: { width: 100 },

  titleContainer: { marginTop: 10, marginBottom: 20 },
  title: { fontSize: 16, fontWeight: "bold", textAlign: "center", textTransform: "uppercase" },

  hr: { borderBottomWidth: 1, borderBottomColor: "#333", marginVertical: 10 },

  // Layouting Section
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginTop: 15, marginBottom: 10 },

  // Grid System untuk merapikan baris
  row: { flexDirection: "row", marginBottom: 8 },
  column: { flex: 1, flexDirection: "row", alignItems: "flex-start" },

  // Label & Value width agar titik dua (:) sejajar vertikal
  label: { width: 120, fontSize: 10, fontWeight: "bold" },
  value: { flex: 1, fontSize: 10 },

  // Diagnosis Styles
  diagRow: { flexDirection: "row", marginBottom: 12 },
  diagLabel: { width: 120, fontSize: 10, fontWeight: "bold" },
  diagValue: { flex: 1, fontSize: 10, textAlign: "justify", lineHeight: 1.5 },

  // Bullet Points System
  listContainer: { flex: 1, marginLeft: 5 },
  bulletRow: { flexDirection: "row", marginBottom: 4 },
  bulletSymbol: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, textAlign: "justify", lineHeight: 1.4 },
});

export default function HasilPdf({ data, result, bmi }: HasilPdfProps) {
  const tanggal = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Logo */}
        <View style={styles.header}>
          <PdfImage src="/images/logo.png" style={styles.logo} />
        </View>
        <View style={styles.hr} />

        {/* Judul Laporan */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LAPORAN HASIL PREDIKSI RISIKO HIPERTENSI</Text>
        </View>
        <View style={styles.hr} />

        {/* Info Pasien Section */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Tanggal Prediksi</Text>
            <Text style={styles.value}>: {tanggal}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Tinggi Badan</Text>
            <Text style={styles.value}>: {data.tinggiBadan} cm</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Nama Pasien</Text>
            <Text style={styles.value}>: Galang Abdee Prasatya</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Berat Badan</Text>
            <Text style={styles.value}>: {data.beratBadan} kg</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <Text style={styles.value}>: Laki-Laki</Text>
          </View>
        </View>

        {/* Riwayat Gejala Section */}
        <Text style={styles.sectionTitle}>Riwayat Gejala</Text>
        <View style={styles.hr} />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Tingkat Stress</Text>
            <Text style={styles.value}>: {data.tingkatStres}/10</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Riwayat Tekanan Darah</Text>
            <Text style={styles.value}>: {data.riwayatTekananDarah}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Waktu Tidur (per hari)</Text>
            <Text style={styles.value}>: {data.waktuTidur}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Riwayat Keluarga</Text>
            <Text style={styles.value}>: {data.riwayatKeluarga}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Olahraga</Text>
            <Text style={styles.value}>: {data.olahraga}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>BMI</Text>
            <Text style={styles.value}>: {bmi}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Status Merokok</Text>
            <Text style={styles.value}>: {data.statusMerokok}</Text>
          </View>
        </View>

        {/* Hasil Diagnosis Section */}
        <Text style={styles.sectionTitle}>Hasil Diagnosis</Text>
        <View style={styles.hr} />

        <View style={styles.diagRow}>
          <Text style={styles.diagLabel}>Hasil Prediksi</Text>
          <Text style={[styles.diagValue, { fontWeight: "bold" }]}>: {result.status}</Text>
        </View>

        <View style={styles.diagRow}>
          <Text style={styles.diagLabel}>Faktor Risiko</Text>
          <Text style={styles.diagValue}>: {result.factor_supporting}</Text>
        </View>

        <View style={styles.diagRow}>
          <Text style={styles.diagLabel}>Panduan Kesehatan</Text>
          <View style={styles.listContainer}>
            {result.health_guidelines.map((text, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletSymbol}>{i === 0 ? ":" : "•"}</Text>
                <Text style={styles.bulletText}>{text}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
