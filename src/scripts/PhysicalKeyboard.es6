
class PhysicalKeyboard {

    constructor() {
        $(document).keydown( (event) => this.keydown(event));
        $(document).keyup( (event) => this.keyup(event));
        this.scanner = [0,0,0,0,0,0,0,0,0,0,0,0];
        this.lowPriority = false;
    }

    setKeyPriority(priority) {
        if (priority == "high")
            this.lowPriority = false
        else if (priority == "low")
            this.lowPriority = true
        else
            throw "Invalid key priority"
    }

    keydown (e) {
        let toTrigger = !this.isKeyDown()
        let note = this.getNoteFromKeyCode(e.keyCode)

        if (note >= 0) {
            this.scanner[note ] = 1
            PubSub.publish('Keyboard', this.getActiveNote());
            if (toTrigger) {
                PubSub.publish('Trigger', 1);
            }
        }
    }

    keyup(e) {
        let note = this.getNoteFromKeyCode(e.keyCode)
        if (note >=0) {
            this.scanner[note] = 0;
        }
        PubSub.publish('Keyboard', this.getActiveNote());
        if (!this.isKeyDown())
             PubSub.publish('Trigger', 0);
    }


    isKeyDown() {
        return this.getActiveNote() >= 0;
    }


    getActiveNote() {
        if (this.lowPriority) {
            for (let i=0; i < this.scanner.length; i++) {
                if (this.scanner[i] == 1)
                    return i;
            }
        }
        else {
            for (let i=this.scanner.length-1; i >= 0; i--) {
                if (this.scanner[i] == 1)
                    return i;
            }
        }
        return -1
    }

    getNoteFromKeyCode(keyCode) {
        switch (keyCode) {
            case 67: return 0;
            case 70: return 1;
            case 86: return 2;
            case 71: return 3;
            case 66: return 4;
            case 78: return 5;
            case 74: return 6;
            case 77: return 7;
            case 75: return 8;
            case 188: return 9;
            case 76: return 10;
            case 190: return 11;
            case 191: return 12;
            default: return -1;
        }
    }
}
