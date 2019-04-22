export class VCA {
  private amp: GainNode;
  mode: 'gate' | 'adsr' = 'gate';

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
    this.amp.gain.value = 0;
  }
}
