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
    
    for feature, value in mapped_data.items():
        if value is None:
            raise ValueError(f"Input fitur '{feature}' tidak valid.")
    
    input_df = pd.DataFrame([mapped_data], columns=FEATURE_ORDER)

    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1] 

    # Pengolahan Faktor Risiko
    risk_messages = []

    # 1. BP History
    if "Normal" not in data.get("riwayatTekananDarah", "Normal"):
        risk_messages.append(f"riwayat tekanan darah Anda mengacu pada {data.get('riwayatTekananDarah')}")

    # 2. Smoking Status
    if data.get("statusMerokok") == "Perokok aktif":
        risk_messages.append("Anda merupakan perokok aktif")

    # 3. Stress Score
    if float(data.get("tingkatStres", 0)) >= 7:
        risk_messages.append(f"tingkat stres mencapai skor {data.get('tingkatStres')}")

    # 4. Family History
    if data.get("riwayatKeluarga") == "Ada hipertensi":
        risk_messages.append("memiliki riwayat keluarga dengan hipertensi")

    # 5. BMI
    if float(data.get("bmi", 0)) >= 25.0:
        risk_messages.append(f"BMI mencapai {data.get('bmi')}")

    # 6. Usia (Hanya jika prediksi positif/1)
    if prediction == 1:
        # Membersihkan simbol agar lebih ramah dibaca
        usia_clean = data.get('usia').replace('≥', 'lebih dari').replace('–', ' hingga ')
        risk_messages.append(f"rentang usia {usia_clean}")

    status = "Terdeteksi Hipertensi" if prediction == 1 else "Tidak Terdeteksi Hipertensi"
    
    if prediction == 1:
        # Jika ada kasus yang Terdeteksi Hipertensi
        text_factor = "Hasil ini dipengaruhi oleh beberapa faktor yang terdeteksi, yaitu "
        if len(risk_messages) > 1:
            factor = text_factor + ", ".join(risk_messages[:-1]) + " dan " + risk_messages[-1] + "."
        elif len(risk_messages) == 1:
            factor = text_factor + risk_messages[0] + "."
        else:
            factor = "Hasil ini didasarkan pada kombinasi indikator kesehatan yang Anda masukkan."
    
    else:
        # Jika ada kasus Tidak Terdeteksi Hipertensi
        non_hypertension = "Berdasarkan data Anda, faktor kesehatan saat ini berada dalam rentang normal."
        
        if risk_messages:
            # Kasus yang Tidak Terdeteksi Hipertensi tapi memeliki beberapa faktor yang mengarah ke hipertensi
            warning = " Namun ada beberapa faktor yang perlu diwaspadai yaitu "
            if len(risk_messages) > 1:
                detail = ", ".join(risk_messages[:-1]) + " dan " + risk_messages[-1] + "."
            else:
                detail = risk_messages[0] + "."
            factor = non_hypertension + warning + detail
        else:
            # Normal tanpa faktor risiko yang mengarah ke hipertensi
            factor = non_hypertension

    guidelines = health_guidelines(data, int(prediction))

    return { 
        "status": status,      
        "probability": f"{round(float(probability) * 100, 1)}%",
        "factor_supporting": factor,
        "health_guidelines": guidelines
    }

def health_guidelines(data, prediction):
    health_messages = []
    
    # Kumpulkan tips spesifik untuk mengecek apakah ada faktor risiko
    specific_tips = []
    
    # 1. Panduan untuk BMI
    if float(data.get("bmi", 0)) >= 25.0:
        specific_tips.append("Usahakan untuk menurunkan berat badan ke rentang ideal melalui pola makan yang lebih seimbang.")

    # 2. Panduan untuk Merokok
    if data.get("statusMerokok") == "Perokok aktif":
        specific_tips.append("Sangat disarankan untuk mengurangi atau berhenti merokok agar mencegah kerusakan lebih lanjut pada pembuluh darah.")
        
    # 3. Panduan untuk Stres
    if float(data.get("tingkatStres", 0)) >= 7:
        specific_tips.append("Kelola stress Anda dengan melakukan kegiatan yang disukai atau melakukan meditasi.")

    # 4. Panduan untuk Olahraga
    if data.get("olahraga") in ["Tidak pernah", "1-2 kali per minggu"]:
        specific_tips.append("Mulailah melakukan aktivitas fisik ringan setiap hari untuk menjaga detak jantung tetap stabil.")

    # 5. Panduan untuk Waktu Tidur
    if data.get("waktuTidur") in ["< 5 jam", "5-6 jam"]:
        specific_tips.append("Pastikan tubuh mendapatkan istirahat yang cukup yaitu 7-8 jam per hari.")

    # Format Hasil Panduan Kesehatan
    if prediction == 1:
        # Jika Hipertensi Terdeteksi
        health_messages.append("Segera lakukan pemeriksaan tekanan darah secara medis dan konsultasikan hasil ini dengan dokter. Sambil menunggu jadwal konsultasi, Anda dapat melakukan beberapa langkah sederhana berikut untuk membantu menurunkan faktor risiko hipertensi:")
        health_messages.extend(specific_tips)
    else:
        # Jika Tidak Terdeteksi Hipertensi
        non_factor = ("Pertahankan gaya hidup sehat Anda dan lakukan pengecekan tekanan darah rutin secara mandiri.")
        
        # Menambahkan kalimat transisi (jika faktor risiko terdeteksi) yang mengarah untuk menyebutkan panduan kesehatan
        if specific_tips:
            combined_text = f"{non_factor} Selain itu, berikut beberapa kebiasaan baik yang perlu Anda jaga:"
            health_messages.append(combined_text)
            health_messages.extend(specific_tips)
        else:
             # Jika tidak ada faktor risiko sama sekali
            health_messages.append(non_factor)

    return health_messages