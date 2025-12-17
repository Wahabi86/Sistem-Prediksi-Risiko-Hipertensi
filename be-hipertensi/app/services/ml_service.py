import os
import joblib
import pandas as pd
from app.services.form_mapper import map_form_input

model_path = os.path.join(os.path.dirname(__file__), "../ml/model_xgb_capstone.pkl")
model = None

FEATURE_ORDER = [
    "Age", 
    "Stress_Score", 
    "BP_History", 
    "Sleep_Duration", 
    "BMI", 
    "Family_History", 
    "Exercise_Level", 
    "Smoking_Status"
]

def load_model():
    # Load Model sekali di awal agar tidak berat saat dipanggil
    global model
    if model is None:
        try:
            model = joblib.load(model_path)
            print("Model ML berhasil dimuat.")
        except Exception as e:
            # memberi tahu run.py bahwa aplikasi mungkin tidak berfungsi
            raise Exception(f"Gagal memuat model di {model_path}: {e}")

# Panggil load_model()
try:
    load_model()
except Exception as e:
    print(e)
    # Model tetap None dan prediksi akan dilewati

def predict_hypertension(data):
    if model is None:
        raise Exception("Layanan prediksi tidak tersedia: Model ML gagal dimuat.")
        
    mapped_data = map_form_input(data)  
    
    # Validasi input dari form_mapper (untuk input yang None)
    for feature, value in mapped_data.items():
        if value is None:
            raise ValueError(f"Input fitur '{feature}' tidak valid atau hilang.")
    
    # Konversi data ke format DataFrame Pandas
    input_df = pd.DataFrame([mapped_data], columns=FEATURE_ORDER)

    # Melakukan prediksi
    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1] 

    # Format untuk Hasil
    status = "Terdeteksi Hipertensi" if prediction == 1 else "Tidak Terdeteksi Hipertensi"
    probability_percent = round(float(probability) * 100, 1)

    result = {
        "prediction": int(prediction), 
        "status": status,       
        "probability": f"{probability_percent}%"     
    }

    return result
