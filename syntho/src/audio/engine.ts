//
//  Syntho - A Web based Synthesizer
//  by Michael Marner <michaelthis.20papercups.net>
//

interface VCO {
  oscillator: OscillatorNode;
  octave: number;
  amp: GainNode;
  lfoHookup: GainNode;
}

interface VCA {
  amp: GainNode;
  mode: 'gate' | 'adsr';
}

class LPF {
  filter: BiquadFilterNode;
  frequencySetting: number;
  lfoHookup: GainNode;
  mod: 'fixed' | 'adsr' | 'lfo' = 'fixed';

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

class LFO {
  oscillator: OscillatorNode;
  amp: GainNode;

  constructor(private context: AudioContext) {
    this.oscillator = context.createOscillator();
    this.oscillator.type = 'triangle';
    this.oscillator.frequency.value = 0;
    this.oscillator.start();

    this.amp = this.context.createGain();
    this.amp.gain.value = 0;
    this.oscillator.connect(this.amp);
  }
}
export class Syntho {
  vco1: VCO;
  vco2: VCO;
  vco3: VCO;

  vca: VCA;

  filter: LPF;
  lfo: LFO;

  attack: number;
  decay: number;
  sustain: number;
  release: number;

  constructor(private audioContext: AudioContext) {
    this.vco1 = this.createVCO();
    this.vco2 = this.createVCO();
    this.vco3 = this.createVCO();

    this.vca = {
      amp: audioContext.createGain(),
      mode: 'gate'
    };
    this.vca.amp.gain.value = 0;

    this.filter = new LPF(this.audioContext);

    this.lfo = new LFO(this.audioContext);

    this.lfo.amp.connect(this.vco1.lfoHookup);
    this.lfo.amp.connect(this.vco2.lfoHookup);
    this.lfo.amp.connect(this.vco3.lfoHookup);
    this.lfo.amp.connect(this.filter.lfoHookup);

    this.vco1.amp.connect(this.filter.filter);
    this.vco2.amp.connect(this.filter.filter);
    this.vco3.amp.connect(this.filter.filter);

    this.filter.filter.connect(this.vca.amp);

    this.vca.amp.connect(this.audioContext.destination);

    this.attack = 0;
    this.decay = 0;
    this.sustain = 1.0;
    this.release = 0;
  }

  trigger(value: number) {
    if (value == 1) {
      if (this.vca.mode == 'adsr') {
        this.vca.amp.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.vca.amp.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.vca.amp.gain.linearRampToValueAtTime(
          1,
          this.audioContext.currentTime + this.attack / 1000.0
        );
        this.vca.amp.gain.linearRampToValueAtTime(
          this.sustain,
          this.audioContext.currentTime + this.attack / 1000.0 + this.decay / 1000.0
        );
      } else {
        this.vca.amp.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.001);
      }
      if (this.filter.mod == 'adsr') {
        this.filter.filter.frequency.cancelScheduledValues(this.audioContext.currentTime);
        this.filter.filter.frequency.setValueAtTime(0, this.audioContext.currentTime);
        this.filter.filter.frequency.linearRampToValueAtTime(
          this.filter.frequencySetting,
          this.audioContext.currentTime + this.attack / 1000.0
        );
        this.filter.filter.frequency.linearRampToValueAtTime(
          this.sustain * this.filter.frequencySetting,
          this.audioContext.currentTime + this.attack / 1000.0 + this.decay / 1000.0
        );
      }
    } else {
      if (this.vca.mode == 'adsr') {
        let val = this.vca.amp.gain.value;
        this.vca.amp.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.vca.amp.gain.setValueAtTime(val, this.audioContext.currentTime);
        this.vca.amp.gain.linearRampToValueAtTime(
          0,
          this.audioContext.currentTime + this.release / 1000.0
        );
      } else {
        this.vca.amp.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.001);
      }

      if (this.filter.mod == 'adsr') {
        let val = this.filter.filter.frequency.value;
        this.filter.filter.frequency.cancelScheduledValues(this.audioContext.currentTime);
        this.filter.filter.frequency.setValueAtTime(val, this.audioContext.currentTime);
        this.filter.filter.frequency.linearRampToValueAtTime(
          0,
          this.audioContext.currentTime + this.release / 1000.0
        );
      }
    }
  }

  resetFilter() {
    this.filter.filter.frequency.cancelScheduledValues(this.audioContext.currentTime);
    this.filter.filter.frequency.setValueAtTime(
      this.filter.frequencySetting,
      this.audioContext.currentTime
    );
  }

  private createVCO(): VCO {
    let oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 440;
    oscillator.detune.value = 0;
    oscillator.start();

    let amp = this.audioContext.createGain();
    amp.gain.value = 1;
    let lfoHookup = this.audioContext.createGain();
    lfoHookup.gain.value = 0;
    lfoHookup.connect(oscillator.frequency);

    oscillator.connect(amp);

    return {
      amp,
      lfoHookup,
      oscillator,
      octave: 3
    };
  }

  setFilterFrequency(value: number) {
    this.filter.filter.frequency.setValueAtTime(value, this.audioContext.currentTime);
    this.filter.frequencySetting = value;
  }
}
