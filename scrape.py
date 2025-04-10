print("✅ scrape.py started!")

# 🧠 IMPORTS
import sys
import io
import time
import json
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 🔧 Ensure UTF-8 encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 🧪 Check for major argument
if len(sys.argv) < 2:
    print("❌ Please provide a major.")
    exit()

major = sys.argv[1].strip().lower()
print(f"🎓 Scraping for major: {major}")

# 🔗 URL lookup by major
def major_url(major_selected):
    urls = {
        "computer_science": "https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/CPS_BSCS/",
        "business_admin": "https://catalog.ufl.edu/UGRD/colleges-schools/UGBUS/BAG_BABA/",
        "psychology": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/PSY_BS_BS01/",
        "biology": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/BIO_BA_BS/BIO_BS04/#modelsemesterplantext",
        "mathematics": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/MAT_BA_BS/MAT_BS/",
        "engineering": "https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/MCE_BSME/",
        "english": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/EH_BA/",
        "economics": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/ECO_BA/",
        "political_science": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/POL_BA/",
        "chemistry": "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/CHY_BS/CHY_BS_BS/"
    }
    return urls.get(major_selected)

# ⚙️ Setup Selenium WebDriver
chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=chrome_options)

try:
    url = major_url(major)
    if not url:
        print("❌ Invalid major selected. Please try again.")
        exit()

    print(f"🌐 Opening URL: {url}")
    driver.get(url)

    wait = WebDriverWait(driver, 10)
    model_plan_tab = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//a[@href='#modelsemesterplantextcontainer']"))
    )
    model_plan_tab.click()
    print("🧩 Clicked 'Model Semester Plan' tab")

    model_plan_section = wait.until(
        EC.presence_of_element_located((By.ID, "modelsemesterplantextcontainer"))
    )
    time.sleep(1)

    table = model_plan_section.find_element(By.TAG_NAME, "table")
    rows = table.find_elements(By.TAG_NAME, "tr")

    # 📘 Parse Course Table
    course_by_semester = {}
    current_semester = None

    for row in rows:
        header_cells = row.find_elements(By.TAG_NAME, "th")
        if header_cells:
            current_semester = " ".join(cell.text.strip() for cell in header_cells)
            course_by_semester[current_semester] = []
            continue

        cells = row.find_elements(By.TAG_NAME, "td")
        if len(cells) >= 1:
            course_code = cells[0].text.strip() if len(cells) > 0 else ""
            course_name = cells[1].text.strip() if len(cells) > 1 else ""
            credits = cells[2].text.strip() if len(cells) > 2 else ""

            if course_code.lower().startswith("credits") or course_name.lower().startswith("credits"):
                continue

            if current_semester:
                course_by_semester[current_semester].append([course_code, course_name, credits])

    # 🖨️ Output scraped data to terminal
    print("\n📦 Courses by Semester:")
    for semester, courses in course_by_semester.items():
        print(f"\n📚 {semester}")
        for course in courses:
            print(f" - {course[0]} | {course[1]} | {course[2]} credits")

    # 💾 Save to JSON
    print("\n💾 Preparing to save JSON file...")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(base_dir, "assets", "courses_by_semester.json")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # 🗑️ Delete existing file if it exists
    if os.path.isfile(output_path):
        try:
            os.remove(output_path)
            print("🗑️ Old file deleted successfully.")
        except Exception as e:
            print(f"❌ Failed to delete old file: {e}")
    else:
        print("📂 No existing file to delete.")

    # ✍️ Write the new file
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(course_by_semester, f, indent=2, ensure_ascii=False)
            print(f"✅ New JSON saved to {output_path}")
    except Exception as e:
        print(f"❌ Failed to write new JSON file: {e}")

except Exception as e:
    print(f"❌ Scraping failed: {e}")

finally:
    driver.quit()
    print("🚪 Selenium driver closed.")
