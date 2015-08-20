#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#



class @FrequencyMap

    constructor: ->
        @map = [ ]

        @octave = 2;
        @map.push(@generateOctave(4))
        @map.push(@generateOctave(16))
        @map.push(@generateOctave(40))
        @map.push(@generateOctave(52))
        @map.push(@generateOctave(64))
        @map.push(@generateOctave(76))

    getFrequency: (note) ->
        return @map[@octave][note] if note >=0 && note <= 12


    generateOctave: (startingNote) ->
        octave = []
        for num in [startingNote..startingNote+12]
            octave.push(@calculateFrequency(num))
        return octave;


    calculateFrequency: (note) ->
        twelveRoot2 = 1.0594630943592952645
        a = 440
        relativeNote = note - 49
        return a * Math.pow(twelveRoot2, relativeNote);
