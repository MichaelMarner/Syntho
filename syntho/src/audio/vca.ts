export class VCA {
  amp: GainNode;
  mode: 'gate' | 'adsr' = 'gate';

  constructor(private context: AudioContext) {
    this.amp = context.createGain();
    this.amp.gain.value = 0;
  }
}
