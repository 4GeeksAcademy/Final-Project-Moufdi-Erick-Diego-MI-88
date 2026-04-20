from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User, Business, Discount, ContactMessage
from .utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
from werkzeug.utils import secure_filename
from .services.google_maps_service import get_coordinates

api = Blueprint('api', __name__)
CORS(api)


@api.route("/signup", methods=["POST"])
def handle_sign_up():
    body = request.json

    potential_user = db.session.execute(
        select(User).where(User.email == body["email"])
    ).scalar_one_or_none()

    if potential_user is not None:
        return jsonify({"msg": "user with that email already exist"}), 400

    new_user = User()
    new_user.first_name = body["first_name"]
    new_user.last_name = body["last_name"]
    new_user.email = body["email"]
    new_user.password = body["password"]
    new_user.is_active = True
    new_user.phone = body.get("phone")
    new_user.city = body.get("city")
    new_user.date_of_birth = body.get("date_of_birth")
    new_user.security_question = body["security_question"]
    new_user.security_answer = body["security_answer"]

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "user was created"}), 201


@api.route("/business-signup", methods=["POST"])
def handle_business_sign_up():
    body = request.json

    potential_business = db.session.execute(
        select(Business).where(Business.email == body["email"])
    ).scalar_one_or_none()

    if potential_business is not None:
        return jsonify({"msg": "business with that email already exist"}), 400

    new_business = Business()
    new_business.business_name = body["business_name"]
    new_business.business_phone_number = body["phone"]
    new_business.business_address = body["address"]
    new_business.website = body.get("website")
    new_business.services = body.get("services")
    new_business.business_description = body["business_description"]
    new_business.type_of_business = body["type_of_business"]
    new_business.email = body["email"]
    new_business.password = body["password"]
    new_business.security_question = body["security_question"]
    new_business.security_answer = body["security_answer"]

    db.session.add(new_business)
    db.session.commit()

    return jsonify({
        "msg": "business was created",
        "business_id": new_business.id
    }), 201


@api.route("/login", methods=["POST"])
def create_token():
    body = request.json

    user = User.query.filter_by(email=body["email"]).first()
    if user and user.password == body["password"]:
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "token": access_token,
            "user_id": user.id,
            "business_id": user.business_id
        }), 200

    business = Business.query.filter_by(email=body["email"]).first()
    if business and business.password == body["password"]:
        access_token = create_access_token(identity=str(business.id))
        return jsonify({
            "token": access_token,
            "user_id": None,
            "business_id": business.id
        }), 200

    return jsonify({"msg": "Bad email or password"}), 401


@api.route("/forgot-password/question", methods=["POST"])
def get_security_question():
    body = request.json

    user = User.query.filter_by(email=body["email"]).first()
    if user:
        return jsonify({
            "type": "user",
            "security_question": user.security_question
        }), 200

    business = Business.query.filter_by(email=body["email"]).first()
    if business:
        return jsonify({
            "type": "business",
            "security_question": business.security_question
        }), 200

    return jsonify({"msg": "Email not found"}), 404


@api.route("/reset-password", methods=["PUT"])
def reset_password():
    body = request.get_json()

    user = User.query.filter_by(email=body["email"]).first()
    if user:
        if user.security_answer != body["security_answer"]:
            return jsonify({"msg": "Wrong answer"}), 401

        user.password = body["new_password"]
        db.session.commit()
        return jsonify({"msg": "Password updated"}), 200

    business = Business.query.filter_by(email=body["email"]).first()
    if business:
        if business.security_answer != body["security_answer"]:
            return jsonify({"msg": "Wrong answer"}), 401

        business.password = body["new_password"]
        db.session.commit()
        return jsonify({"msg": "Password updated"}), 200

    return jsonify({"msg": "User or business not found"}), 404


@api.route("/business/<int:business_id>", methods=["GET"])
def get_business(business_id):
    business = Business.query.get(business_id)
    if not business:
        return jsonify({"msg": "Business not found"}), 404
    return jsonify(business.serialize()), 200


@api.route("/business/<int:business_id>", methods=["PUT"])
def update_business(business_id):
    business = Business.query.get(business_id)

    if not business:
        return jsonify({"msg": "Business not found"}), 404

    body = request.get_json()

    business.business_name = body["business_name"]
    business.business_address = body["business_address"]
    business.business_phone_number = body["business_phone_number"]
    business.business_description = body["business_description"]
    business.type_of_business = body["type_of_business"]

    db.session.commit()

    return jsonify(business.serialize()), 200


@api.route("/business/<int:business_id>/upload-image", methods=["POST"])
def upload_business_image(business_id):
    business = Business.query.get(business_id)

    if not business:
        return jsonify({"msg": "Business not found"}), 404

    if "image" not in request.files:
        return jsonify({"msg": "No image file provided"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"msg": "No selected file"}), 400

    upload_folder = os.path.join(
        os.path.dirname(__file__), "../static/uploads")
    os.makedirs(upload_folder, exist_ok=True)

    filename = secure_filename(image.filename)
    image_path = os.path.join(upload_folder, filename)
    image.save(image_path)

    business.business_image = filename
    db.session.commit()

    return jsonify(business.serialize()), 200


@api.route("/user/<int:user_id>", methods=["DELETE"])
def delete_user_profile(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted"}), 200


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


@api.route('/geocode', methods=['GET'])
def geocode():
    address = request.args.get('address')
    return jsonify(get_coordinates(address))


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


@api.route('/admin/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    msg = ContactMessage.query.get(message_id)
    if not msg:
        return jsonify({"error": "Message not found"}), 404
    db.session.delete(msg)
    db.session.commit()
    return jsonify({"success": True, "msg": "Message deleted"}), 200


@api.route('/admin/messages', methods=['GET'])
def get_admin_messages():
    messages = ContactMessage.query.order_by(ContactMessage.id.desc()).all()
    result = [
        {"id": m.id, "name": m.name, "email": m.email, "message": m.message}
        for m in messages
    ]
    return jsonify(result), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.serialize()), 200


@api.route("/businesses", methods=["GET"])
def get_all_businesses():
    all_businesses = Business.query.all()
    return jsonify([business.serialize() for business in all_businesses]), 200
