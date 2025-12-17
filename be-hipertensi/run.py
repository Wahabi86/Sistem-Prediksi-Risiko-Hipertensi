import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.routes.prediksi_routes import prediksi_routes

# Load variabel dari file .env
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Hanya izinkan Frontend yang mengakses API ini
    frontend_url = os.getenv("FRONTEND_URL")
    CORS(app, resources={r"/api/*": {"origins": frontend_url}})

    # Konfigurasi aplikasi
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "default-secret-key")

    # Daftar route
    app.register_blueprint(prediksi_routes, url_prefix="/api")

    return app

app = create_app()

if __name__ == "__main__":
    # Mengambil value dari .env
    debug_mode = os.getenv("FLASK_DEBUG", "False") == "True"
    port_num = int(os.getenv("FLASK_PORT", 5000))
    
    app.run(debug=debug_mode, port=port_num)