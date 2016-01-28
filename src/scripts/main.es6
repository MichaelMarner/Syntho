$( () => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let syntho = new Syntho(audioContext);
    let ui = new SynthUI(syntho);
    let kbd = new KeyboardInput;
    let freqMap = new FrequencyMap;


    // connect the physical keyboard to the VCOs
    let keyboardCallback = (message, note) => {
        if (note >= 0) {
            syntho.vco1.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco1.octave, note), audioContext.currentTime)
            syntho.vco2.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco2.octave, note), audioContext.currentTime)
            syntho.vco3.frequency.setValueAtTime(freqMap.getFrequency(syntho.vco3.octave, note), audioContext.currentTime)
        }
    }

    
    let triggerCallback = (message, value) => {
        syntho.trigger(value)
    }
    
    PubSub.subscribe('Keyboard', keyboardCallback)
    PubSub.subscribe('Trigger', triggerCallback)

})