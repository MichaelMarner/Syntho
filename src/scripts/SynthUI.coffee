
class @SynthUI
    constructor: (@syntho) ->
        #$( -> $(".dial").knob(); );
        @.setupOctaves()
        @.setupTuning()
        @.setupVCOVolumes()
        @.setupFilter()
        @.setupLFO()



    setupOctaves: ->
        self = @
        # VCO Types
        $("input[name=vco1-type]").change ->
            value = $("input[name=vco1-type]:checked").val()
            self.syntho.vco1.type = value

        $("input[name=vco2-type]").change ->
            value = $("input[name=vco2-type]:checked").val()
            self.syntho.vco2.type = value

        $("input[name=vco3-type]").change ->
            value = $("input[name=vco3-type]:checked").val()
            self.syntho.vco3.type = value

        # VCO Octaves
        vco1OctaveChange = (value) -> self.syntho.vco1.octave = Math.round(value) - 1
        vco2OctaveChange = (value) -> self.syntho.vco2.octave = Math.round(value) - 1
        vco3OctaveChange = (value) -> self.syntho.vco3.octave = Math.round(value) - 1

        $("#vco1-octave").knob({
            'change' : (v) -> vco1OctaveChange(v)
        })
        $("#vco2-octave").knob({
            'change' : (v) -> vco2OctaveChange(v)
        })
        $("#vco3-octave").knob({
            'change' : (v) -> vco3OctaveChange(v)
        })


    setupTuning: ->
        self = @
        vco1Detune = (value) -> self.syntho.vco1.detune.value = Math.round(value) 
        vco2Detune = (value) -> self.syntho.vco2.detune.value = Math.round(value) 
        vco3Detune = (value) -> self.syntho.vco3.detune.value = Math.round(value) 
        
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
        self = @
        vco1Volume = (value) -> self.syntho.vco1.amp.gain.value = value / 100.0
        vco2Volume = (value) -> self.syntho.vco2.amp.gain.value = value / 100.0
        vco3Volume = (value) -> self.syntho.vco3.amp.gain.value = value / 100.0
 
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
        self = @
        filterCutoff = (value) -> self.syntho.filter.frequency.value = value 
        filterPeak = (value) -> self.syntho.filter.Q.value = value 
        $("#filter-cutoff").knob({
            'change' : (v) -> filterCutoff(v)
        })
        $("#filter-peak").knob({
            'change' : (v) -> filterPeak(v)
        })

        $("input[name=filter-mod]").change ->
            value = $("input[name=filter-mod]:checked").val()
            if (value == "fixed")
                self.syntho.filter.lfoHookup.gain.value = 0 
            else if (value == "lfo")
                self.syntho.filter.lfoHookup.gain.value = 3 


    setupLFO: ->
        self = @
        $("input[name=lfo-type]").change ->
            value = $("input[name=lfo-type]:checked").val()
            self.syntho.lfo.type = value

        $("#vco1-lfo").click ->
            if (self.syntho.vco1.lfoHookup.gain.value  == 1)
                self.syntho.vco1.lfoHookup.gain.value = 0
            else
                self.syntho.vco1.lfoHookup.gain.value = 1

        $("#vco2-lfo").click ->
            if (self.syntho.vco2.lfoHookup.gain.value  == 1)
                self.syntho.vco2.lfoHookup.gain.value = 0
            else
                self.syntho.vco2.lfoHookup.gain.value = 1

        $("#vco3-lfo").click ->
            if (self.syntho.vco3.lfoHookup.gain.value  == 1)
                self.syntho.vco3.lfoHookup.gain.value = 0
            else
                self.syntho.vco3.lfoHookup.gain.value = 1
            
        rate = (value) -> self.syntho.lfo.frequency.value = value 
        depth = (value) -> self.syntho.lfo.amp.gain.value = value 

        $("#lfo-rate").knob({
            'change' : (v) -> rate(v)
        })
        $("#lfo-depth").knob({
            'change' : (v) -> depth(v)
        })
