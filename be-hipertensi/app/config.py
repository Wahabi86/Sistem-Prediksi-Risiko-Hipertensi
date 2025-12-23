import os

class Config:
# Konfigurasi aplikasi
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key")
    
    # Konfigurasi Database
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///db_hipertensi.sqlite"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False