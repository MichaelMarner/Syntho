import { ModType } from './engine';

export class Lpf {
  private filter: BiquadFilterNode;
  private _cutOff: ConstantSourceNode;
  public mod: GainNode;
  patch: ModType = ModType.none;

  get modIn(): GainNode {
    return this.mod;
  }

  set cutOff(value: number) {
    this._cutOff.offset.setValueAtTime(value, this.context.currentTime);
  }

  get cutOff() {
    return this._cutOff.offset.value;
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
    this._cutOff = this.context.createConstantSource();
    this._cutOff.start();
    this.filter.type = 'lowpass';
    this._cutOff.offset.value = 12000;
    this.filter.Q.value = 0;
    this.filter.frequency.value = 0;
    this.mod = this.context.createGain();
    this.mod.gain.value = 1;
    this._cutOff.connect(this.mod);
    this.mod.connect(this.filter.frequency);
  }
}
