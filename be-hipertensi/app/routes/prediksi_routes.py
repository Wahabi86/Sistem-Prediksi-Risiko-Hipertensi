from flask import Blueprint, request, jsonify
from app.services.ml_service import predict_hypertension

prediksi_routes = Blueprint("prediksi_routes", __name__)

@prediksi_routes.route("/prediksi", methods=["POST"])
def prediksi():
    data = request.json
    result = predict_hypertension(data)
    return jsonify(result), 200
