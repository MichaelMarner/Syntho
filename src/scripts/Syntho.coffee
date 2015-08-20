#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#

audioContext = new (window.AudioContext || window.webkitAudioContext)();

vco1 = audioContext.createOscillator()
vco1.type = 'saw'
vco1.frequency.value = 440
vco1.start()

gate = audioContext.createGain()
gate.gain.value = 1

vco1.connect(gate)
gate.connect(audioContext.destination)


kbd = new KeyboardInput
freqMap = new FrequencyMap


callback = (message, note) ->
    console.log("frequency");
    vco1.frequency.value = freqMap.getFrequency(note)

PubSub.subscribe('Keyboard', callback)
