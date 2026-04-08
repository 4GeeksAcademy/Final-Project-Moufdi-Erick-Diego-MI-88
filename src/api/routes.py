"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User
from .utils import generate_sitemap, APIException
from flask_cors import CORS


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

# moufdi added this


@api.route('/geocode', methods=['GET'])
def geocode():
    address = request.args.get('address')  # gets the address from URL query
    # calls your service and returns JSON
    return jsonify(get_coordinates(address))
