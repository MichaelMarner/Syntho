//
//  Syntho - A Web based Synthesizer
//  by Michael Marner <michaelthis.20papercups.net>
//

import { Vco } from './vco';
import { LPF } from './lpf';
import { Lfo } from './lfo';
import { VCA } from './vca';

export class SynthoEngine {
  vco1: Vco;
  vco2: Vco;
  vco3: Vco;

  vca: VCA;

  lpf: LPF;
  lfo: Lfo;

  attack: number;
  decay: number;
  sustain: number;
  release: number;

  constructor(private context: AudioContext) {
    this.vco1 = new Vco(context);
    this.vco2 = new Vco(context);
    this.vco3 = new Vco(context);

    this.vca = new VCA(context);

    this.lpf = new LPF(this.context);

    this.lfo = new Lfo(this.context);

    this.lfo.output.connect(this.vco1.modIn);
    this.lfo.output.connect(this.vco2.modIn);
    this.lfo.output.connect(this.vco3.modIn);
    this.lfo.output.connect(this.lpf.modIn);

    this.vco1.output.connect(this.lpf.input);
    this.vco2.output.connect(this.lpf.input);
    this.vco3.output.connect(this.lpf.input);

    this.lpf.output.connect(this.vca.input);

    this.vca.output.connect(this.context.destination);

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
        this.vca.gain.cancelScheduledValues(this.context.currentTime);
        this.vca.gain.setValueAtTime(0, this.context.currentTime);
        this.vca.gain.linearRampToValueAtTime(1, this.context.currentTime + this.attack / 1000.0);
        this.vca.gain.linearRampToValueAtTime(
          this.sustain,
          this.context.currentTime + this.attack / 1000.0 + this.decay / 1000.0
        );
      } else {
        this.vca.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.001);
      }
      if (this.lpf.mode == 'adsr') {
        this.lpf.frequency.cancelScheduledValues(this.context.currentTime);
        this.lpf.frequency.setValueAtTime(0, this.context.currentTime);
        this.lpf.frequency.linearRampToValueAtTime(
          this.lpf.cutOff,
          this.context.currentTime + this.attack / 1000.0
        );
        this.lpf.frequency.linearRampToValueAtTime(
          this.sustain * this.lpf.cutOff,
          this.context.currentTime + this.attack / 1000.0 + this.decay / 1000.0
        );
      }
    } else {
      if (this.vca.mode == 'adsr') {
        let val = this.vca.gain.value;
        this.vca.gain.cancelScheduledValues(this.context.currentTime);
        this.vca.gain.setValueAtTime(val, this.context.currentTime);
        this.vca.gain.linearRampToValueAtTime(0, this.context.currentTime + this.release / 1000.0);
      } else {
        this.vca.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.001);
      }

      if (this.lpf.mode == 'adsr') {
        let val = this.lpf.frequency.value;
        this.lpf.frequency.cancelScheduledValues(this.context.currentTime);
        this.lpf.frequency.setValueAtTime(val, this.context.currentTime);
        this.lpf.frequency.linearRampToValueAtTime(
          0,
          this.context.currentTime + this.release / 1000.0
        );
      }
    }
  }
}
