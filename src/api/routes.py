"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User, Business, Discount
from .utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



# moufdi
from .services.google_maps_service import get_coordinates

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def handle_sign_up():
    body = request.json #{"email":----, and "password":----}

    #checking the data base to make sure  that email is already used
    potential_user = db.session.execute(
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

@api.route("/business-signup", methods=["POST"])
def handle_business_sign_up():
    body = request.json #{"email":----, and "password":----}

    #checking the data base to make sure  that email is already used
    potential_user = db.session.execute(
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
        email=body["email"], password=body["password"]
    ).first()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "token": access_token,
        "user_id": user.id,
        "email": user.email
    }), 200

@api.route("/business/<int:business_id>", methods=["GET"])
def get_business(business_id):
    business = Business.query.get(business_id)
    if not business:
        return jsonify({"msg": "Business not found"}), 404
    return jsonify(business.serialize()), 200

@api.route("/business/<int:business_id>/discounts", methods=["GET"])
def get_business_discounts(business_id):
    discounts = Discount.query.filter_by(business_id=business_id).all()
    return jsonify([discount.serialize() for discount in discounts]), 200


@api.route("/business/<int:business_id>/discounts", methods=["POST"])
def create_discount(business_id):
    body = request.get_json()

    new_discount = Discount(
        discount_title=body["discount_title"],
        description=body["description"],
        percentage_rate=body["percentage_rate"],
        business_id=business_id
    )

    db.session.add(new_discount)
    db.session.commit()

    return jsonify(new_discount.serialize()), 201

# moufdi added this


@api.route('/geocode', methods=['GET'])
def geocode():
    address = request.args.get('address')  # gets the address from URL query
    # calls your service and returns JSON
    return jsonify(get_coordinates(address))

# contact-us
@api.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    print("Received:", name, email, message)

    return jsonify({"success": True}), 200