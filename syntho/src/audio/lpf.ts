export class LPF {
  filter: BiquadFilterNode;
  frequencySetting: number;
  lfoHookup: GainNode;
  mod: 'fixed' | 'adsr' | 'lfo' = 'fixed';

  reset() {
    this.filter.frequency.cancelScheduledValues(this.context.currentTime);
    this.filter.frequency.setValueAtTime(this.frequencySetting, this.context.currentTime);
  }

  set frequency(value: number) {
    this.filter.frequency.setValueAtTime(value, this.context.currentTime);
    this.frequencySetting = value;
  }

  get frequency() {
    return this.frequencySetting;
  }

  constructor(private context: AudioContext) {
    this.filter = this.context.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 12000;
    this.frequencySetting = 12000;
    this.filter.Q.value = 0;
    this.lfoHookup = this.context.createGain();
    this.lfoHookup.gain.value = 0;
    this.lfoHookup.connect(this.filter.frequency);
  }
}
