# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route("/generate", methods=["POST"])
# def generate_schedule():
#     data = request.get_json()
#     preferences = data.get("preferences", {})
#     remaining_courses = data.get("remainingCourses", [])

#     # 🧠 You would insert your call to OpenAI here.
#     # But for now, let's just mock a response:
#     mock_schedule = {
#         "semester_1": remaining_courses[:3],  # pretend we picked 3
#         "semester_2": remaining_courses[3:6],
#     }

#     return jsonify({
#         "message": "Schedule generated successfully!",
#         "suggestedSchedule": mock_schedule
#     })

# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0")