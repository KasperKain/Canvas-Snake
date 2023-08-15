import ButtonDisplayHandler from "./scripts/ButtonDisplayHandler.js";
import Controller from "./scripts/Controller.js";
import GameScene from "./scripts/GameScene.js";
import Settings from "./scripts/Settings.js";
import SplashScene from "./scripts/SplashScene.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = Settings.gameWidth;
canvas.height = Settings.gameHeight;

//Initial game screen before starting
ctx.fillStyle = "#828a63";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.font = "13px 'Press Start 2P', cursive";
ctx.textAlign = "center";
ctx.fillText("PRESS SPACEBAR", canvas.width / 2, canvas.height / 2);

const buttonDisplayHandler = new ButtonDisplayHandler();

const controller = new Controller();

function startGame() {
  const gameScene = new GameScene(controller);
}

let splashSceneStarted = false;

window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !splashSceneStarted) {
    splashSceneStarted = true;

    // Start with the splash screen and use startGame as a callback
    const splashScene = new SplashScene(startGame);
  }

  if (e.code === "KeyD") {
    debugMenu.style.display =
      debugMenu.style.display == "none" || debugMenu.style.display == ""
        ? "block"
        : "none";
  }
});

//  DEBUG CODE
// Why isn't this in it's own class? Cause I'm lazy, that's why

const debugOptions = [
  {
    name: "SFX Volume",
    type: "range",
    value: Settings.sfxVolume,
    id: "sfx-volume",
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: "Animation Steps",
    type: "range",
    value: Settings.animationTime,
    id: "animation-time",
    min: 0,
    max: 20,
    step: 1,
  },
  {
    name: "Game Steps",
    type: "range",
    value: Settings.gameTime,
    id: "game-time",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: "Sun Glare",
    type: "range",
    value: Settings.sunGlare,
    id: "sun-glare",
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: "Debug Mode",
    type: "checkbox",
    value: Settings.debugMode,
    id: "debug-mode",
  },
];

// Function to create HTML for each control
function createControl(option) {
  switch (option.type) {
    case "range":
      return `
        <label for="${option.id}">${option.name}:</label>
        <input type="range" id="${option.id}" name="${option.id}" min="${option.min}" max="${option.max}" step="${option.step}" value="${option.value}">
        <span id="${option.id}-value">${option.value}</span>
        <br>
      `;
    case "checkbox":
      return `
      <br>
        <label for="${option.id}">${option.name}:</label>
        <input type="checkbox" id="${option.id}" name="${option.id}" ${
        option.value ? "checked" : ""
      }>
        <br>
      `;
  }
}

// Generate the debug menu
const debugMenu = document.getElementById("debug-menu");
debugOptions.forEach((option) => {
  debugMenu.innerHTML += createControl(option);
});

// Attach event listeners for the controls
document.getElementById("sun-glare").addEventListener("input", (e) => {
  Settings.sunGlare = e.target.value;
});

document.getElementById("sfx-volume").addEventListener("input", (e) => {
  Settings.sfxVolume = e.target.value;
});

document.getElementById("animation-time").addEventListener("input", (e) => {
  Settings.animationTime = e.target.value;
});

document.getElementById("game-time").addEventListener("input", (e) => {
  Settings.gameTime = e.target.value;
});

document.getElementById("debug-mode").addEventListener("change", (e) => {
  Settings.debugMode = e.target.checked;
});

function attachRangeInputHandler(id) {
  document.getElementById(id).addEventListener("input", (e) => {
    const value = e.target.value;
    Settings[id.replace("-", "")] = value;
    document.getElementById(id + "-value").innerText = value;
  });
}

attachRangeInputHandler("sun-glare");
attachRangeInputHandler("sfx-volume");
attachRangeInputHandler("animation-time");
attachRangeInputHandler("game-time");
