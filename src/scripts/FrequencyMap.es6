class FrequencyMap {

    constructor () {
        this.frequencies = [ ];
        for (let i=0; i < 128; i++) {
            this.frequencies.push(this.calculateFrequency(i));
        }
    }

    getFrequency (octave, note) {
        if (note >= 0 && note <= 12) {
            return this.frequencies[octave*12 + note];
        }
        return 0;
    }

    generateOctave(startingNote) {
        let octave = []
        for (let i=startingNote; i <= startingNote+12; i++)
            octave.push(this.calculateFrequency(i))
        return octave;
    }

    calculateFrequency(note) {
        const twelveRoot2 = 1.0594630943592952645
        const a = 440
        let relativeNote = note - 69
        return a * Math.pow(twelveRoot2, relativeNote);
    }
}
