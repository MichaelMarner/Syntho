export enum KeyboardPriority {
  low,
  high
}

export interface Callback {
  (note: number): void;
}

export class PhysicalKeyboard {
  scanner = new Array<number>(12).fill(0);
  priority: KeyboardPriority = KeyboardPriority.high;
  keyEvent: Callback;
  triggerEvent: Callback;

  constructor(params: { keyEvent: Callback; triggerEvent: Callback }) {
    this.keyEvent = params.keyEvent;
    this.triggerEvent = params.triggerEvent;
    document.addEventListener('keydown', event => this.keydown(event));
    document.addEventListener('keyup', event => this.keyup(event));
  }

  keydown(e) {
    let toTrigger = !this.isKeyDown();
    let note = this.getNoteFromKeyCode(e.keyCode);

    if (note >= 0) {
      this.scanner[note] = 1;
      this.keyEvent(this.getActiveNote());
      if (toTrigger) {
        this.triggerEvent(1);
      }
    }
  }

  keyup(e) {
    let note = this.getNoteFromKeyCode(e.keyCode);
    if (note >= 0) {
      this.scanner[note] = 0;
    }
    let active = this.getActiveNote();
    if (active > -1) {
      this.keyEvent(active);
    }
    if (!this.isKeyDown()) {
      this.triggerEvent(0);
    }
  }

  isKeyDown() {
    return this.getActiveNote() >= 0;
  }

  getActiveNote() {
    if ((this.priority = KeyboardPriority.low)) {
      for (let i = 0; i < this.scanner.length; i++) {
        if (this.scanner[i] == 1) return i;
      }
    } else {
      for (let i = this.scanner.length - 1; i >= 0; i--) {
        if (this.scanner[i] == 1) return i;
      }
    }
    return -1;
  }

  getNoteFromKeyCode(keyCode) {
    // prettier-ignore
    switch (keyCode) {
      case 67: return 0;
      case 70: return 1;
      case 86: return 2;
      case 71: return 3;
      case 66: return 4;
      case 78: return 5;
      case 74: return 6;
      case 77: return 7;
      case 75: return 8;
      case 188: return 9;
      case 76: return 10;
      case 190: return 11;
      case 191: return 12;
      default: return -1;
    }
  }
}
