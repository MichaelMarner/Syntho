//
//  Syntho - A Web based Synthesizer
//  by Michael Marner <michaelthis.20papercups.net>
//

import { Vco } from './vco';
import { LPF } from './lpf';
import { LFO } from './lfo';
import { VCA } from './vca';

export class SynthoEngine {
  vco1: Vco;
  vco2: Vco;
  vco3: Vco;

  vca: VCA;

  filter: LPF;
  lfo: LFO;

  attack: number;
  decay: number;
  sustain: number;
  release: number;

  constructor(private context: AudioContext) {
    this.vco1 = new Vco(context);
    this.vco2 = new Vco(context);
    this.vco3 = new Vco(context);

    this.vca = new VCA(context);

    this.filter = new LPF(this.context);

    this.lfo = new LFO(this.context);

    this.lfo.amp.connect(this.vco1.lfoHookup);
    this.lfo.amp.connect(this.vco2.lfoHookup);
    this.lfo.amp.connect(this.vco3.lfoHookup);
    this.lfo.amp.connect(this.filter.lfoHookup);

    this.vco1.amp.connect(this.filter.filter);
    this.vco2.amp.connect(this.filter.filter);
    this.vco3.amp.connect(this.filter.filter);

    this.filter.filter.connect(this.vca.amp);

    this.vca.amp.connect(this.context.destination);

    this.attack = 0;
    this.decay = 0;
    this.sustain = 1.0;
    this.release = 0;
  }

  trigger(value: number) {
    if (value == 1) {
      if (this.context.state == 'suspended') {
        this.context.resume();
      }
      if (this.vca.mode == 'adsr') {
        this.vca.amp.gain.cancelScheduledValues(this.context.currentTime);
        this.vca.amp.gain.setValueAtTime(0, this.context.currentTime);
        this.vca.amp.gain.linearRampToValueAtTime(
          1,
          this.context.currentTime + this.attack / 1000.0
        );
        this.vca.amp.gain.linearRampToValueAtTime(
          this.sustain,
          this.context.currentTime + this.attack / 1000.0 + this.decay / 1000.0
        );
      } else {
        this.vca.amp.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.001);
      }
      if (this.filter.mod == 'adsr') {
        this.filter.filter.frequency.cancelScheduledValues(this.context.currentTime);
        this.filter.filter.frequency.setValueAtTime(0, this.context.currentTime);
        this.filter.filter.frequency.linearRampToValueAtTime(
          this.filter.frequencySetting,
          this.context.currentTime + this.attack / 1000.0
        );
        this.filter.filter.frequency.linearRampToValueAtTime(
          this.sustain * this.filter.frequencySetting,
          this.context.currentTime + this.attack / 1000.0 + this.decay / 1000.0
        );
      }
    } else {
      if (this.vca.mode == 'adsr') {
        let val = this.vca.amp.gain.value;
        this.vca.amp.gain.cancelScheduledValues(this.context.currentTime);
        this.vca.amp.gain.setValueAtTime(val, this.context.currentTime);
        this.vca.amp.gain.linearRampToValueAtTime(
          0,
          this.context.currentTime + this.release / 1000.0
        );
      } else {
        this.vca.amp.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.001);
      }

      if (this.filter.mod == 'adsr') {
        let val = this.filter.filter.frequency.value;
        this.filter.filter.frequency.cancelScheduledValues(this.context.currentTime);
        this.filter.filter.frequency.setValueAtTime(val, this.context.currentTime);
        this.filter.filter.frequency.linearRampToValueAtTime(
          0,
          this.context.currentTime + this.release / 1000.0
        );
      }
    }
  }
}
