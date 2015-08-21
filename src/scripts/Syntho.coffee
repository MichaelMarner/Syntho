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
        @vco1.octave = 1
        
        @vco2 = @audioContext.createOscillator()
        @vco2.type = 'square'
        @vco2.frequency.value = 440
        @vco2.detune.value = 50 
        @vco2.start()
        @vco2.octave = 2
        
        @gate = @audioContext.createGain()
        @gate.gain.value = 0
        
        
        @filter = @audioContext.createBiquadFilter()
        @filter.type = 'lowpass'
        @filter.frequency = 400
        @filter.Q.value = 20
        
        @vco1.connect(@filter)
        @vco2.connect(@filter)
        @filter.connect(@gate)
        @gate.connect(@audioContext.destination)


audioContext = new (window.AudioContext || window.webkitAudioContext)();
syntho = new Syntho(audioContext)
kbd = new KeyboardInput
freqMap = new FrequencyMap


# connect the physical keyboard to the VCOs
callback = (message, note) ->
    if note >= 0 
        syntho.vco1.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco1.octave, note), audioContext.currentTime)
        syntho.vco2.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco2.octave, note), audioContext.currentTime)
        syntho.gate.gain.value = 1
    else
        syntho.gate.gain.value = 0

PubSub.subscribe('Keyboard', callback)
