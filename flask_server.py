from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React Native

@app.route("/")
def home():
    return "✅ Flask server is running."

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        major = data.get("major")

        if not major:
            return jsonify({"error": "Major is required"}), 400

        print(f"Received major: {major}")

        # Run scrape.py with the selected major
        result = subprocess.run(
            ["python3", "scrape.py", major],
            capture_output=True,
            text=True,
            check=True
        )
        print("✅ scrape.py completed.")

        # Load the generated JSON file
        output_path = os.path.join("assets", "courses_by_semester.json")
        with open(output_path, "r", encoding="utf-8") as f:
            course_data = json.load(f)

        return jsonify(course_data)

    except subprocess.CalledProcessError as e:
        print("❌ Error running scrape.py:", e.stderr)
        return jsonify({"error": "Scrape failed", "details": e.stderr}), 500
    except Exception as e:
        print("❌ General error:", str(e))
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
