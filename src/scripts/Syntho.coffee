#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#

audioContext = new (window.AudioContext || window.webkitAudioContext)();

vco1 = audioContext.createOscillator()
vco1.type = 'square'
vco1.frequency.value = 440
vco1.start()

gate = audioContext.createGain()
gate.gain.value = 0

vco1.connect(gate)
gate.connect(audioContext.destination)


kbd = new KeyboardInput
freqMap = new FrequencyMap


callback = (message, note) ->
    if note >= 0 
        vco1.frequency.setValueAtTime(freqMap.getFrequency(note), audioContext.currentTime)
        gate.gain.value = 1
    else
        gate.gain.value = 0

PubSub.subscribe('Keyboard', callback)
