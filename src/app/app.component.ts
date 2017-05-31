import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  rotation = 0;

  startTouchPosX;
  startTouchPosY;

  touchstart(event) {
    console.log('TouchStart',event);
    this.startTouchPosX = event.changedTouches[0].clientX;
    this.startTouchPosY = event.changedTouches[0].clientY;

  }
  touchend(event) {
    console.log('TouchEnd',event);
    this.rotation = this.startTouchPosX - event.changedTouches[0].clientX;
  }
  touchmove(event) {
    console.log('TouchMove',event);
    this.rotation = this.startTouchPosX - event.changedTouches[0].clientX;
  }
}
