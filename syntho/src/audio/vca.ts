import { ModType } from './engine';

export class Vca {
  private amp: GainNode;
  patch: ModType = ModType.gate;

  get gain(): AudioParam {
    return this.amp.gain;
  }
  get input(): AudioNode {
    return this.amp;
  }
  get output(): AudioNode {
    return this.amp;
  }
  constructor(private context: AudioContext) {
    this.amp = context.createGain();
    this.amp.gain.value = 0.0;
  }
}
