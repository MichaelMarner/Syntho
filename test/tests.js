QUnit.assert.close = function(number, expected, error, message ) {
    if (error === void 0 || error === null ) {
        error = 0.00001;
    }
    var result = number === expected || (number<expected + error && number > expected - error) || false;
    this.push(result, number, expected, message);
}
QUnit.module( "FrequencyMap tests" );
QUnit.test( "constructor test", function( assert ) {
    var fm = new FrequencyMap();
    assert.ok( fm instanceof FrequencyMap, "Default constructor works");
});
QUnit.test("getNoteIndex(octave, note) tests", function(assert) {
    var fm = new FrequencyMap();

    // Just enough tests to make sure the multiplication is working
    assert.strictEqual(fm.getNoteIndex(0, 9), 9, "Note 9 is returned correctly");
    assert.strictEqual(fm.getNoteIndex(1, 4), 16, "Note 16 is returned correctly");
    assert.strictEqual(fm.getNoteIndex(2, 0), 24, "Note 24 is returned correctly");
    assert.strictEqual(fm.getNoteIndex(3, 7), 43, "Note 43 is returned correctly");
    assert.strictEqual(fm.getNoteIndex(4, 2), 50, "Note 50 is returned correctly");
    assert.strictEqual(fm.getNoteIndex(5, 6), 66, "Note 66 is returned correctly");
});

QUnit.test("getFrequency(note) tests", function(assert) {
    var fm = new FrequencyMap();

    // Test A440 to ensure the offset is correct
    assert.close(fm.getFrequency(69), 440, null, "A5 is returned correctly");

    // Test a few to make sure the algorithm works
    assert.close(fm.getFrequency(9), 13.75, null, "Note 9 = 13.75Hz");
    assert.close(fm.getFrequency(16), 20.6017223071, null,  "Note 16 = 13.75Hz");
    assert.close(fm.getFrequency(24), 32.7031956626, null,  "Note 24 = 32Hz");
    assert.close(fm.getFrequency(43), 97.9988589954, null,  "Note 43 = 97Hz");
    assert.close(fm.getFrequency(50), 146.8323839587, null,  "Note 50 = 146Hz");
    assert.close(fm.getFrequency(66), 369.9944227116, null,  "Note 66 = 369Hz");

});
