from app.extensions import db
from datetime import datetime, timezone, timedelta
import json

class RiwayatPrediksi(db.Model):
    __tablename__ = 'riwayat_prediksi'
    
    id_riwayat = db.Column(db.Integer, primary_key=True)
    id_users = db.Column(db.Integer, db.ForeignKey('users.id_users'), nullable=False)
    usia = db.Column(db.String(50))
    tinggi_badan = db.Column(db.Float)
    berat_badan = db.Column(db.Float)
    bmi = db.Column(db.Float)
    tingkat_stres = db.Column(db.Integer)
    waktu_tidur = db.Column(db.String(50))
    olahraga = db.Column(db.String(50))
    status_merokok = db.Column(db.String(50))
    riwayat_tekanan_darah = db.Column(db.String(100))
    riwayat_keluarga = db.Column(db.String(50))
    hasil_status = db.Column(db.String(50))
    probabilitas = db.Column(db.String(20))
    faktor_risiko = db.Column(db.Text)
    panduan_kesehatan = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        # merubah waktu ke wita
        waktu_wita = self.created_at + timedelta(hours=8)

        return {
            # Identitas
            "id_riwayat": self.id_riwayat,
            "tanggal": waktu_wita.strftime("%d %B %Y, %H:%M"),

            # Hasil
            "hasilPrediksi": self.hasil_status,
            "probabilitas": self.probabilitas,
            "faktorPendukung": self.faktor_risiko,

            # Data mentah untuk mendukung informasi dalam fitur PDF
            "usia": self.usia,
            "tinggiBadan": str(int(self.tinggi_badan)) if self.tinggi_badan else "0",
            "beratBadan": str(int(self.berat_badan)) if self.berat_badan else "0",
            "bmi": str(self.bmi),
            "tingkatStres": str(self.tingkat_stres),
            "waktuTidur": self.waktu_tidur,
            "olahraga": self.olahraga,
            "statusMerokok": self.status_merokok,
            "riwayatTekananDarah": self.riwayat_tekanan_darah,
            "riwayatKeluarga": self.riwayat_keluarga,

            # Untuk tampilan riwayat
            "kondisi": [
                f"Riwayat Tekanan Darah: {self.riwayat_tekanan_darah}",
                f"Status Merokok: {self.status_merokok}",
                f"Tingkat Stres: {self.tingkat_stres}/10",
                f"Riwayat Keluarga: {self.riwayat_keluarga}",
                f"BMI: {self.bmi}",
                f"Usia: {self.usia}"
            ],

            "panduanKesehatan": json.loads(self.panduan_kesehatan) if self.panduan_kesehatan else []
        }
