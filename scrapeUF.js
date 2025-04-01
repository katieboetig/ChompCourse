const puppeteer = require('puppeteer');

async function scrapeModelSemesterPlan() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/CSC_BS/#modelsemesterplantext";
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Optional screenshot to debug
  await page.screenshot({ path: 'debug.png', fullPage: true });

  try {
    // 🔄 Click the tab manually to activate the content
    await page.click('#modelsemesterplantexttab');

// 🟩 Wait for the correct container (not #modelsemesterplantext)
await page.waitForSelector('#modelsemesterplantextcontainer', { timeout: 10000 });

// 🟦 Extract text from the real container
const text = await page.$eval('#modelsemesterplantextcontainer', el => el.innerText);


    console.log('\n📘 Model Semester Plan:\n');
    console.log(text);
  } catch (err) {
    console.error('❌ Still could not get model semester plan:', err);
  }

  await browser.close();
}

scrapeModelSemesterPlan();
