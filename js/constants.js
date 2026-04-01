const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gravitySlider = document.getElementById("gravity");
canvas.width = 1000;
canvas.height = 1000;

const friction = 0.975;

let gravity = 0;

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
};