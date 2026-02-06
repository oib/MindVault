# MindVault Game Structure

## Overview
MindVault is a memory challenge game where players must remember and recall randomly generated credentials. The game progressively increases in difficulty by adding more characters and longer wait times.

## Game Concept
- Players are shown randomly generated username and password combinations
- They must memorize these credentials for a specific duration
- After the wait time, they must correctly re-enter the credentials
- Successful completion advances the player to the next round with increased difficulty
- The game tracks high scores for competitive play

## Technical Architecture

### Backend (FastAPI)
- **File**: `main.py`
- **Framework**: FastAPI with Python
- **Dependencies**:
  - `fastapi` - Web framework
  - `bcrypt` - Password hashing
  - `uvicorn` - ASGI server (for deployment)

### API Endpoints
1. **GET /** - Serves the main game page
2. **POST /submit** - Stores initial credentials
3. **POST /login** - Validates login attempts
4. **GET /highscores** - Retrieves top 10 scores
5. **GET /generate/{length}** - Generates random credentials

### Frontend
- **HTML**: `static/index.html` - Main game interface
- **CSS**: `static/style.css` - Styling and animations
- **JavaScript**: `static/app.js` - Game logic and interactions

### Data Storage
- **credentials.txt** - Hashed storage of current round credentials
- **highscores.txt** - Top 10 player scores (username,round)

## Game Flow
1. Game starts at round 2 with 10-second wait time
2. Server generates random credentials (username + password)
3. Player memorizes credentials during wait time
4. Player re-enters credentials when prompted
5. Successful login advances to next round (+1 char, +1 second wait)
6. Failed login ends the game and records score

## Difficulty Progression
- **Round 2**: 2 characters, 10 seconds wait
- **Round 3**: 3 characters, 11 seconds wait
- **Round N**: N characters, (N+8) seconds wait

## Security Features
- Passwords are hashed using bcrypt before storage
- No sensitive data is exposed to the client
- Credentials are generated server-side only

## Deployment
- Designed for systemd service deployment
- Static files served from `/static` directory
- State maintained through text files (easy backup)

## Kid-Friendly Features
- Emoji-based UI elements
- Simple, intuitive interface
- No complex text instructions
- Visual feedback for all actions
- Progressive difficulty suitable for all ages
