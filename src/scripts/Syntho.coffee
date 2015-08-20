#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#

audioContext = new (window.AudioContext || window.webkitAudioContext)();

vco1 = audioContext.createOscillator()
vco1.type = 'sawtooth'
vco1.frequency.value = 440
vco1.start()
vco1.octave = 0

vco2 = audioContext.createOscillator()
vco2.type = 'square'
vco2.frequency.value = 440
vco2.detune.value = 50 
vco2.start()
vco2.octave = 1

gate = audioContext.createGain()
gate.gain.value = 0


filter = audioContext.createBiquadFilter()
filter.type = 'lowpass'
filter.frequency = 40000
filter.Q.value = 0

vco1.connect(filter)
vco2.connect(filter)


filter.connect(gate)

gate.connect(audioContext.destination)


kbd = new KeyboardInput
freqMap = new FrequencyMap


callback = (message, note) ->
    if note >= 0 
        vco1.frequency.setValueAtTime(freqMap.getFrequency(vco1.octave, note), audioContext.currentTime)
        vco2.frequency.setValueAtTime(freqMap.getFrequency(vco2.octave, note), audioContext.currentTime)
        gate.gain.value = 1
    else
        gate.gain.value = 0

PubSub.subscribe('Keyboard', callback)
