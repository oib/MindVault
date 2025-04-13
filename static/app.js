/*************************************************
 * MindVault - Random Credentials Starting Round *
 ************************************************/
let round = 2;
let waitTime = 10;
let inProgress = false;

let currentCredentials = {};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("submit-btn").onclick = submitCredentials;
  document.getElementById("help-btn").onclick = showHelpModal;
  document.getElementById("new-game-btn").onclick = startNewGame;

  loadHighScores();
  fetchInitialCredentials();
});

function fetchInitialCredentials() {
  fetch(`/generate/${round}`)
    .then(r => r.json())
    .then(creds => {
      currentCredentials = creds;

          fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: creds.username, password: creds.password, round})
          });
      feedback(`👤 ${creds.username}\n🔑 ${creds.password}\nMemorize & wait ${waitTime}s`, 'highlight');
      updatePlaceholders();

      startCountdown(waitTime, () => {
        feedback('🔑 Now type your NEW credentials!', 'highlight');
        clearInputs();
        document.getElementById('field1').focus();
      });
    });
}

function submitCredentials() {
  if (inProgress) return;
  const user = document.getElementById('field1').value;
  const pass = document.getElementById('field2').value;

  if (user.length !== round || pass.length !== round) {
    feedback(`❌ Enter exactly ${round} char(s)!`, 'failure');
    return;
  }

  inProgress = true;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username: user, password: pass, round})
  })
  .then(r => r.json())
  .then(data => {
    if (data.status === "success") {
      round++;
      waitTime++;

      fetch(`/generate/${round}`)
        .then(r => r.json())
        .then(creds => {
          currentCredentials = creds;
          fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: creds.username, password: creds.password, round})
          });

          feedback(`🎉 Success! ✅ Round ${round - 1} coming up...
👤 ${creds.username}
🔑 ${creds.password}
Memorize & wait ${waitTime}s`, 'highlight');

          startCountdown(waitTime, () => {
            feedback('🔑 Now type your NEW credentials!', 'highlight');
            clearInputs();
            document.getElementById('field1').focus();
            inProgress = false;
          });
        });

      updatePlaceholders();
      loadHighScores();
    } else {
      feedback('❌ Wrong credentials. Try again!', 'failure');
      inProgress = false;
    }
  });
}

function feedback(msg, status) {
  const el = document.getElementById('feedback');
  el.innerText = msg;
  el.className = status;
}

function startCountdown(sec, cb) {
  const c = document.getElementById('countdown');
  let t = sec;
  c.innerText = `⏳ ${t}s`;
  const iv = setInterval(() => {
    t--;
    c.innerText = `⏳ ${t}s`;
    if (t <= 0) {
      clearInterval(iv);
      c.innerText = '';
      cb();
    }
  }, 1000);
}

function clearInputs() {
  document.getElementById('field1').value = '';
  document.getElementById('field2').value = '';
}

function updatePlaceholders() {
  const f1 = document.getElementById('field1');
  const f2 = document.getElementById('field2');
  f1.placeholder = `👤 (${round} char${round>1?'s':''})`;
  f2.placeholder = `🔑 (${round} char${round>1?'s':''})`;
  f1.maxLength = round;
  f2.maxLength = round;
}

function loadHighScores() {
  fetch('/highscores')
    .then(r => r.json())
    .then(data => {
      const list = document.getElementById('score-list');
      list.innerHTML = '';
      data.highscores.forEach(([u, s]) => {
        const li = document.createElement('li');
        li.innerText = `${u} – Round ${s}`;
        list.appendChild(li);
      });
    });
}

function startNewGame() {
  round = 2;
  waitTime = 10;
  document.getElementById('round').innerText = round - 1;
  feedback(`🔄 New Game! Round 2, wait 10s`, 'highlight');
  clearInputs();
  updatePlaceholders();
  inProgress = false;

  fetch('/newgame', {method:'POST'})
    .then(r => r.json())
    .then(d => {
      if (d.status === "cleared") loadHighScores();
      fetchInitialCredentials();
    });
}

function showHelpModal() {
  document.getElementById('help-modal').classList.remove('hidden');
}
document.getElementById('close-modal').onclick = () => {
  document.getElementById('help-modal').classList.add('hidden');
};
window.onclick = (e) => {
  if (e.target.id === 'help-modal') {
    document.getElementById('help-modal').classList.add('hidden');
  }
};
window.onkeydown = (e) => {
  if (e.key === 'Escape') {
    document.getElementById('help-modal').classList.add('hidden');
  }
  if (e.key === 'Enter') {
    const modal = document.getElementById('help-modal');
    if (modal.classList.contains('hidden')) {
      document.getElementById("submit-btn").click();
    }
  }
};

