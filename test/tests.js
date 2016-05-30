QUnit.module( "FrequencyMap tests" );
QUnit.test( "constructor test", function( assert ) {
    var fm = new FrequencyMap();
    assert.ok( fm instanceof FrequencyMap, "Default constructor works");
});
QUnit.test("getFrequency tests", function(assert) {
    var fm = new FrequencyMap();
    assert.strictEqual(fm.getFrequency(0, 9), 110, "A110 is returned correctly");
    assert.strictEqual(fm.getFrequency(1, 9), 220, "A220 is returned correctly");
    assert.strictEqual(fm.getFrequency(2, 9), 440, "A440 is returned correctly");
    assert.strictEqual(fm.getFrequency(3, 9), 880, "A880 is returned correctly");
    assert.strictEqual(fm.getFrequency(4, 9), 1760, "A1760 is returned correctly");
});
