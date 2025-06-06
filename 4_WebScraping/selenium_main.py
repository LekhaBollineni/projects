from dotenv import load_dotenv
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Set up the Selenium WebDriver based on the environment variable

load_dotenv()
BROWSER = os.getenv("BROWSER", "chrome")

if BROWSER.lower() == "chrome":
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode for scraping
    chrome_options.add_argument("--disable-gpu")  # Disable GPU for headless mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--log-level=3")  # Suppress logs for cleaner output

    # Set up the Chrome WebDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)


#get the URL from user input or environment variable
URL = input("Enter the URL to scrape (or press Enter to use the default): ").strip()

# Open the URL in the browser
driver.get(URL)

#Scrape the page title and print it
page_title = driver.title
print(f"Page Title: {page_title}")

# Scrape the page content (for demonstration, we will get the first paragraph)
first_quote = driver.find_element(By.TAG_NAME, "span").get_attribute("innerText")
first_author = driver.find_element(By.TAG_NAME, "small").get_attribute("innerText")
print(f"First quote: {first_quote}")    
print(f"First author: {first_author}")

# Scrape all quotes on the page


# Close the browser after scraping
driver.quit()