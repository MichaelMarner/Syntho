//
//  Syntho - A Web based Synthesizer
//  by Michael Marner <michaelthis.20papercups.net>
//

import { Vco } from './vco';
import { Lpf } from './lpf';
import { Lfo } from './lfo';
import { Vca } from './vca';
import { Adsr } from './adsr';
import { Gate } from './gate';

export enum ModType {
  none,
  gate,
  eg,
  lfo
}

export class SynthoEngine {
  vco1: Vco;
  vco2: Vco;
  vco3: Vco;

  vca: Vca;
  vcaPatch: ModType = ModType.gate;

  lpf: Lpf;
  lfo: Lfo;

  adsr: Adsr;
  gate: Gate;

  constructor(private context: AudioContext) {
    this.vco1 = new Vco(context);
    this.vco2 = new Vco(context);
    this.vco3 = new Vco(context);
    this.vca = new Vca(context);

    this.lpf = new Lpf(this.context);

    this.lfo = new Lfo(this.context);

    this.adsr = new Adsr(this.context);
    this.gate = new Gate(this.context);

    this.lfo.output.connect(this.vco1.modIn);
    this.lfo.output.connect(this.vco2.modIn);
    this.lfo.output.connect(this.vco3.modIn);
    this.lfo.output.connect(this.lpf.modIn);

    this.vco1.output.connect(this.lpf.input);
    this.vco2.output.connect(this.lpf.input);
    this.vco3.output.connect(this.lpf.input);

    this.lpf.output.connect(this.vca.input);
    this.vca.output.connect(this.context.destination);

    this.gate.output.connect(this.vca.gain);
  }

  patchAmp(to: ModType) {
    if (to === this.vcaPatch) {
      return;
    }
    if (to === ModType.gate) {
      this.adsr.output.disconnect(this.vca.gain);
      this.gate.output.connect(this.vca.gain);
    } else {
      this.gate.output.disconnect(this.vca.gain);
      this.adsr.output.connect(this.vca.gain);
    }
    this.vcaPatch = to;
  }
  patchFilter(to: ModType) {
    if (to === this.lpf.patch) {
      return;
    }
    switch (to) {
      case ModType.none:
        if (this.lpf.patch == ModType.eg) {
          this.adsr.output.disconnect(this.lpf.mod.gain);
        } else {
          this.lfo.output.disconnect(this.lpf.mod.gain);
        }
        break;
      case ModType.eg:
        if (this.lpf.patch == ModType.lfo) {
          this.lfo.output.disconnect(this.lpf.mod.gain);
        }
        this.lpf.mod.gain.value = 1;
        this.adsr.output.connect(this.lpf.mod.gain);
        break;
      case ModType.lfo:
        if (this.lpf.patch == ModType.eg) {
          this.adsr.output.disconnect(this.lpf.mod.gain);
        }
        this.lpf.mod.gain.value = 8;
        this.lfo.output.connect(this.lpf.mod.gain);
        break;
      default:
        return;
    }
    this.lpf.patch = to;
  }

  trigger(value: number) {
    if (value == 1) {
      if (this.context.state == 'suspended') {
        this.context.resume();
      }
      this.adsr.triggerOn();
      this.gate.triggerOn();
    } else {
      this.adsr.triggerOff();
      this.gate.triggerOff();
    }
  }
}
