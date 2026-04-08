let fish = [];
const userFishCount = {};
const userList = [];
const MAX_FISH_PER_USER = 3;

const SPEED = 0.75;
const dvd = {
    x: 80, y: 80,
    w: 120, h: 60,
    vx: SPEED, vy: SPEED,
    color: '#ff3c6e'
};
let fishCount = 0;
let statusText = 'TANK ACTIVE';
let statusTimer = 0;