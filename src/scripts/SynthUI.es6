
class SynthUI {
    constructor(syntho) {
        this.syntho = syntho;
        this.setupOctaves()
        //this.setupTuning()
        //this.setupVCOVolumes()
        //this.setupFilter()
        //this.setupLFO()
        //this.setupADSR()
    }

    setupOctaves() {
        // VCO Types
        $("input[name=vco1-type]").change( () => {
            value = $("input[name=vco1-type]:checked").val()
            this.syntho.vco1.type = value
        });

        $("input[name=vco2-type]").change(() => {
            value = $("input[name=vco2-type]:checked").val()
            this.syntho.vco2.type = value
        });

        $("input[name=vco3-type]").change(() => {
            value = $("input[name=vco3-type]:checked").val()
            this.syntho.vco3.type = value
        });

        $("#vco1-octave").knob({
            'change' : (value) => { this.syntho.vco1.octave = Math.round(value) - 1}
        })
        $("#vco2-octave").knob({
            'change' : (value) => { this.syntho.vco2.octave = Math.round(value) - 1}
        })
        $("#vco3-octave").knob({
            'change' : (value) => { this.syntho.vco3.octave = Math.round(value) - 1}
        })
    }
}


/*
    setupTuning: ->
        this = this.
        vco1Detune = (value) -> this.syntho.vco1.detune.value = Math.round(value)
        vco2Detune = (value) -> this.syntho.vco2.detune.value = Math.round(value)
        vco3Detune = (value) -> this.syntho.vco3.detune.value = Math.round(value)

        $("#vco1-detune").knob({
            'change' : (v) -> vco1Detune(v)
        })
        $("#vco2-detune").knob({
            'change' : (v) -> vco2Detune(v)
        })
        $("#vco3-detune").knob({
            'change' : (v) -> vco3Detune(v)
        })

    setupVCOVolumes: ->
        this = this.
        vco1Volume = (value) -> this.syntho.vco1.amp.gain.value = value / 100.0
        vco2Volume = (value) -> this.syntho.vco2.amp.gain.value = value / 100.0
        vco3Volume = (value) -> this.syntho.vco3.amp.gain.value = value / 100.0

        $("#vco1-vol").knob({
            'change' : (v) -> vco1Volume(v)
        })
        $("#vco2-vol").knob({
            'change' : (v) -> vco2Volume(v)
        })
        $("#vco3-vol").knob({
            'change' : (v) -> vco3Volume(v)
        })

    setupFilter: ->
        this = this.
        filterCutoff = (value) ->
            this.syntho.filter.frequency.value = value
            this.syntho.filter.frequencyKnob = value

        filterPeak = (value) -> this.syntho.filter.Q.value = value
        $("#filter-cutoff").knob({
            'change' : (v) -> filterCutoff(v)
        })
        $("#filter-peak").knob({
            'change' : (v) -> filterPeak(v)
        })

        $("input[name=filter-mod]").change ->
            value = $("input[name=filter-mod]:checked").val()
            if (value == "fixed")
                this.syntho.filter.lfoHookup.gain.value = 0
                this.syntho.resetFilter()
                this.syntho.filter.mod = 'fixed'
            else if (value == "lfo")
                this.syntho.filter.lfoHookup.gain.value = 8 
                this.syntho.resetFilter()
                this.syntho.filter.mod = 'lfo'
            else if (value="adsr")
                this.syntho.filter.lfoHookup.gain.value = 0
                this.syntho.filter.mod = 'adsr'


    setupLFO: ->
        this = this.
        $("input[name=lfo-type]").change ->
            value = $("input[name=lfo-type]:checked").val()
            this.syntho.lfo.type = value

        $("#vco1-lfo").click ->
            if (this.syntho.vco1.lfoHookup.gain.value  == 1)
                this.syntho.vco1.lfoHookup.gain.value = 0
            else
                this.syntho.vco1.lfoHookup.gain.value = 1

        $("#vco2-lfo").click ->
            if (this.syntho.vco2.lfoHookup.gain.value  == 1)
                this.syntho.vco2.lfoHookup.gain.value = 0
            else
                this.syntho.vco2.lfoHookup.gain.value = 1

        $("#vco3-lfo").click ->
            if (this.syntho.vco3.lfoHookup.gain.value  == 1)
                this.syntho.vco3.lfoHookup.gain.value = 0
            else
                this.syntho.vco3.lfoHookup.gain.value = 1

        rate = (value) -> this.syntho.lfo.frequency.value = value
        depth = (value) -> this.syntho.lfo.amp.gain.value = value

        $("#lfo-rate").knob({
            'change' : (v) -> rate(v)
        })
        $("#lfo-depth").knob({
            'change' : (v) -> depth(v)
        })


    setupADSR: ->
        this = this.
        $("input[name=vca-mode]").change ->
            value = $("input[name=vca-mode]:checked").val()
            this.syntho.vca.mode = value

        attack = (value) -> this.syntho.attack = value
        decay = (value) -> this.syntho.decay = value
        sustain = (value) -> this.syntho.sustain = value
        release = (value) -> this.syntho.release = value

        $("#adsr-attack").knob({
            'change' : (v) -> attack(v)
        })
        $("#adsr-decay").knob({
            'change' : (v) -> decay(v)
        })
        $("#adsr-sustain").knob({
            'change' : (v) -> sustain(v)
        })
        $("#adsr-release").knob({
            'change' : (v) -> release(v)
        })

}
*/
