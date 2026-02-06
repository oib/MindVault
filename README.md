# 🧠 MindVault 🔐

A memory challenge game where players must remember and recall randomly generated credentials. Perfect for kids and adults to train their memory!

## 🎮 How to Play

1. You'll be shown a username and password combination
2. Memorize them during the countdown
3. After the wait time, re-enter the exact credentials
4. Success advances you to the next round with more characters!
5. Try to achieve the highest round possible!

## ✨ Features

- Progressive difficulty (starts at 2 characters, increases each round)
- Kid-friendly interface with emojis and animations
- Dark/Light theme toggle
- Top 10 leaderboard
- Responsive design for all devices
- Secure password storage (bcrypt hashing)

## 🚀 Quick Start

### Option 1: Manual Setup

```bash
# Clone the repository
git clone <repository-url>
cd mindvault

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn bcrypt

# Run the game
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Option 2: Systemd Service (Recommended)

```bash
# Run the setup script
sudo ./setup.sh

# The game will start automatically and be available at http://localhost:8000

# Control the service:
sudo systemctl start mindvault    # Start
sudo systemctl stop mindvault     # Stop
sudo systemctl restart mindvault  # Restart
```

## 📁 Project Structure

```
mindvault/
├── main.py              # FastAPI backend
├── static/
│   ├── index.html       # Main game page
│   ├── style.css        # Light theme styles
│   ├── style-dark.css   # Dark theme styles
│   ├── app.js           # Game logic
│   └── favicon.svg      # Brain icon
├── docs/
│   └── structure.md     # Detailed documentation
├── LICENSE              # MIT License
├── mindvault.service    # Systemd service file
└── setup.sh             # Installation script
```

## 🎨 Themes

The game includes two themes:
- **Light Mode**: Clean and bright interface
- **Dark Mode**: Kid-friendly dark theme with purple and gold accents

Toggle between themes using the 🌙/☀️ button!

## 🛡️ Security

- All passwords are hashed using bcrypt
- No sensitive data is exposed to the client
- Credentials are generated server-side

## 📊 Game Mechanics

- Round 1: 2 characters, 10 seconds wait
- Round 2: 3 characters, 11 seconds wait
- Round N: N+1 characters, N+9 seconds wait

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

Found a bug? Please open an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior

## 🌟 Star

If you enjoy this game, please give it a star on GitHub!
