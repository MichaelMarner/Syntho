#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#

audioContext = new (window.AudioContext || window.webkitAudioContext)();

vco1 = audioContext.createOscillator()
vco1.type = 'triangle'
vco1.frequency.value = 440
vco1.start()

vco2 = audioContext.createOscillator()
vco2.type = 'square'
vco2.frequency.value = 440
vco2.detune.value = 30
vco2.start()

gate = audioContext.createGain()
gate.gain.value = 0


vco1.connect(gate)
vco2.connect(gate)


gate.connect(audioContext.destination)


kbd = new KeyboardInput
freqMap = new FrequencyMap


callback = (message, note) ->
    if note >= 0 
        vco1.frequency.setValueAtTime(freqMap.getFrequency(note), audioContext.currentTime)
        vco2.frequency.setValueAtTime(freqMap.getFrequency(note), audioContext.currentTime)
        gate.gain.value = 1
    else
        gate.gain.value = 0

PubSub.subscribe('Keyboard', callback)
