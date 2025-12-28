from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt
from app.config import Config
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Hanya izinkan Frontend yang mengakses API ini
    CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONTEND_URL")}})
    # Inisialisasi extensions
    db.init_app(app)
    jwt.init_app(app)

    # Import dan daftarkan blueprint di dalam fungsi untuk menghindari circular import
    from app.routes.prediksi_routes import prediksi_routes
    from app.routes.auth_routes import auth_routes
    
    # Daftar route
    app.register_blueprint(prediksi_routes, url_prefix="/api")
    app.register_blueprint(auth_routes, url_prefix="/api/auth")

    return app