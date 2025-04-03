from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

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

    course_map = {}  # Dictionary to store course information

    print("\n📋 Model Semester Plan:")
    for row in rows:
        cells = row.find_elements(By.TAG_NAME, "td")
        if len(cells) >= 3:  # Ensure there are enough columns to parse
            course_code = cells[0].text.strip()
            course_name = cells[1].text.strip()
            credits = cells[2].text.strip()

            if course_code:
                course_map[course_code] = [course_name, credits]

    print("\n📋 Model Semester Plan:")
    for row in rows:
        cells = row.find_elements(By.TAG_NAME, "td")
        if cells:
            text = " | ".join(cell.text.strip() for cell in cells)
            print(text)

except Exception as e:
    print(f"❌ Error: {e}")

finally:
    driver.quit()
