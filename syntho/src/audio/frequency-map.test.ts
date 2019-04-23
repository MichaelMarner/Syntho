import { FrequencyMap } from './frequency-map';

describe('FrequencyMap', () => {
  test('constructor', () => {
    const fm = new FrequencyMap();
    expect(fm).toBeDefined();
  });
  test('getNoteIndex works', () => {
    const fm = new FrequencyMap();
    // Just enough tests to make sure the multiplication is working
    expect(fm.getNoteIndex(0, 9)).toBe(9);
    expect(fm.getNoteIndex(1, 4)).toBe(16);
    expect(fm.getNoteIndex(2, 0)).toBe(24);
    expect(fm.getNoteIndex(3, 7)).toBe(43);
    expect(fm.getNoteIndex(4, 2)).toBe(50);
    expect(fm.getNoteIndex(5, 6)).toBe(66);
  });
  test('getFrequency', () => {
    const fm = new FrequencyMap();
    // Test A440 to ensure the offset is correct
    expect(fm.getFrequency(69)).toBe(440);
    // Test a few to make sure the algorithm works
    expect(fm.getFrequency(9)).toBeCloseTo(13.75);
    expect(fm.getFrequency(16)).toBeCloseTo(20.6017223071);
    expect(fm.getFrequency(24)).toBeCloseTo(32.7031956626);
    expect(fm.getFrequency(43)).toBeCloseTo(97.9988589954);
    expect(fm.getFrequency(50)).toBeCloseTo(146.8323839587);
    expect(fm.getFrequency(66)).toBeCloseTo(369.9944227116);
  });
});
