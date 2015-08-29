#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#
class @Syntho
    constructor: (@audioContext) ->

        @vco1 = @.initVCO(@audioContext)
        @vco2 = @.initVCO(@audioContext)
        @vco3 = @.initVCO(@audioContext)
        
        @gate = @audioContext.createGain()
        @gate.gain.value = 0

        @filter = @audioContext.createBiquadFilter()
        @filter.type = 'lowpass'
        @filter.frequency.value = 20000
        @filter.Q.value = 0
        @filter.lfoHookup = @audioContext.createGain()
        @filter.lfoHookup.gain.value = 0
        @filter.lfoHookup.connect(@filter.frequency)

        @lfo = @audioContext.createOscillator()
        @lfo.type = 'triangle'
        @lfo.frequency.value = 0
        @lfo.start()
        @lfo.amp = @audioContext.createGain()
        @lfo.amp.gain.value = 0
        @lfo.connect(@lfo.amp)


        @lfo.amp.connect(@vco1.lfoHookup)
        @lfo.amp.connect(@vco2.lfoHookup)
        @lfo.amp.connect(@vco3.lfoHookup)
        @lfo.amp.connect(@filter.lfoHookup)
        @vco1.amp.connect(@filter)
        @vco2.amp.connect(@filter)
        @vco3.amp.connect(@filter)
        @filter.connect(@gate)
        @gate.connect(@audioContext.destination)


    initVCO: (audioContext) -> 
        vco = audioContext.createOscillator()
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
