#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#



class @FrequencyMap

    constructor: ->
        @map = [ ]

        @octave = 0;
        map1 = @generateOctave(52)
        @map.push(map1)

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
