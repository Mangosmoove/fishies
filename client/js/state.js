const fish = [];

const SPEED = 1.25;
const dvd = {
    x: 80, y: 80,
    w: 120, h: 60,
    vx: SPEED, vy: SPEED,
    color: '#ff3c6e'
};
let fishCount = 0;
let statusText = 'TANK ACTIVE';
let statusTimer = 0;

function setStatus(text, duration = 120) { // duration in frames
    statusText = text;
    statusTimer = duration;
}