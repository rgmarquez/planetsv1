import { Planet } from "./modules/planet.js";
import { clearScreen, resizeCanvas } from "./modules/utils.js";

var jupiterToSunMassRatio = 0.00095479194;
var earthToSunMassRatio = 0.00000300348959632;
var marsToSunMassRatio = 0.107 * earthToSunMassRatio;
var nemesisToSunMassRatio = 0.05;
var initialSunMass = 150;

var sunInit = {'name' : 'sun', 'fill' : 'yellow', 'outline' : 'orange', 'radius' : 18.0, 'mass' : initialSunMass,'dx' : 0.0, 'dy' : -0.00, 'vx' : 0.0, 'vy' : 0.0};
var earthInit = {'name' : 'earth', 'fill' : 'white', 'outline' : 'blue', 'radius' : 2.0, 'mass' : earthToSunMassRatio * initialSunMass, 'dx' : 0.0, 'dy' : 60.0, 'vx' : 1.55, 'vy' : 0.0};
var marsInit = {'name' : 'mars', 'fill' : 'red', 'outline' : 'darkred', 'radius' : 2.0, 'mass' : marsToSunMassRatio * initialSunMass, 'dx' : 0.0, 'dy' : 100.0, 'vx' : 1.20, 'vy' : 0.0};
var planetXInit = {'name' : 'planet-x', 'fill' : 'yellow', 'outline' : 'orange', 'radius' : 4.0, 'mass' : jupiterToSunMassRatio * initialSunMass,'dx' : 0.0, 'dy' : -250.0, 'vx' : -0.75, 'vy' : 0.0};
var nemesisInit = {'name' : 'nemesis', 'fill' : 'black', 'outline' : 'red', 'radius' : 7.0, 'mass' : nemesisToSunMassRatio * initialSunMass, 'dx' : -725.0, 'dy' : 0.0, 'vx' : 0.10, 'vy' : 0.27};

window.requestAnimFrame = window.requestAnimationFrame

var winHeight = $(window).height();
var winWidth = $(window).width();

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
clearScreen(canvas, context);
let centerOfScreen = resizeCanvas(canvas, context);

const sun = new Planet(sunInit);
const earth = new Planet(earthInit);
const mars = new Planet(marsInit);
const planetX = new Planet(planetXInit);
const nemesis = new Planet(nemesisInit);
const solarSystem = [sun, earth, mars, planetX, nemesis];
solarSystem.centerReferenceObject = sun;

function tick(starSystem) {
  requestAnimFrame(tick);

  solarSystem.forEach( function(starSystemBody) {
    starSystemBody.tick();
    starSystemBody.draw(context, solarSystem.centerReferenceObject, centerOfScreen);
  });

  var numberOfBodies = solarSystem.length;
  for (var i = 0; i < (numberOfBodies - 2); ++i) {
    for (var j = i + 1; j < numberOfBodies; ++j) {
      Planet.computePhysics(solarSystem[i], solarSystem[j]);
    }
  }
  solarSystem.forEach( function(starSystemBody) {
    starSystemBody.resolveAcceleration();
  });
}

$( document ).ready(function() {
  tick(solarSystem);
});
