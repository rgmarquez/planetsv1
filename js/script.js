/**
 * A VERY simple planetary motion simulator in JavaScript.
 * It simulates one massive body (the sun), 5 planetary bodies, and one semi-massive
 * "nemesis" dark star.
 * I made this simulator purly to learn some elementary canvas drawing techniques, as well
 * as to see what crazy things can happen to orbits due to planetary interactions.
 * @author Richard "Greg" Marquez (aka G-Money)
 * @license MIT
 */

import { Planet } from "./modules/planet.js";
import { clearScreen, resizeCanvas } from "./modules/utils.js";

window.requestAnimFrame = function (callback) {
  window.setTimeout(callback, 1000 / 100);
};
window.requestAnimFrame = window.requestAnimationFrame;

var winHeight = $(window).height();
var winWidth = $(window).width();

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
clearScreen(canvas, context);
let centerOfScreen = resizeCanvas(canvas, context);

var jupiterToSunMassRatio = 0.00095479194;
var saturnToSunMassRatio = jupiterToSunMassRatio * 0.3;
var earthToSunMassRatio = 0.00000300348959632;
var marsToSunMassRatio = 0.107 * earthToSunMassRatio;
var nemesisToSunMassRatio = 0.04;
var initialSunMass = 150;

const starSystemInit = [
  {
    name: "sun",
    fill: "yellow",
    outline: "orange",
    radius: 18.0,
    mass: initialSunMass,
    dx: 0.0,
    dy: -0.0,
    vx: 0.0,
    vy: 0.0,
  },
  {
    name: "venus",
    fill: "white",
    outline: "green",
    radius: 2.0,
    mass: earthToSunMassRatio * initialSunMass,
    dx: 0.0,
    dy: 30.0,
    vx: 2.1,
    vy: 0.0,
  },
  {
    name: "earth",
    fill: "white",
    outline: "blue",
    radius: 2.0,
    mass: earthToSunMassRatio * initialSunMass,
    dx: 0.0,
    dy: 60.0,
    vx: 1.55,
    vy: 0.0,
  },
  {
    name: "mars",
    fill: "white",
    outline: "darkred",
    radius: 2.0,
    mass: marsToSunMassRatio * initialSunMass,
    dx: 0.0,
    dy: 100.0,
    vx: 1.2,
    vy: 0.0,
  },
  {
    name: "jupiter",
    fill: "yellow",
    outline: "orange",
    radius: 4.0,
    mass: jupiterToSunMassRatio * initialSunMass,
    dx: 0.0,
    dy: -250.0,
    vx: -0.75,
    vy: 0.0,
  },
  {
    name: "saturn",
    fill: "orange",
    outline: "yellow",
    radius: 3.0,
    mass: saturnToSunMassRatio * initialSunMass,
    dx: 0.0,
    dy: -350.0,
    vx: -0.65,
    vy: 0.0,
  },
  {
    name: "nemesis",
    fill: "black",
    outline: "red",
    radius: 7.0,
    mass: nemesisToSunMassRatio * initialSunMass,
    dx: -725.0,
    dy: 0.0,
    vx: 0.0,
    vy: 0.4,
  },
];

const starSystem = starSystemInit.map((x) => new Planet(x));
starSystem.centerReferenceObject = starSystem.find((x) => x.name === "sun");

function tick() {
  requestAnimFrame(tick);

  for (let times = 0; times < 4; ++times) {
    starSystem.forEach(function (starSystemObject) {
      starSystemObject.tick();
      starSystemObject.draw(
        context,
        starSystem.centerReferenceObject,
        centerOfScreen
      );
    });

    const numberOfBodies = starSystem.length;
    if (numberOfBodies) {
      for (var i = 0; i < numberOfBodies - 1; ++i) {
        for (var j = i + 1; j < numberOfBodies; ++j) {
          Planet.computePhysics(starSystem[i], starSystem[j]);
        }
      }
    }

    starSystem.forEach(function (starSystemObject) {
      starSystemObject.resolveAcceleration();
    });
  }
}

export function planetCanvasResize() {
  resizeCanvas(canvas, context);
}

$(document).ready(function () {
  tick();
});
