//
//  Syntho - A Web based Synthesizer
//  by Michael Marner <michaelthis.20papercups.net>
//

import { Vco } from './vco';
import { Lpf } from './lpf';
import { Lfo } from './lfo';
import { Vca } from './vca';
import { Adsr } from './adsr';

export class SynthoEngine {
  vco1: Vco;
  vco2: Vco;
  vco3: Vco;

  vca: Vca;

  lpf: Lpf;
  lfo: Lfo;

  adsr: Adsr;

  constructor(private context: AudioContext) {
    this.vco1 = new Vco(context);
    this.vco2 = new Vco(context);
    this.vco3 = new Vco(context);
    this.vca = new Vca(context);

    this.lpf = new Lpf(this.context);

    this.lfo = new Lfo(this.context);

    this.adsr = new Adsr(this.context);

    this.lfo.output.connect(this.vco1.modIn);
    this.lfo.output.connect(this.vco2.modIn);
    this.lfo.output.connect(this.vco3.modIn);
    this.lfo.output.connect(this.lpf.modIn);

    this.vco1.output.connect(this.lpf.input);
    this.vco2.output.connect(this.lpf.input);
    this.vco3.output.connect(this.lpf.input);

    this.lpf.output.connect(this.vca.input);
    this.adsr.output.connect(this.vca.gain);
    this.vca.output.connect(this.context.destination);
  }

  trigger(value: number) {
    if (value == 1) {
      if (this.context.state == 'suspended') {
        this.context.resume();
      }
      this.adsr.triggerOn();
    } else {
      this.adsr.triggerOff();
    }
  }
}
