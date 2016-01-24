class FrequencyMap { 

    constructor () {
        this.map = [ ];
        this.map.push(this.generateOctave(4));
        this.map.push(this.generateOctave(16));
        this.map.push(this.generateOctave(40));
        this.map.push(this.generateOctave(52));
        this.map.push(this.generateOctave(64));
        this.map.push(this.generateOctave(76));
    }

    getFrequency (octave, note) {
        if (note >= 0 && note <= 12) {
            return this.map[octave][note];
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
        let relativeNote = note - 49
        return a * Math.pow(twelveRoot2, relativeNote);
    }
}

