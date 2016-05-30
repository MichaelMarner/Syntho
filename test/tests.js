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
QUnit.test("getFrequency tests", function(assert) {
    var fm = new FrequencyMap();
    assert.close(fm.getFrequency(0, 9), 13.75, null, "A0 is returned correctly");
    assert.close(fm.getFrequency(1, 9), 27.5, null,  "A1 is returned correctly");
    assert.close(fm.getFrequency(2, 9), 55, null,  "A2 is returned correctly");
    assert.close(fm.getFrequency(3, 9), 110, null,  "A3 is returned correctly");
    assert.close(fm.getFrequency(4, 9), 220, null,  "A4 is returned correctly");
    assert.close(fm.getFrequency(5, 9), 440, null,  "A440 is returned correctly");
    assert.close(fm.getFrequency(6, 9), 880, null,  "A6 is returned correctly");
    assert.close(fm.getFrequency(7, 9), 1760, null,  "A7 is returned correctly");
});
