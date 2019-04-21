export class VCO {
  oscillator: OscillatorNode;
  octave: number = 3;
  amp: GainNode;
  lfoHookup: GainNode;

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

  set detune(value: number) {
    this.oscillator.detune.value = value;
  }
  get detune() {
    return this.oscillator.detune.value;
  }

  set gain(value: number) {
    this.amp.gain.value = value;
  }
  get gain() {
    return this.amp.gain.value;
  }

  constructor(private context: AudioContext) {
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = 'sawtooth';
    this.oscillator.frequency.value = 440;
    this.oscillator.detune.value = 0;
    this.oscillator.start();

    this.amp = this.context.createGain();
    this.amp.gain.value = 1;

    this.lfoHookup = this.context.createGain();
    this.lfoHookup.gain.value = 0;
    this.lfoHookup.connect(this.oscillator.frequency);

    this.oscillator.connect(this.amp);
  }
}
