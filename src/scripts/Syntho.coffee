#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#

audioContext = new (window.AudioContext || window.webkitAudioContext)();

gate = audioContext.createGain()
gate.gain.value = 0

vco1.connect(gate)
gate.connect(audioContext.destination)


kbd = new KeyboardInput
