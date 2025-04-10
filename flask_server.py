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
        print("🔍 Full received data:", data)

        major = data.get("major")
        preferences = data.get("preferences", {})
        taken_courses = data.get("takenCourses", [])
        remaining_courses = data.get("remainingCourses", [])

        if not major:
            return jsonify({"error": "Major is required"}), 400

        print(f"🧠 Major: {major}")
        print(f"🎯 Preferences: {preferences}")
        print(f"✅ Taken Courses: {len(taken_courses)}")
        print(f"📚 Remaining Courses: {len(remaining_courses)}")

        # Example: Run scrape.py with the major as argument (optional)
        result = subprocess.run(
            ["python3", "scrape.py", major],
            capture_output=True,
            text=True,
            check=True
        )
        print("✅ scrape.py completed.")

        # Example: read the output JSON file from scrape.py
        output_path = os.path.join("assets", "courses_by_semester.json")
        with open(output_path, "r", encoding="utf-8") as f:
            scraped_data = json.load(f)

        # ⬇️ Replace this with actual scheduling logic
        # For now, return a mocked schedule
        mock_schedule = [
            {
                "semester": "Fall 2025",
                "courses": ["CS101 - Intro to CS", "MATH201 - Calculus I"]
            },
            {
                "semester": "Spring 2026",
                "courses": ["CS102 - Data Structures", "ENGL101 - Writing I"]
            }
        ]

        return jsonify({"schedule": mock_schedule})

    except subprocess.CalledProcessError as e:
        print("❌ Error running scrape.py:", e.stderr)
        return jsonify({"error": "Scrape failed", "details": e.stderr}), 500
    except Exception as e:
        print("❌ General error:", str(e))
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
