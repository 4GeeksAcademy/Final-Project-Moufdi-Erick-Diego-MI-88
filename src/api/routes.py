"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/Signup", methods=["POST"])
def handel_sign_up():
    body = request.json #{"email":----, and "password":----}

    #checking the data base to make sure  that email is already used
    potential_user = db.setion.execute(
        select(User).where(User.email == body["email"])
    ).scalar_one_or_none()
    if potential_user is not None:
        return jsonify({"msg": "user with that email already exist"}), 400

    # creating the user oobject
    new_user = User()
    new_user.email = body["email"]
    new_user.password = body["password"]
    new_user.is_active = True


    # adding user to the date base
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg":"user was created"}), 201

@api.route("/login", methods=["POST"])
def create_token():
    body = request.json
    user = User.query.filter_by(
        email = body["email"], password=body["password"]).first()
    
    
    # we try to find the user based on the provided info
    user = User.query.filter_by(
        email=body["email"], password=body["password"].first()
    )

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(idnetity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id, "email": user.email}), 200
