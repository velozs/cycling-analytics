const {
  calculateChronicTrainingLoad,
  calculateAcuteTrainingLoad,
  calculateTrainingStressBalance,
  calculateNormalizedPower,
  calculateIntensityFactor,
  calculateTrainingStressScore,
} = require('../src');

const roundToNearest = (number) => Math.round(number);

describe('normalizedPower', () => {
  test('NP should be 200 for a length of 10 power data array when they are all equal', () => {
    const normalizedPower = calculateNormalizedPower(
      Array.from({ length: 10 }, () => 200)
    );

    expect(normalizedPower).toBe(200);
  });

  test('NP should be 200 for a length of 100 power data array when they are all equal', () => {
    const normalizedPower = calculateNormalizedPower(
      Array.from({ length: 100 }, () => 200)
    );

    expect(normalizedPower).toBe(200);
  });

  test('NP should be 322 for a randomized power data', () => {
    const powers = [
      150, 140, 180, 190, 200, 300, 200, 150, 1900, 1900, 140, 180, 190, 0, 0,
      0, 0, 0, 0, 0, 0, 500, 500, 500, 500, 500, 1900, 2000, 140, 180, 190, 200,
      300, 200, 150, 140, 200, 150, 300, 280, 190, 180, 300, 280, 190, 300, 300,
      280, 190, 300, 280, 190, 200, 300, 280, 190, 300, 280, 190, 180, 190, 200,
      300, 200, 150, 300, 200, 150, 200, 200, 140, 180, 190, 0, 200, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1900, 2000, 140, 180, 190, 200, 300, 200, 150, 140,
      200, 150, 1900, 1900, 140, 180, 190, 140, 180, 190, 140, 180, 190, 140,
      180, 190, 140, 180, 190, 140, 180, 190, 140, 180, 190, 80, 80, 80, 80, 80,
    ];

    const normalizedPower = calculateNormalizedPower(powers);
    expect(roundToNearest(normalizedPower)).toBe(323);
  });
});

describe('intensityFactor', () => {
  test('IF should be 1.0 for NP 200 and FTP 200', () => {
    const intensityFactor = calculateIntensityFactor(200, 200);

    expect(intensityFactor).toBe(1.0);
  });

  test('IF should be 0.5 for NP 100 and FTP 200', () => {
    const intensityFactor = calculateIntensityFactor(100, 200);

    expect(intensityFactor).toBe(0.5);
  });
});

describe('trainingStressScore', () => {
  test('TSS should be 100 for NP 200, FTP 200 and duration 1 hour', () => {
    const tss = calculateTrainingStressScore(3600, 200, 200);

    expect(roundToNearest(tss)).toBe(100);
  });

  test('TSS should be 50 for NP 100, FTP 200 and duration 1 hour', () => {
    const tss = calculateTrainingStressScore(3600, 100, 200);

    expect(roundToNearest(tss)).toBe(25);
  });

  test('TSS should be 53 for NP 157, FTP 241 and duration 1h15m', () => {
    const tss = calculateTrainingStressScore(4500, 157, 241);

    expect(roundToNearest(tss)).toBe(53);
  });
});

describe('chronicTrainingLoad', () => {
  test('CTL 54 increases to 59 after 255 TSS', () => {
    const currentChronicTrainingLoad = calculateChronicTrainingLoad(54, 255);

    expect(roundToNearest(currentChronicTrainingLoad)).toBe(59);
  });

  test('CTL 28 increases to 30 after 122 TSS', () => {
    const currentChronicTrainingLoad = calculateChronicTrainingLoad(28, 122);

    expect(roundToNearest(currentChronicTrainingLoad)).toBe(30);
  });

  test('CTL 30 decreases to 34 after 192 TSS', () => {
    const currentChronicTrainingLoad = calculateChronicTrainingLoad(30, 192);

    expect(roundToNearest(currentChronicTrainingLoad)).toBe(34);
  });

  test('60tss/d takes 2 months to get 50 CTL', () => {
    let iterations = 0;
    for (
      let currentChronicTrainingLoad = 0;
      currentChronicTrainingLoad < 50;
      currentChronicTrainingLoad = calculateChronicTrainingLoad(
        currentChronicTrainingLoad,
        60
      )
    ) {
      iterations += 1;
    }

    expect(iterations).toBeGreaterThan(60);
  });
});

describe('acuteTrainingLoad', () => {
  test('ATL 61 increases to 89 after 255 TSS', () => {
    const acuteTrainingLoad = calculateAcuteTrainingLoad(61, 255);

    expect(roundToNearest(acuteTrainingLoad)).toBe(89);
  });
});

describe('trainingStressBalance', () => {
  test('TSB should be -32 when CTL is 79 and ATL is 97', () => {
    const tsb = calculateTrainingStressBalance(81, 113);
    expect(roundToNearest(tsb)).toBe(-32);
  });
});
