def map_form_input(data):
    return {
        "age": data.get("usia"),
        "salt_intake": data.get("saltIntake"),  
        "stress_score": data.get("tingkatStres"),
        "sleep_duration": data.get("waktuTidur"),
        "bp_history": data.get("riwayatTekananDarah"),
        "family_history": data.get("riwayatKeluarga"),
        "exercise_level": data.get("olahraga"),
        "smoking_status": data.get("statusMerokok"),
        "medication": data.get("jenisObat"),
        "bmi": data.get("bmi"),
    }