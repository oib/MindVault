from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
import bcrypt
import os
import random
import string

app = FastAPI()

# File paths
CREDENTIAL_FILE = 'credentials.txt'
HIGHSCORE_FILE = 'highscores.txt'

# Serve frontend
@app.get("/")
async def root():
    return FileResponse("static/index.html")

# Handle new credentials submission
@app.post("/submit")
async def submit_credentials(request: Request):
    data = await request.json()
    username = data['username']
    password = data['password']
    round_number = data['round']
    combined = f"{username}:{password}".encode()

    hashed = bcrypt.hashpw(combined, bcrypt.gensalt())

    # Write hashed credentials
    with open(CREDENTIAL_FILE, 'w') as f:
        f.write(hashed.decode())

    return JSONResponse({"status": "saved"})

# Handle login attempts
@app.post("/login")
async def login(request: Request):
    data = await request.json()
    username = data['username']
    password = data['password']
    round_number = data['round']
    combined = f"{username}:{password}".encode()

    with open(CREDENTIAL_FILE, 'r') as f:
        stored_hash = f.read().encode()

    if bcrypt.checkpw(combined, stored_hash):
        update_highscores(username, round_number)
        return JSONResponse({"status": "success"})
    else:
        return JSONResponse({"status": "failure"})

# Retrieve highscores
@app.get("/highscores")
async def get_highscores():
    scores = []
    if os.path.exists(HIGHSCORE_FILE):
        with open(HIGHSCORE_FILE, 'r') as f:
            scores = [line.strip().split(',') for line in f.readlines()]
    return JSONResponse({"highscores": scores})

# Update and maintain highscores
def update_highscores(username, round_number):
    scores = []
    if os.path.exists(HIGHSCORE_FILE):
        with open(HIGHSCORE_FILE, 'r') as f:
            scores = [line.strip().split(',') for line in f.readlines()]

    scores.append([username, str(round_number)])
    scores.sort(key=lambda x: int(x[1]), reverse=True)
    scores = scores[:10]  # Keep only top 10

    with open(HIGHSCORE_FILE, 'w') as f:
        for name, score in scores:
            f.write(f"{name},{score}\n")

@app.get("/generate/{length}")
async def generate_credentials(length: int):
    chars = string.ascii_lowercase + string.digits
    username = ''.join(random.choice(chars) for _ in range(length))
    password = ''.join(random.choice(chars) for _ in range(length))
    return {"username": username, "password": password}

# Static file handling (CSS, JS)
from fastapi.staticfiles import StaticFiles
app.mount("/", StaticFiles(directory="static", html=True), name="static")

