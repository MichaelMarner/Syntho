#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#



class @FrequencyMap

    constructor: ->
        @map = [ [523.251,
                    554.365,
                     587.33,
                     622.254,
                     659.255,
                     698.456,
                     739.989,
                     783.991,
                     830.609,
                     880,
                     932.328
                     987.767,
                     1046.5] ]

        @octave = 0;

    getFrequency: (note) ->
        console.log(note)
        return @map[@octave][note] if note >=0 && note <= 12
