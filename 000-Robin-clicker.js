const robin = document.getElementById("robin");
const coinsEl = document.getElementById("coins");
const damageEl = document.getElementById("damage");
const hpEl = document.getElementById("hp");
const maxHpEl = document.getElementById("maxHp");
const hpBar = document.getElementById("hpBar");
const message = document.getElementById("message");

const stickBtn = document.getElementById("stickBtn");
const swordBtn = document.getElementById("swordBtn");
const laserBtn = document.getElementById("laserBtn");

const fahSound = document.getElementById("fahSound");

let coins = 0;
let damage = 1;
let maxHp = 20;
let hp = maxHp;

function updateUI() {
  coinsEl.textContent = coins;
  damageEl.textContent = damage;
  hpEl.textContent = hp;
  maxHpEl.textContent = maxHp;

  const percent = (hp / maxHp) * 100;
  hpBar.style.width = percent + "%";

  if (percent > 60) {
    hpBar.style.background = "limegreen";
  } else if (percent > 30) {
    hpBar.style.background = "orange";
  } else {
    hpBar.style.background = "red";
  }
}

function playFahFah() {
  if (!fahSound) {
    console.log("No audio element found");
    return;
  }

  fahSound.pause();
  fahSound.currentTime = 0;

  fahSound.play().then(() => {
    console.log("sound played");
  }).catch((error) => {
    console.log("play error:", error);
  });
}

function createFloatingText(x, y, text) {
  const pop = document.createElement("div");
  pop.classList.add("floating-text");
  pop.textContent = text;
  pop.style.left = x + "px";
  pop.style.top = y + "px";
  document.body.appendChild(pop);

  setTimeout(() => {
    pop.remove();
  }, 800);
}

function defeatRobin() {
  coins += 10;
  message.textContent = "Robin defeated! +10 coins";
  updateUI();

  setTimeout(() => {
    maxHp += 10;
    hp = maxHp;
    message.textContent = "A stronger robin appeared!";
    updateUI();
  }, 700);
}

robin.addEventListener("click", (e) => {
  if (hp <= 0) return;

  hp -= damage;
  if (hp < 0) {
    hp = 0;
  }

  coins += damage;

  playFahFah();
  createFloatingText(e.pageX, e.pageY, `-${damage}`);

  if (hp === 0) {
    defeatRobin();
  } else {
    message.textContent = "You hit the robin!";
    updateUI();
  }
});

stickBtn.addEventListener("click", () => {
  if (coins >= 10) {
    coins -= 10;
    damage += 1;
    message.textContent = "You bought a Stick!";
    updateUI();
  } else {
    message.textContent = "Not enough coins for Stick.";
  }
});

swordBtn.addEventListener("click", () => {
  if (coins >= 50) {
    coins -= 50;
    damage += 5;
    message.textContent = "You bought a Sword!";
    updateUI();
  } else {
    message.textContent = "Not enough coins for Sword.";
  }
});

laserBtn.addEventListener("click", () => {
  if (coins >= 200) {
    coins -= 200;
    damage += 20;
    message.textContent = "You bought a Laser!";
    updateUI();
  } else {
    message.textContent = "Not enough coins for Laser.";
  }
});

updateUI();
