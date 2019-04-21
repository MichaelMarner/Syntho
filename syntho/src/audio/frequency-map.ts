/**
 * FrequencyMap converts notes into frequencies needed for synth oscillators.
 *
 * @class FrequencyMap
 */
export class FrequencyMap {
  private frequencies: Array<number>;
  /**
   * Creates a new FrequencyMap object.
   *
   * Look, we need an object here because what we really want is a lookup table.
   * Calculating the frequencies is sloooow because it involves Math.pow, so we
   * precompute them and store them in this object.
   *
   * @constructor
   */
  constructor() {
    this.frequencies = [];
    for (let i = 0; i < 128; i++) {
      this.frequencies.push(this.calculateFrequency(i));
    }
  }

  /**
   * Returns the MIDI note index for a given octave/note combination.
   *
   * @param {Number} octave the octave offset. For example, Middle C is Octave 5
   * @param {Number} note The note, a number between 0 and 12, starting with C.
   */
  getNoteIndex(octave: number, note: number) {
    if (note >= 0 && note <= 12) {
      return octave * 12 + note;
    }
    return 0;
  }

  /**
   * Returns the frequency for a note index.
   * The note indices should be the same as what General MIDI uses.
   *
   * @param {number} note A note index between 0 and 127
   */
  getFrequency(note: number) {
    if (note >= 0 && note < 128) {
      return this.frequencies[note];
    }
    return 0;
  }

  generateOctave(startingNote: number) {
    let octave = [];
    for (let i = startingNote; i <= startingNote + 12; i++) octave.push(this.calculateFrequency(i));
    return octave;
  }

  /**
   * Calculates a frequency for a given note.
   * You should use getFrequency instead.
   * @private
   */
  calculateFrequency(note: number) {
    const twelveRoot2 = 1.0594630943592952645;
    const a = 440;
    let relativeNote = note - 69;
    return a * Math.pow(twelveRoot2, relativeNote);
  }
}
