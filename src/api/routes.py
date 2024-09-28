"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restx import Api, Resource, fields  # Importa Flask-RESTX

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

bcrypt = Bcrypt()

# Inicializa la API con Flask-RESTX
api_restx = Api(api, version='1.0', title='API de Usuarios',
                description='Documentación de API para la gestión de usuarios')

# Define el modelo de Usuario para la documentación de Swagger
user_model = api_restx.model('User', {
    'username': fields.String(required=True, description='Nombre de usuario'),
    'email': fields.String(required=True, description='Correo electrónico'),
    'password': fields.String(required=True, description='Contraseña')
})

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))

    # Verifica que el email esté presente
    if not email:
        return jsonify({"error": "El campo email no puede estar vacío"}), 400

    new_user = User(name=name, email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado con éxito"})

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user= email), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Note: To properly logout, you should handle token invalidation on the client side
    # by removing the token from storage (e.g., localStorage).
    # On the server side, you could implement a token blacklist for added security.
    return jsonify({"msg": "Logout successful"}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200