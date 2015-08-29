#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#
class @Syntho
    constructor: (@audioContext) ->

        @vco1 = @audioContext.createOscillator()
        @vco1.type = 'sawtooth'
        @vco1.frequency.value = 440
        @vco1.start()
        @vco1.octave = 3
        @vco1.amp = @audioContext.createGain()
        @vco1.amp.gain.value = 1
        @vco1.connect(@vco1.amp)

        
        @vco2 = @audioContext.createOscillator()
        @vco2.type = 'sawtooth'
        @vco2.frequency.value = 440
        @vco2.detune.value = 0 
        @vco2.start()
        @vco2.octave = 3
        @vco2.amp = @audioContext.createGain()
        @vco2.amp.gain.value = 1
        @vco2.connect(@vco2.amp)

        @vco3 = @audioContext.createOscillator()
        @vco3.type = 'sawtooth'
        @vco3.frequency.value = 440
        @vco3.detune.value = 0 
        @vco3.start()
        @vco3.octave = 3
        @vco3.amp = @audioContext.createGain()
        @vco3.amp.gain.value = 1
        @vco3.connect(@vco3.amp)
        
        @gate = @audioContext.createGain()
        @gate.gain.value = 0

        @lfo = @audioContext.createOscillator()
        @lfo.type = 'triangle'
        @lfo.frequency.value = 0
        @lfo.start()
        @lfo.amp = @audioContext.createGain()
        @lfo.amp.gain.value = 0
        @lfo.connect(@lfo.amp)
        @lfo.amp.connect(@vco1.frequency)
        @lfo.amp.connect(@vco2.frequency)
        @lfo.amp.connect(@vco3.frequency)
        
        
        @filter = @audioContext.createBiquadFilter()
        @filter.type = 'lowpass'
        @filter.frequency.value = 20000
        @filter.Q.value = 0
        
        @vco1.amp.connect(@filter)
        @vco2.amp.connect(@filter)
        @vco3.amp.connect(@filter)
        @filter.connect(@gate)
        @gate.connect(@audioContext.destination)


