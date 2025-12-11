import os
import joblib
import numpy as np
from app.services.form_mapper import map_form_input

# Load Model sekali di awal agar tidak berat saat dipanggil
model_path = os.path.join(os.path.dirname(__file__), "../ml/model_xgb.pkl")
model = joblib.load(model_path)

def predict_hypertension(data):
    mapped = map_form_input(data)  

    input_features = np.array([[
        float(mapped["age"]),
        float(mapped["salt_intake"]),
        float(mapped["stress_score"]),
        float(mapped["sleep_duration"]),
        float(mapped["bp_history"]),
        float(mapped["family_history"]),
        float(mapped["exercise_level"]),
        float(mapped["smoking_status"]),
        float(mapped["medication"]),
        float(mapped["bmi"])
    ]])

    prediction = model.predict(input_features)[0]
    probability = model.predict_proba(input_features)[0][1] 

    #  Agar hasil berupa text
    status = "Terdeteksi Hipertensi" if prediction == 1 else "Tidak Terdeteksi Hipertensi"

    # Format agar Persentase
    probability_percent = round(float(probability) * 100, 1)

    result = {
        "prediction": int(prediction),   
        "status": status,      
        "probability": f"{probability_percent}%"    
    }

    return result
