import { distance } from "./utils.js";

class ImpulseAggregator {
  constructor() {
    this.impulses = new Array();
  }

  addAcceleration(dx, dy) {
    this.impulses.push({'dx' : dx, 'dy' : dy});
  }

  resolveAcceleration() {
    let ax = 0;
    let ay = 0;
    this.impulses.forEach((impulse) => {
        ax += impulse.dx;
        ay += impulse.dy;
    });
    this.impulses.length = 0;
    return ({'ax' : ax, 'ay' : ay});
  }
}

class Planet {
  constructor(init) {
    this.name = init.name;
    this.radius = init.radius;
    this.x = init.dx;
    this.y = init.dy;
    this.mass = init.mass;
    this.fill = init.fill;
    this.outline = init.outline;
    this.vx = init.vx;
    this.vy = init.vy;
    this.ax = 0.0;
    this.ay = 0.0;
    this.aggregateAcceleration = new ImpulseAggregator()
  }

  // Change to getters and setters:
  getX() {
    return (this.x);
  };
  getY() {
    return (this.y);
  };
  setX(x) {
    this.x = x;
  };
  setY(y) {
    this.y = y;
  };
  setVx(vx) {
    this.vx = vx;
  }
  setVy(vy) {
    this.vy = vy;
  }
  setAx(ax) {
    this.ax = ax;
  }
  setAy(ay) {
    this.ay = ay;
  }

  // Methods
  draw(targetDrawContext, centerObject, screenOffsets) {
    var cox = centerObject.getX();
    var coy = centerObject.getY();

    targetDrawContext.beginPath();
    targetDrawContext.arc(this.x - cox + screenOffsets.dx, this.y - coy + screenOffsets.dy, this.radius, 0, 2 * Math.PI, false);
    targetDrawContext.fillStyle = this.fill;
    targetDrawContext.fill();
    targetDrawContext.lineWidth = 2;
    targetDrawContext.strokeStyle = this.outline;
    targetDrawContext.stroke();
  }

  tick() {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    this.ax = 0;
    this.ay = 0;
  }

  resolveAcceleration() {
    const resolvedAcceleration = this.aggregateAcceleration.resolveAcceleration();
    this.ax += resolvedAcceleration.ax;
    this.ay += resolvedAcceleration.ay;
  };

  // class (static) methods
  static computePhysics(obj1, obj2) {
    var d = distance(obj1, obj2);
    if (Math.abs(d) > 2.0) {
      const dx = obj1.x - obj2.x;
      const dy = obj1.y - obj2.y;
  
      const force = (obj1.mass + obj2.mass) / (d * d)
  
      const ax = (dx/d) * force;
      const ay = (dy/d) * force;
  
      const obj1MassRatio = obj1.mass / (obj1.mass + obj2.mass);
      const obj2MassRatio = obj2.mass / (obj1.mass + obj2.mass);
  
      obj1.aggregateAcceleration.addAcceleration(-ax * obj2MassRatio, -ay * obj2MassRatio);
      obj2.aggregateAcceleration.addAcceleration(ax * obj1MassRatio, ay * obj1MassRatio);
    }
    else {
      obj1.setVx(0);
      obj1.setVy(0);
      obj2.setVx(0);
      obj2.setVy(0);
    }
  }
}

export { Planet };
