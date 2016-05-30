
class SynthUI {
    constructor(syntho) {
        this.syntho = syntho;
        this.setupOctaves()
        this.setupTuning()
        this.setupVCOVolumes()
        this.setupFilter()
        this.setupLFO()
        this.setupADSR()
        this.setupScreenKeyboard();
    }

    setupOctaves() {
        // VCO Types
        $("input[name=vco1-type]").change( () => {
            let value = $("input[name=vco1-type]:checked").val()
            this.syntho.vco1.type = value
        });

        $("input[name=vco2-type]").change(() => {
            let value = $("input[name=vco2-type]:checked").val()
            this.syntho.vco2.type = value
        });

        $("input[name=vco3-type]").change(() => {
            let value = $("input[name=vco3-type]:checked").val()
            this.syntho.vco3.type = value
        });

        $("#vco1-octave").knob({
            'change' : (value) => { this.syntho.vco1.octave = Math.round(value)}
        })
        $("#vco2-octave").knob({
            'change' : (value) => { this.syntho.vco2.octave = Math.round(value)}
        })
        $("#vco3-octave").knob({
            'change' : (value) => { this.syntho.vco3.octave = Math.round(value)}
        })
    }


    setupTuning() {
        $("#vco1-detune").knob({
            'change' : (v) => {
                this.syntho.vco1.detune.value = Math.round(v)
            }
        })
        $("#vco2-detune").knob({
            'change' : (v) => {
                this.syntho.vco2.detune.value = Math.round(v)
            }
        })
        $("#vco3-detune").knob({
            'change' : (v) => {
                this.syntho.vco3.detune.value = Math.round(v)
            }
        })
    }
    setupVCOVolumes() {
        $("#vco1-vol").knob({
            'change' : (v) => {
                this.syntho.vco1.amp.gain.value = v / 100.0;
            }
        })
        $("#vco2-vol").knob({
            'change' : (v) => {
                this.syntho.vco2.amp.gain.value = v / 100.0;
            }
        })
        $("#vco3-vol").knob({
            'change' : (v) => {
                this.syntho.vco3.amp.gain.value = v / 100.0;
            }
        })
    }

    setupFilter() {

        $("#filter-cutoff").knob({
            'change' : (v) => {
                this.syntho.setFilterFrequency(v);
            }
        })
        $("#filter-peak").knob({
            'change' : (v) => {
                this.syntho.filter.Q.value = v
            }
        })

        $("input[name=filter-mod]").change(() => {
            let value = $("input[name=filter-mod]:checked").val()
            if (value == "fixed") {
                this.syntho.filter.lfoHookup.gain.value = 0
                this.syntho.resetFilter()
                this.syntho.filter.mod = 'fixed'
            }
            else if (value == "lfo") {
                this.syntho.filter.lfoHookup.gain.value = 8
                this.syntho.resetFilter()
                this.syntho.filter.mod = 'lfo'
            }
            else if (value="adsr") {
                this.syntho.filter.lfoHookup.gain.value = 0
                this.syntho.filter.mod = 'adsr'
            }
        });
    }


    setupLFO() {
        $("input[name=lfo-type]").change( () => {
            let value = $("input[name=lfo-type]:checked").val()
            this.syntho.lfo.type = value
        });

        $("#vco1-lfo").click( () => {
            if (this.syntho.vco1.lfoHookup.gain.value  == 1) {
                this.syntho.vco1.lfoHookup.gain.value = 0
            }
            else {
                this.syntho.vco1.lfoHookup.gain.value = 1
            }
        });

        $("#vco2-lfo").click( () => {
            if (this.syntho.vco2.lfoHookup.gain.value  == 1) {
                this.syntho.vco2.lfoHookup.gain.value = 0
            }
            else {
                this.syntho.vco2.lfoHookup.gain.value = 1
            }
        });

        $("#vco3-lfo").click( () => {
            if (this.syntho.vco3.lfoHookup.gain.value  == 1) {
                this.syntho.vco3.lfoHookup.gain.value = 0
            }
            else {
                this.syntho.vco3.lfoHookup.gain.value = 1
            }
        });

        $("#lfo-rate").knob({
            'change' : (v) => {
                this.syntho.lfo.frequency.value = v
            }
        })
        $("#lfo-depth").knob({
            'change' : (v) => {
                this.syntho.lfo.amp.gain.value = v
            }
        })
    }


    setupADSR () {
        $("input[name=vca-mode]").change( () => {
            let value = $("input[name=vca-mode]:checked").val()
            this.syntho.vca.mode = value
        });

        $("#adsr-attack").knob({
            'change' : (v) => {
                this.syntho.attack = v
            }
        })
        $("#adsr-decay").knob({
            'change' : (v) => {
                this.syntho.decay = v
            }
        })
        $("#adsr-sustain").knob({
            'change' : (v) => {
                this.syntho.sustain = v
            }
        })
        $("#adsr-release").knob({
            'change' : (v) => {
                this.syntho.release = v
            }
        })
    }

    setupScreenKeyboard() {
        $(".keyboard").mousedown((event) => {
            PubSub.publish('Keyboard', event.target.id);
            PubSub.publish('Trigger', 1);
        });
        $(".keyboard").mouseup((event) => {
            PubSub.publish('Trigger', 0);
        });
    }
}
