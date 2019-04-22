export class Lpf {
  private filter: BiquadFilterNode;
  private _cutOff: number;
  private mod: GainNode;
  mode: 'fixed' | 'adsr' | 'lfo' = 'fixed';

  get modIn(): GainNode {
    return this.mod;
  }

  reset() {
    this.filter.frequency.cancelScheduledValues(this.context.currentTime);
    this.filter.frequency.setValueAtTime(this._cutOff, this.context.currentTime);
  }

  set cutOff(value: number) {
    this.filter.frequency.setValueAtTime(value, this.context.currentTime);
    this._cutOff = value;
  }

  get cutOff() {
    return this._cutOff;
  }

  get peak() {
    return this.filter.Q.value;
  }
  set peak(value: number) {
    this.filter.Q.value = value;
  }

  get frequency(): AudioParam {
    return this.filter.frequency;
  }

  get input(): AudioNode {
    return this.filter;
  }
  get output(): AudioNode {
    return this.filter;
  }

  constructor(private context: AudioContext) {
    this.filter = this.context.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 12000;
    this._cutOff = 12000;
    this.filter.Q.value = 0;
    this.mod = this.context.createGain();
    this.mod.gain.value = 0;
    this.mod.connect(this.filter.frequency);
  }
}
