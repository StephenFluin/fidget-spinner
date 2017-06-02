import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  /**
   * The physical rotation of the spinner at a given time.
   */
  rotation = 0;
  /**
   * How far from starting point we are. Used only when handling
   */
  rotationOffset = 0;
  rotationMomentum = 0;

  startTouchPosX;
  startTouchPosY;
  startAngle;

  momentumTimeout;
  holding = false;

  spins = JSON.parse(localStorage['spins'] || '0');
  spinInteger = 0;

  time: number;

  constructor() {
    this.handleMomentum();
  }

  start(event) {
    this.startTouchPosX = this.getEventX(event);
    this.startTouchPosY = this.getEventY(event);

    this.startAngle = this.getAngleOfTouch(this.startTouchPosX, this.startTouchPosY)
    this.rotationMomentum = 0;
    this.holding = true;
  }
  end(event) {
    let angle = this.getAngleOfTouch(this.getEventX(event), this.getEventY(event));
    this.rotationOffset = this.rotation;
    this.rotationMomentum = (angle - this.startAngle) / 2;
    this.handleMomentum();
    this.holding = false;
    localStorage['spins'] = JSON.stringify(this.spins);
  }
  move(event) {
    if (this.holding) {
      let angle = this.getAngleOfTouch(this.getEventX(event), this.getEventY(event));
      this.setRotation(angle - this.startAngle);
    }
  }
  setRotation(angle) {
    this.rotation = angle + this.rotationOffset;
  }

  getEventX(event) {
    if (event instanceof PointerEvent) {
      return event.clientX;
    } else {
      return event.changedTouches[0].clientX;
    }
  }
  getEventY(event) {
    if (event instanceof PointerEvent) {
      return event.clientY;
    } else {
      return event.changedTouches[0].clientY;
    }
  }


  getAngleOfTouch(touchX, touchY) {
    const { height: height, width: width, top: top, left: left } = document.getElementById('spinner').getBoundingClientRect();
    const [centerX, centerY] = [width / 2 + left, height / 2 + top];
    const angle = Math.atan2(touchY - centerY, touchX - centerX) * 180 / Math.PI;
    return angle;
  }


  /**
   * Animation-frame based rendering of momentum.
   */
  handleMomentum = () => {
    this.rotation += this.rotationMomentum;
    this.spins += Math.abs(this.rotationMomentum / 360);
    this.spinInteger = Math.round(this.spins);

    const now = Date.now();
    const deltaTime = now - (this.time || now);
    this.time = now;

    // Calcule eponential decay based on true spinner timings
    let original = this.rotationMomentum;
    const decay = Math.pow(Math.E, -.00007 * deltaTime);
    this.rotationMomentum = this.rotationMomentum * decay;



    if (Math.abs(this.rotationMomentum) < .25) {
      this.rotationMomentum = 0;
    } else {
      requestAnimationFrame(this.handleMomentum);
    }
  }
}
