import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
# Load variabel dari file .env lebih dulu
load_dotenv()
from app.extensions import db, jwt  # Import extensions
from app.routes.prediksi_routes import prediksi_routes
from app.routes.auth_routes import auth_routes # Import auth routes
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config["JSON_SORT_KEYS"] = False
    app.config.from_object(Config)
    
    # Hanya izinkan Frontend yang mengakses API ini
    frontend_url = os.getenv("FRONTEND_URL")
    CORS(app, resources={r"/api/*": {"origins": frontend_url}})

    # Inisialisasi Extensions
    db.init_app(app)
    jwt.init_app(app)

    # Daftar route
    app.register_blueprint(prediksi_routes, url_prefix="/api")
    app.register_blueprint(auth_routes, url_prefix="/api/auth") # Route Auth

    # Buat tabel database jika belum ada (untuk development)
    # with app.app_context():
    #     db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "False") == "True"
    port_num = int(os.getenv("FLASK_PORT", 5000))
    app.run(debug=debug_mode, port=port_num)