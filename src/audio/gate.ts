export class Gate {
  output: ConstantSourceNode;

  constructor(private context: AudioContext) {
    this.output = context.createConstantSource();
    this.output.offset.value = 0.0;
    this.output.start();
  }

  public triggerOn() {
    this.output.offset.setValueAtTime(1, this.context.currentTime);
  }

  public triggerOff() {
    this.output.offset.setValueAtTime(0, this.context.currentTime);
  }
}
