export class Adsr {
  attack = 0.0;
  decay = 0.0;
  sustain = 1.0;
  release = 0.0;

  output: ConstantSourceNode;

  constructor(private context: AudioContext) {
    this.output = context.createConstantSource();
    this.output.offset.value = 0.0;
    this.output.start();
  }

  public triggerOn() {
    this.output.offset.cancelScheduledValues(this.context.currentTime);
    this.output.offset.setValueAtTime(0, this.context.currentTime);
    this.output.offset.linearRampToValueAtTime(1, this.context.currentTime + this.attack / 1000.0);
    this.output.offset.linearRampToValueAtTime(
      this.sustain,
      this.context.currentTime + this.attack / 1000.0 + this.decay / 1000.0
    );
  }

  public triggerOff() {
    this.output.offset.cancelAndHoldAtTime(this.context.currentTime);
    this.output.offset.linearRampToValueAtTime(0, this.context.currentTime + this.release / 1000.0);
  }
}
