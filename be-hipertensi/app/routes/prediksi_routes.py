from flask import Blueprint, request, jsonify
from app.services.ml_service import predict_hypertension
from app.models.riwayat import RiwayatPrediksi # Pastikan file riwayat.py sudah dibuat
from app.extensions import db
from datetime import datetime, timezone
import json

prediksi_routes = Blueprint("prediksi_routes", __name__)

@prediksi_routes.route("/prediksi", methods=["POST"])
def prediksi():
    data = request.json
    if not data:
        return jsonify({"message": "Data input kosong"}), 400

    try:
        # 1. Jalankan Prediksi
        result = predict_hypertension(data)
        
        # 2. Ambil user_id dari data yang dikirim Frontend
        user_id = data.get("user_id")
        
        # 3. Simpan ke database jika ada user_id
        health_guidelines = result.get("health_guidelines", [])
        panduan_kesehatan_str = json.dumps(health_guidelines)

        if user_id:
            new_riwayat = RiwayatPrediksi(
                id_users=user_id,
                usia=data.get('usia'),
                tinggi_badan=float(data.get('tinggiBadan', 0)),
                berat_badan=float(data.get('beratBadan', 0)),
                bmi=float(data.get('bmi', 0)),
                tingkat_stres=int(data.get('tingkatStres', 0)),
                waktu_tidur=data.get('waktuTidur'),
                olahraga=data.get('olahraga'),
                status_merokok=data.get('statusMerokok'),
                riwayat_tekanan_darah=data.get('riwayatTekananDarah'),
                riwayat_keluarga=data.get('riwayatKeluarga'),
                hasil_status=result.get('status'),
                probabilitas=result.get('probability'),
                faktor_risiko=result.get('factor_supporting'), 
                panduan_kesehatan=panduan_kesehatan_str,
                created_at=datetime.now(timezone.utc)
            )
            db.session.add(new_riwayat)
            db.session.commit()

        # 4. Kembalikan hasil prediksi ke frontend untuk ditampilkan di Popup
        return jsonify(result), 200
    
    except ValueError as ve:
        return jsonify({"message": f"Input data tidak valid: {str(ve)}"}), 400
    except Exception as e:
        db.session.rollback()
        print(f"Error saat prediksi/simpan: {e}")
        return jsonify({"message": "Kesalahan internal server."}), 500

# Tambahkan route baru untuk mengambil riwayat milik user tertentu
@prediksi_routes.route("/riwayat/<int:user_id>", methods=["GET"])
def get_riwayat(user_id):
    try:
        # Ambil riwayat berdasarkan id_users, urutkan dari yang terbaru
        riwayat_data = RiwayatPrediksi.query.filter_by(id_users=user_id).order_by(RiwayatPrediksi.id_riwayat.desc()).all()
        
        return jsonify([r.to_dict() for r in riwayat_data]), 200
    except Exception as e:
        return jsonify({"message": f"Gagal mengambil riwayat: {str(e)}"}), 500