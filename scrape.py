from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

major = input("Please enter your major: ").strip().lower()

# Function to get the URL for the selected major
def major_url(major_selected):
    if major_selected == "computer_science":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/CPS_BSCS/"
    elif major_selected == "business_admin":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGBUS/BAG_BABA/"
    elif major_selected == "psychology":  
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/PSY_BS_BS01/"
    elif major_selected == "biology":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/BIO_BA_BS/BIO_BS04/#modelsemesterplantext"
    elif major_selected == "mathematics":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/MAT_BA_BS/MAT_BS/"
    elif major_selected == "engineering":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/MCE_BSME/"
    elif major_selected == "english":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/EH_BA/"
    elif major_selected == "economics":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/ECO_BA/"
    elif major_selected == "political_science":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/POL_BA/"
    elif major_selected == "chemistry":
        return "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/CHY_BS/CHY_BS_BS/"
    




# Setup headless Chrome for less flashing, optional
chrome_options = Options()
chrome_options.add_argument("--headless=new")  # Remove this line if you want to see the browser

# Start Chrome driver
driver = webdriver.Chrome(options=chrome_options)

try:
    # Go to UF CISE BS catalog page
    url = major_url(major)

    driver.delete_all_cookies()
    driver.get(url)
    print("Opened URL:", driver.current_url)

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
