$( -> 
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    syntho = new Syntho(audioContext)
    ui = new SynthUI(syntho)
    kbd = new KeyboardInput
    freqMap = new FrequencyMap


    # connect the physical keyboard to the VCOs
    callback = (message, note) ->
        if note >= 0 
            syntho.vco1.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco1.octave, note), audioContext.currentTime)
            syntho.vco2.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco2.octave, note), audioContext.currentTime)
            syntho.vco3.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco3.octave, note), audioContext.currentTime)
            syntho.gate.gain.value = 1
        else
            syntho.gate.gain.value = 0

    
    
    PubSub.subscribe('Keyboard', callback)

)
