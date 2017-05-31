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

  constructor() {
    this.handleMomentum();
  }

  start(event) {
    this.startTouchPosX = event.changedTouches[0].clientX;
    this.startTouchPosY = event.changedTouches[0].clientY;
    this.startAngle = this.getAngleOfTouch(this.startTouchPosX, this.startTouchPosY)
    this.rotationMomentum = 0;
  }
  end(event) {
    this.rotationOffset = this.rotation;
    let angle = this.getAngleOfTouch(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    this.rotationMomentum = angle - this.startAngle;
    this.handleMomentum();
  }
  move(event) {
    let angle = this.getAngleOfTouch(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    this.setRotation(angle - this.startAngle);
  }
  setRotation(angle) {
    this.rotation = angle + this.rotationOffset;
  }


  getAngleOfTouch(touchX, touchY) {
    const { height: height, width: width, top: top, left: left } = document.getElementById('spinner').getBoundingClientRect();
    const [centerX, centerY] = [width / 2 + left, height / 2 + top];
    const angle = Math.atan2(touchY - centerY, touchX - centerX) * 180 / Math.PI;
    return angle;
  }

  /**
   * Animation-frame based rendering of momentum. I understand this doesn't match real physics yet
   */
  handleMomentum = () => {
    this.rotation += this.rotationMomentum;
    this.rotationMomentum = this.rotationMomentum * 0.95;
    if(this.rotationMomentum < 10) {
      this.rotationMomentum = 0;
    } else {
      requestAnimationFrame(this.handleMomentum);
    }
  }
}
