from dotenv import load_dotenv
import os

load_dotenv()
BROWSER = os.getenv("BROWSER", "chrome")