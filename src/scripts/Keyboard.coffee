#
# Syntho - A Web based Synthesizer
# by Michael Marner <michael@20papercups.net>
#


# Keyboard for triggering various aspects of the synth
class @KeyboardInput

    # Creates a KeyboardInput object and binds to the document keyup/keydown
    # events.
    constructor: ->
        self = this
        $(document).keydown -> self.keydown(event)
        $(document).keyup   -> self.keyup(event)
        @scanner = [0,0,0,0,0,0,0,0,0,0,0,0]
        @lowPriority = false
    

    setKeyPriority: (priority) ->
        if (priority == "high")
            @lowPriority = false
        else if (priority == "low")
            @lowPriority = true
        else
            throw "Invalid key priority"

    # Handler for a keydown event
    keydown: (event) ->
        toTrigger = !@isKeyDown()
        note = @getNoteFromKeyCode(event.keyCode)
        if (note >= 0)
            @scanner[note ] = 1
            PubSub.publish('Keyboard', @getActiveNote());
            if (toTrigger)
                PubSub.publish('Trigger', 1);

    # Handler for a keyup event
    keyup: (event) ->
        note = @getNoteFromKeyCode(event.keyCode)
        @scanner[note] = if note >= 0 then 0 
        PubSub.publish('Keyboard', @getActiveNote());
        if (!@isKeyDown())
             PubSub.publish('Trigger', 0);


    isKeyDown: ->
        return @getActiveNote() >= 0


    # Gets the active note that should be playing, low note priority.
    getActiveNote: ->
        if (@lowPriority)
            for scan, i in @scanner
                if scan == 1
                    return i
        else
            for scan, i in @scanner.slice(0).reverse()
                if scan == 1
                    return 12-i

        return -1

    # Converts a note from a keyboard (US layout) to a note in the octave
    getNoteFromKeyCode: (keyCode) ->
        return 0 if keyCode == 67
        return 1 if keyCode == 70 
        return 2 if keyCode == 86 
        return 3 if keyCode == 71 
        return 4 if keyCode == 66 
        return 5 if keyCode == 78 
        return 6 if keyCode == 74 
        return 7 if keyCode == 77 
        return 8 if keyCode == 75 
        return 9 if keyCode == 188 
        return 10 if keyCode == 76 
        return 11 if keyCode == 190 
        return 12 if keyCode == 191 
        return -1

