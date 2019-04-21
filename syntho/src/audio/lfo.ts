export class LFO {
  oscillator: OscillatorNode;
  amp: GainNode;

  set type(value: OscillatorType) {
    this.oscillator.type = value;
  }
  get type() {
    return this.oscillator.type;
  }

  set frequency(value: number) {
    this.oscillator.frequency.value = value;
  }
  get frequency() {
    return this.oscillator.frequency.value;
  }

  constructor(private context: AudioContext) {
    this.oscillator = context.createOscillator();
    this.oscillator.type = 'triangle';
    this.oscillator.frequency.value = 0;
    this.oscillator.start();

    this.amp = this.context.createGain();
    this.amp.gain.value = 0;
    this.oscillator.connect(this.amp);
  }
}
