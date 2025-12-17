def map_form_input(data):

    AGE_MAPPING = {
        "< 20 tahun": 18,        
        "20–29 tahun": 25,
        "30–39 tahun": 35,
        "40–49 tahun": 45,
        "50–59 tahun": 55,
        "≥ 60 tahun": 65,
    }
    SLEEP_MAPPING = {
        "< 5 jam": 4.5,          
        "5–6 jam": 5.5,
        "7–8 jam": 7.5,
        "> 8 jam": 8.5,
    }
    BP_HISTORY_MAPPING = {
        "Normal (<120 / <80 mmHg)": "Normal",
        "Pra-hipertensi (120–139 / 80–89 mmHg)": "Prehypertension",
        "Hipertensi (140–159 / 90–99 mmHg)": "Hypertension",
    }
    FAMILY_HISTORY_MAPPING = {
        "Tidak ada": "No",
        "Ada hipertensi": "Yes",
    }
    EXERCISE_LEVEL_MAPPING = {
        "Tidak pernah": "Low",
        "1–2 kali per minggu": "Low", 
        "3–4 kali per minggu": "Moderate",
        "≥ 5 kali per minggu": "High",
    }
    SMOKING_MAPPING = {
        "Tidak merokok": "Non-Smoker",
        "Perokok aktif": "Smoker",
    }

    # Mengambil nilai dari data input
    usia_val = data.get("usia")
    waktu_tidur_val = data.get("waktuTidur")
    bp_history_val = data.get("riwayatTekananDarah")
    family_history_val = data.get("riwayatKeluarga")
    olahraga_val = data.get("olahraga")
    merokok_val = data.get("statusMerokok")

    return {
        "Age": AGE_MAPPING.get(usia_val, None),
        "Stress_Score": float(data.get("tingkatStres") or 0),
        "Sleep_Duration": SLEEP_MAPPING.get(waktu_tidur_val, None),
        "BMI": float(data.get("bmi") or 0.0),
        "BP_History": BP_HISTORY_MAPPING.get(bp_history_val, None),
        "Family_History": FAMILY_HISTORY_MAPPING.get(family_history_val, None),
        "Exercise_Level": EXERCISE_LEVEL_MAPPING.get(olahraga_val, None),
        "Smoking_Status": SMOKING_MAPPING.get(merokok_val, None),
    }