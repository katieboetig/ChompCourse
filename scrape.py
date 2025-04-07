from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json

# Setup headless Chrome for less flashing, optional
chrome_options = Options()
chrome_options.add_argument("--headless=new")  # Remove this line if you want to see the browser

# Start Chrome driver
driver = webdriver.Chrome(options=chrome_options)

try:
    # Go to UF CISE BS catalog page
    url = "https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/CPS_BSCS/"
    driver.get(url)

    # Wait until the model semester plan tab is visible and click it
    wait = WebDriverWait(driver, 10)
    model_plan_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@href='#modelsemesterplantextcontainer']")))
    model_plan_tab.click()
    print("✅ Clicked 'Model Semester Plan' tab")

    # Wait for the section to load and be visible
    model_plan_section = wait.until(EC.presence_of_element_located((By.ID, "modelsemesterplantextcontainer")))
    time.sleep(1)

    # Find the table inside the section
    table = model_plan_section.find_element(By.TAG_NAME, "table")
    rows = table.find_elements(By.TAG_NAME, "tr")




    course_by_semester = {}
    current_semester = None

    print("\n📋 Model Semester Plan:")
    for row in rows:
    # Check if the row is a semester header
        header_cells = row.find_elements(By.TAG_NAME, "th")
        if header_cells:
            semester_name = " ".join(cell.text.strip() for cell in header_cells)
            print(f"\n {semester_name}")
            current_semester = semester_name
            course_by_semester[current_semester] = []
            continue
        cells = row.find_elements(By.TAG_NAME, "td")
        if len(cells) == 3:
            course_code = cells[0].text.strip()
            course_name = cells[1].text.strip()
            credits = cells[2].text.strip()
        elif len(cells) == 2:
            course_code = ""  # or "N/A"
            course_name = cells[0].text.strip()
            credits = cells[1].text.strip()
        else:
            continue
        course_by_semester[current_semester].append([course_code, course_name, credits])

    # Otherwise, print the course details in the row
        cells = row.find_elements(By.TAG_NAME, "td")
        if cells:
            text = " | ".join(cell.text.strip() for cell in cells)
            print(text)

    print("\n📚 Courses by Semester:")
    for semester, courses in course_by_semester.items():
        print(f"\n🗓️ {semester}")
        for course in courses:
            print(f" - {course[0]} | {course[1]} | {course[2]} credits")

    with open("courses_by_semester.json", "w") as f:
        json.dump(course_by_semester, f, indent=2)

except Exception as e:
    print(f" Error: {e}")

finally:
    driver.quit()
