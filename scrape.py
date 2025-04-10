print("scrape.py started!")

# 🧠 IMPORTS
import sys
import io
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 🔧 Handle encoding for stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 🧪 Parse CLI Argument
if len(sys.argv) < 2:
    print("X Please provide a major.")
    exit()

major = sys.argv[1].strip().lower()
print(f"Scraping for major: {major}")

# 🔗 Get URL based on major
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

# ⚙️ Selenium Setup
chrome_options = Options()
chrome_options.add_argument("--headless=new")
driver = webdriver.Chrome(options=chrome_options)

try:
    url = major_url(major)
    if not url:
        print("Invalid major selected. Please try again.")
        exit()

    print("Opening URL:", url)
    driver.delete_all_cookies()
    driver.get(url)
    print("Opened URL:", driver.current_url)

    wait = WebDriverWait(driver, 10)
    model_plan_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@href='#modelsemesterplantextcontainer']")))
    model_plan_tab.click()
    print("Clicked 'Model Semester Plan' tab")

    model_plan_section = wait.until(EC.presence_of_element_located((By.ID, "modelsemesterplantextcontainer")))
    time.sleep(1)

    table = model_plan_section.find_element(By.TAG_NAME, "table")
    rows = table.find_elements(By.TAG_NAME, "tr")

    # 📘 Parse Table
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

        # ❌ Skip "Credits" rows
            if course_code.lower().startswith("credits") or course_name.lower().startswith("credits"):
                pass  # Skip processing this row

        # ✅ Append valid course data
            if current_semester:
                course_by_semester[current_semester].append([course_code, course_name, credits])



    print("\nCourses by Semester:")
    for semester, courses in course_by_semester.items():
        print(f"\n{semester}")
        for course in courses:
            print(f" - {course[0]} | {course[1]} | {course[2]} credits")

    # 💾 Write to file
    with open("assets/courses_by_semester.json", "w") as f:
        json.dump(course_by_semester, f, indent=2)
        print("Saved to assets/courses_by_semester.json")

except Exception as e:
    print(f"Error: {e}")

finally:
    driver.quit()
