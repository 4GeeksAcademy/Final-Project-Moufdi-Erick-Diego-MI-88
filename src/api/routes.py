"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User, Business, Discount
from .utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests  # moufdi did this for the Formsubmit reply feature

# moufdi
from .services.google_maps_service import get_coordinates

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# moufdi did this for creating the contact messages table dynamically in the database


class ContactMessage(db.Model):
    __tablename__ = "contact_messages"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def handle_sign_up():
    body = request.json
    potential_user = db.session.execute(
        select(User).where(User.email == body["email"])
    ).scalar_one_or_none()
    if potential_user is not None:
        return jsonify({"msg": "user with that email already exist"}), 400
    new_user = User()
    new_user.email = body["email"]
    new_user.password = body["password"]
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "user was created"}), 201


@api.route("/business-signup", methods=["POST"])
def handle_business_sign_up():
    body = request.json
    potential_user = db.session.execute(
        select(User).where(User.email == body["email"])
    ).scalar_one_or_none()
    if potential_user is not None:
        return jsonify({"msg": "user with that email already exist"}), 400
    new_user = User()
    new_user.email = body["email"]
    new_user.password = body["password"]
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "user was created"}), 201


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
    address = request.args.get('address')
    return jsonify(get_coordinates(address))

# contact-us


@api.route('/contact-us', methods=['POST'])
def contact():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "No data received"}), 400
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    if not all([name, email, message]):
        return jsonify({"error": "Missing required fields"}), 400
    new_message = ContactMessage(name=name, email=email, message=message)
    db.session.add(new_message)
    db.session.commit()
    return jsonify({"success": True, "msg": "Message received"}), 200

# moufdi did this for creating the admin endpoint that fetches all messages from the database


@api.route('/admin/messages', methods=['GET'])
def get_admin_messages():
    messages = ContactMessage.query.order_by(ContactMessage.id.desc()).all()
    result = [
        {"id": m.id, "name": m.name, "email": m.email, "message": m.message}
        for m in messages
    ]
    return jsonify(result), 200

# moufdi did this for deleting a message from the database


@api.route('/admin/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    msg = ContactMessage.query.get(message_id)
    if not msg:
        return jsonify({"error": "Message not found"}), 404
    db.session.delete(msg)
    db.session.commit()
    return jsonify({"success": True, "msg": "Message deleted"}), 200

    # moufdi did this for sending a reply to the user for free via Formsubmit



