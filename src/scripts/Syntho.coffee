#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#
class @Syntho
    constructor: (@audioContext) ->

        @vco1 = @.initVCO(@audioContext)
        @vco2 = @.initVCO(@audioContext)
        @vco3 = @.initVCO(@audioContext)
        
        @vca = @audioContext.createGain()
        @vca.gain.value = 0
        @vca.mode = 'gate'

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
        @filter.connect(@vca)

        @vca.connect(@audioContext.destination)


        @attack = 0 
        @decay = 0 
        @sustain = 1.0 
        @release = 0 

    trigger: (value) ->
        if (value == 1)
            if (@vca.mode == 'adsr')
                @vca.gain.cancelScheduledValues(@audioContext.currentTime)
                @vca.gain.setValueAtTime(0, @audioContext.currentTime)
                @vca.gain.linearRampToValueAtTime(1, @audioContext.currentTime + (@attack / 1000.0))
                @vca.gain.linearRampToValueAtTime(@sustain, @audioContext.currentTime + (@attack / 1000.0) + (@decay / 1000.0))
            else
                @vca.gain.setValueAtTime(1, @audioContext.currentTime)
            if (@filter.mod == 'adsr') 
                @filter.frequency.cancelScheduledValues(@audioContext.currentTime)
                @filter.frequency.setValueAtTime(0, @audioContext.currentTime)
                @filter.frequency.linearRampToValueAtTime(@filter.frequencyKnob, @audioContext.currentTime + (@attack / 1000.0))
                @filter.frequency.linearRampToValueAtTime(@sustain * @filter.frequencyKnob, @audioContext.currentTime + (@attack / 1000.0) + (@decay / 1000.0))
        else
            if (@vca.mode == 'adsr')
                val = @vca.gain.value
                @vca.gain.cancelScheduledValues(@audioContext.currentTime)
                @vca.gain.setValueAtTime(val, @audioContext.currentTime)
                @vca.gain.linearRampToValueAtTime(0, @audioContext.currentTime + (@release / 1000.0))
            else
                @vca.gain.setValueAtTime(0, @audioContext.currentTime)

            if (@filter.mod == 'adsr') 
                val = @filter.frequency.value
                @filter.frequency.cancelScheduledValues(@audioContext.currentTime)
                @filter.frequency.setValueAtTime(val, @audioContext.currentTime)
                @filter.frequency.linearRampToValueAtTime(0, @audioContext.currentTime + (@release / 1000.0))

    resetFilter: ->
                @filter.frequency.cancelScheduledValues(@audioContext.currentTime)
                @filter.frequency.setValueAtTime(@filter.frequencyKnob, @audioContext.currentTime)


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
