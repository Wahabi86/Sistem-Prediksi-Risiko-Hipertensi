from flask import Flask
from flask_cors import CORS
from app.routes.prediksi_routes import prediksi_routes

def create_app():
    app = Flask(__name__)
    CORS(app)

    # daftar route prediksi ML
    app.register_blueprint(prediksi_routes, url_prefix="/api")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
