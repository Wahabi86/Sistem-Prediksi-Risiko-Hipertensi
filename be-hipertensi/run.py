from app import create_app
import os
from dotenv import load_dotenv

# Mengambil variabel konfigurasi dari file .env
load_dotenv()
# Memanggil fungsi create_app() untuk membangun objek aplikasi Flask.
app = create_app()

# Entry point aplikasi
if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "False") == "True"
    port_num = int(os.getenv("FLASK_PORT", 5000))
    app.run(debug=debug_mode, port=port_num)