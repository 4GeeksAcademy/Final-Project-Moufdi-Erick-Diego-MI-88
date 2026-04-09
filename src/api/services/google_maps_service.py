import os  # Built-in module to read environment variables.
import requests  # Third-party library to make HTTP requests.
from dotenv import load_dotenv  # Function to read .env file.

load_dotenv()  # Loads variables from .env into the environment.
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")  # Fetches your API key.
BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json"  # Google's endpoint.

def get_coordinates(address):
    if not address or not address.strip():  # Fails fast if address is empty or just spaces.
        return {"success": False, "error": "No address provided."}
    if not API_KEY:  # Fails fast if the API key is missing from .env.
        return {"success": False, "error": "API key not configured."}
    
    try:  # Starts block to catch network errors.
        response = requests.get(BASE_URL, params={"address": address, "key": API_KEY}, timeout=10)  # Sends GET request to Google.
        response.raise_for_status()  # Raises an error if HTTP status is 4xx or 5xx.
        data = response.json()  # Converts Google's JSON response into a Python dictionary.
    except requests.exceptions.RequestException as e:  # Catches any network/request errors.
        return {"success": False, "error": f"Request failed: {str(e)}"}

    if data.get("status") != "OK":  # Checks if Google actually found the address.
        return {"success": False, "error": f"Geocoding failed: {data.get('status', 'Unknown')}"}
    
    location = data["results"][0]["geometry"]["location"]  # Navigates the nested dictionary to find lat/lng.
    
    return {  # Returns the successful result.
        "success": True,
        "lat": location.get("lat"),  # Extracts latitude.
        "lng": location.get("lng"),  # Extracts longitude.
        "formatted_address": data["results"][0].get("formatted_address", "")  # Extracts Google's cleaned-up address.
    }

if __name__ == "__main__":  # Runs ONLY when you execute this file directly (not when imported by Flask).
    print(get_coordinates("1600 Amphitheatre Parkway, Mountain View, CA"))  # Quick test with Google's HQ.