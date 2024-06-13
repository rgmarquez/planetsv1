/**
 * Misc. utilitiy functions.
 * @author Richard "Greg" Marquez (aka G-Money)
 * @license MIT
 */

// Calculate the square of a number (number ^ 2)
function power2(num) {
  return num * num;
}

// Calculate the distance between two planetary bodies
function distance(body1, body2) {
  var dx = body1.x - body2.x;
  var dy = body1.y - body2.y;
  return Math.sqrt(power2(dx) + power2(dy));
}

function clearScreen(canvas, context) {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas(canvas, context) {
  if (typeof canvas !== "undefined") {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (typeof context !== "undefined") {
      clearScreen(canvas, context);
    } else {
      console.log("Can't clear screen, context is undefined");
    }
  } else {
    console.log("Can't clear screen, canvas is undefined");
  }
  return { dx: canvas.width / 2, dy: canvas.height / 2 };
}

export { distance, clearScreen, resizeCanvas };
