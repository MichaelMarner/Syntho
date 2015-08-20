

class @VCO
    constructor: (audioContext) ->
        @oscillator = audioContext.createOscillator()
        @oscillator.type = 'saw'
        @oscillator.frequency.value = 440
        @oscillator.start()


    setFrequency: (freq) ->
        @oscillator.frequency.value = freq



