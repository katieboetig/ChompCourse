from flask import Flask, request, jsonify
import subprocess
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")  # Store this in .env or set manually for now
# For production, consider using a more secure method to manage your API keys.

app = Flask(__name__)

@app.route("/scrape", methods=["POST"])
def run_scrape():
    try:
        data = request.get_json()
        major = data.get("major")
        if not major:
            return jsonify({"error": "Missing major"}), 400

        result = subprocess.run(
            ["python", "scrape.py", major],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            return jsonify({"error": "Scrape failed", "details": result.stderr}), 500

        return jsonify({"message": "Scraping successful!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generate", methods=["POST"])
def generate_schedule():
    try:
        data = request.get_json()
        preferences = data.get("preferences", {})
        taken_courses = data.get("takenCourses", [])
        remaining_courses = data.get("remainingCourses", [])

        credits = preferences.get("credits", "unspecified")
        available_semesters = preferences.get("availableSemesters", "unspecified")
        grad_semester = preferences.get("gradSemester", "unspecified")

        prompt = f"""
        I am a university student creating a course schedule.

        Here is what you need to know:
        - I want to take around {credits} credits per semester.
        - I am available to enroll during these semesters: {available_semesters}.
        - I plan to graduate by: {grad_semester}.
        - I have already taken these courses: {taken_courses}
        - I still need to complete the following courses: {remaining_courses}

        Please generate a semester-by-semester schedule that:
        - Includes ONLY the remaining courses
        - Does not exceed my credit limit per semester
        - Fits within the available semesters and graduation deadline

        Make sure the plan is realistic based on credit limits. Organize it like this:

        Fall 2025:
        - COURSE_CODE Course Name (X credits)

        Spring 2026:
        - COURSE_CODE Course Name (X credits)

        End the schedule at or before {grad_semester}.

        Return your response as a **JSON object** like this:

        {{
          "Fall 2025": [["COP3502", "Programming Fundamentals 1", 3]],
          "Spring 2026": [["COP3503", "Programming Fundamentals 2", 3]]
        }}
        """

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an academic advisor."},
                {"role": "user", "content": prompt}
            ]
        )

        result = response["choices"][0]["message"]["content"]

        try:
            parsed = json.loads(result)
            return jsonify({"schedule": parsed})
        except json.JSONDecodeError:
            # fallback to plain string if GPT doesn't return valid JSON
            return jsonify({"schedule": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
