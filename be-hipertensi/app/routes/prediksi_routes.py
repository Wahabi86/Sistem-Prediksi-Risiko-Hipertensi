from flask import Blueprint, request, jsonify
from app.services.ml_service import predict_hypertension

prediksi_routes = Blueprint("prediksi_routes", __name__)

@prediksi_routes.route("/prediksi", methods=["POST"])
def prediksi():
    data = request.json
    if not data:
        return jsonify({"message": "Data input kosong"}), 400

    try:
        result = predict_hypertension(data)
        return jsonify(result), 200
    
    except ValueError as ve:
        # Menangani error input data yang hilang/salah (misal form tidak terisi lengkap)
        return jsonify({"message": f"Input data tidak valid: {str(ve)}"}), 400

    except Exception as e:
        # Menangani error internal (model tidak dimuat, dll.)
        print(f"Error saat prediksi: {e}")
        return jsonify({"message": "Kesalahan internal server. Cek log backend."}), 500