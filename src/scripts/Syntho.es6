//
//  Syntho - A Web based Synthesizer
//  by Michael Marner <michaelthis.20papercups.net>
//
class Syntho {

    constructor(audioContext) {
        this.audioContext = audioContext;

        this.vco1 = this.createVCO(audioContext);
        this.vco2 = this.createVCO(audioContext);
        this.vco3 = this.createVCO(audioContext);

        this.vca = audioContext.createGain()
        this.vca.gain.value = 0
        this.vca.mode = 'gate'

        this.filter = audioContext.createBiquadFilter()
        this.filter.type = 'lowpass'
        this.filter.frequency.value = 12000
        this.filter.frequencyKnob = 12000
        this.filter.Q.value = 0
        this.filter.lfoHookup = audioContext.createGain()
        this.filter.lfoHookup.gain.value = 0
        this.filter.lfoHookup.connect(this.filter.frequency)

        this.lfo = audioContext.createOscillator()
        this.lfo.type = 'triangle'
        this.lfo.frequency.value = 0
        this.lfo.start()
        this.lfo.amp = this.audioContext.createGain()
        this.lfo.amp.gain.value = 0
        this.lfo.connect(this.lfo.amp)


        this.lfo.amp.connect(this.vco1.lfoHookup)
        this.lfo.amp.connect(this.vco2.lfoHookup)
        this.lfo.amp.connect(this.vco3.lfoHookup)
        this.lfo.amp.connect(this.filter.lfoHookup)
        this.vco1.amp.connect(this.filter)
        this.vco2.amp.connect(this.filter)
        this.vco3.amp.connect(this.filter)
        this.filter.connect(this.vca)

        this.vca.connect(this.audioContext.destination)

        this.attack = 0
        this.decay = 0
        this.sustain = 1.0
        this.release = 0
    }

    trigger (value) {
        if (value == 1) {
            if (this.vca.mode == 'adsr') {
                this.vca.gain.cancelScheduledValues(this.audioContext.currentTime)
                this.vca.gain.setValueAtTime(0, this.audioContext.currentTime)
                this.vca.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + (this.attack / 1000.0))
                this.vca.gain.linearRampToValueAtTime(this.sustain, this.audioContext.currentTime + (this.attack / 1000.0) + (this.decay / 1000.0))
            }
            else {
                this.vca.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.001)
            }
            if (this.filter.mod == 'adsr')  {
                this.filter.frequency.cancelScheduledValues(this.audioContext.currentTime)
                this.filter.frequency.setValueAtTime(0, this.audioContext.currentTime)
                this.filter.frequency.linearRampToValueAtTime(this.filter.frequencyKnob, this.audioContext.currentTime + (this.attack / 1000.0))
                this.filter.frequency.linearRampToValueAtTime(this.sustain * this.filter.frequencyKnob, this.audioContext.currentTime + (this.attack / 1000.0) + (this.decay / 1000.0))
            }
        }
        else {
            if (this.vca.mode == 'adsr') {
                let val = this.vca.gain.value
                this.vca.gain.cancelScheduledValues(this.audioContext.currentTime)
                this.vca.gain.setValueAtTime(val, this.audioContext.currentTime)
                this.vca.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + (this.release / 1000.0))
            }
            else {
                this.vca.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.001)
            }

            if (this.filter.mod == 'adsr')  {
                let val = this.filter.frequency.value
                this.filter.frequency.cancelScheduledValues(this.audioContext.currentTime)
                this.filter.frequency.setValueAtTime(val, this.audioContext.currentTime)
                this.filter.frequency.linearRampToValueAtTime(0, this.audioContext.currentTime + (this.release / 1000.0))
            }
        }
    }

    resetFilter() {
        this.filter.frequency.cancelScheduledValues(this.audioContext.currentTime)
        this.filter.frequency.setValueAtTime(this.filter.frequencyKnob, this.audioContext.currentTime)
    }


    createVCO (audioContext) {
        let vco = audioContext.createOscillator()
        vco.type = 'sawtooth'
        vco.frequency.value = 440
        vco.detune.value = 0
        vco.start()
        vco.octave = 2
        vco.amp = audioContext.createGain()
        vco.amp.gain.value = 1
        vco.lfoHookup = audioContext.createGain()
        vco.lfoHookup.gain.value = 0
        vco.lfoHookup.connect(vco.frequency)
        vco.connect(vco.amp)
        return vco
    }
}
