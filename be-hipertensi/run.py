# be-hipertensi/run.py
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.extensions import db, jwt  # Import extensions
from app.routes.prediksi_routes import prediksi_routes
from app.routes.auth_routes import auth_routes # Import auth routes

# Load variabel dari file .env
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Hanya izinkan Frontend yang mengakses API ini
    frontend_url = os.getenv("FRONTEND_URL")
    CORS(app, resources={r"/api/*": {"origins": frontend_url}})

    # Konfigurasi aplikasi
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "default-secret-key")
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "jwt-secret-key") # Kunci JWT
    
    # Konfigurasi Database (Contoh MySQL, sesuaikan dengan .env Anda)
    # Format: mysql+pymysql://user:password@host/db_name
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///db_hipertensi.sqlite")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inisialisasi Extensions
    db.init_app(app)
    jwt.init_app(app)

    # Daftar route
    app.register_blueprint(prediksi_routes, url_prefix="/api")
    app.register_blueprint(auth_routes, url_prefix="/api/auth") # Route Auth

    # Buat tabel database jika belum ada (untuk development)
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "False") == "True"
    port_num = int(os.getenv("FLASK_PORT", 5000))
    app.run(debug=debug_mode, port=port_num)