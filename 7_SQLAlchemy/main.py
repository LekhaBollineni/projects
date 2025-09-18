from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate")
def generate_numbers():
    first_five = random.sample(range(1, 70), 5)
    last_num = random.randint(1, 26)
    print(f"Generated numbers: {first_five + [last_num]}")
    return {"numbers": first_five + [last_num]}
