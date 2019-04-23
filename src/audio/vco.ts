export class Vco {
  private oscillator: OscillatorNode;
  octave: number = 3;
  private amp: GainNode;
  private mod: GainNode;

  get modIn(): GainNode {
    return this.mod;
  }

  set type(value: OscillatorType) {
    this.oscillator.type = value;
  }
  get type() {
    return this.oscillator.type;
  }

  set frequency(value: number) {
    this.oscillator.frequency.setValueAtTime(value, this.context.currentTime);
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

  set lfoMod(value: boolean) {
    if (value) {
      this.modIn.gain.value = 1.0;
    } else {
      this.modIn.gain.value = 0;
    }
  }

  get lfoMod(): boolean {
    return this.modIn.gain.value === 1.0;
  }

  get output(): AudioNode {
    return this.amp;
  }

  constructor(private context: AudioContext) {
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = 'sawtooth';
    this.oscillator.frequency.value = 440;
    this.oscillator.detune.value = 0;
    this.oscillator.start();

    this.amp = this.context.createGain();
    this.amp.gain.value = 1;

    this.mod = this.context.createGain();
    this.mod.gain.value = 0;
    this.mod.connect(this.oscillator.frequency);

    this.oscillator.connect(this.amp);
  }
}
