from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route("/scrape", methods=["POST"])
def run_scrape():
    try:
        data = request.json
        major = data.get("major")
        if not major:
            return jsonify({"error": "Missing major"}), 400

        result = subprocess.run(
            ["python", "scrape.py", major],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            return jsonify({
                "error": "Scraper failed",
                "details": result.stderr
            }), 500

        return jsonify({"message": "Scraping successful!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
