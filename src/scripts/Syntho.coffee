

audioContext = new (window.AudioContext || window.webkitAudioContext)();

vco1 = audioContext.createOscillator()
vco1.type = 'sine'
vco1.frequency.value = 440
vco1.start()

gate = audioContext.createGain()
gate.gain.value = 0

vco1.connect(gate)
gate.connect(audioContext.destination)

playing = false

$(document).keydown -> 
    gate.gain.value = 1 if !playing
    playing = true

$(document).keyup -> 
    gate.gain.value = 0 if playing
    playing = false  


