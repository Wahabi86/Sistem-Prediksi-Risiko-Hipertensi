# be-hipertensi/app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash

auth_routes = Blueprint('auth_routes', __name__)

# POST Register
@auth_routes.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print(f"\n[DEBUG] Menerima Data Register: {data}") # Cek apa yang dikirim Frontend

        # 1. Cek Kelengkapan Data
        if not data:
            print("[ERROR] Data JSON kosong atau Header Content-Type salah")
            return jsonify({"msg": "Data tidak ditemukan"}), 400
        
        if not data.get('email'):
            print("[ERROR] Email kosong")
            return jsonify({"msg": "Email wajib diisi"}), 400
            
        if not data.get('password'):
            print("[ERROR] Password kosong")
            return jsonify({"msg": "Password wajib diisi"}), 400

        # 2. Cek Email Duplikat
        if User.query.filter_by(email=data['email']).first():
            print(f"[ERROR] Email {data['email']} sudah terdaftar di Database!")
            return jsonify({"msg": "Email sudah terdaftar"}), 400

        # 3. Proses Simpan
        new_user = User(
            name=data.get('name'),
            email=data.get('email'),
            gender=data.get('gender')
        )
        new_user.set_password(data['password'])

        db.session.add(new_user)
        db.session.commit()
        print(f"[SUKSES] User baru berhasil dibuat: {data['email']}\n")
        return jsonify({"msg": "Registrasi berhasil"}), 201

    except Exception as e:
        print(f"[CRITICAL ERROR] Terjadi kesalahan sistem: {str(e)}")
        db.session.rollback()
        return jsonify({"msg": f"Error: {str(e)}"}), 500
    
# POST Login
@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data.get('email')).first()

    if user and user.check_password(data.get('password')):
        # Buat token JWT
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "msg": "Login berhasil",
            "access_token": access_token,
            "user": {
                "name": user.name,
                "email": user.email
            }
        }), 200
    
    return jsonify({"msg": "Email atau password salah"}), 401

# --- GET USER PROFILE (GET) ---
@auth_routes.route('/me', methods=['GET'])
@jwt_required()
def get_profile():
    # Mengambil ID user dari token JWT
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User tidak ditemukan"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "gender": user.gender
    }), 200

# --- UPDATE PROFILE (PUT) ---
@auth_routes.route('/me', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User tidak ditemukan"}), 404

    data = request.get_json()

    # Update field yang dikirim saja
    if 'name' in data:
        user.name = data['name']
    if 'gender' in data:
        user.gender = data['gender']
    
    # Khusus update password (harus di-hash ulang)
    if 'password' in data and data['password']:
        user.set_password(data['password'])

    try:
        db.session.commit()
        return jsonify({
            "msg": "Profil berhasil diperbarui",
            "user": {
                "name": user.name,
                "email": user.email,
                "gender": user.gender
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Gagal update profil"}), 500

# --- DELETE ACCOUNT (DELETE) ---
@auth_routes.route('/me', methods=['DELETE'])
@jwt_required()
def delete_account():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User tidak ditemukan"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "Akun berhasil dihapus"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Gagal menghapus akun"}), 500