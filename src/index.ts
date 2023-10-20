const chronicTrainingLoadTimeConstant = 42;
const acuteTrainingLoadTimeConstant = 7;
const normalizedPowerWindowSizeConstant = 30;

export function calculateNormalizedPower(
  powerData: number[],
  windowSize: number = normalizedPowerWindowSizeConstant
): number {
  const rollingAveragePower = [];

  // Make sure windowSize is not larger than powerData length
  // If it is, set windowSize to powerData length
  // This is to prevent the rolling window from going out of bounds
  // For example, if windowSize is 30, but powerData length is 20
  // We can't calculate the rolling average because we don't have enough elements
  // So we set windowSize to 20
  const windowSizeCorrected =
    windowSize > powerData.length ? powerData.length : windowSize;

  // Calculate rolling average power
  // Start from the element at the index of windowSize - 1
  // This is because we need to have enough elements to calculate the rolling average
  // For example, if windowSize is 30, we need to have 30 elements to calculate the rolling average
  // So we start from the element at index 29 (30 - 1)
  for (let i = windowSizeCorrected - 1; i < powerData.length; i += 1) {
    const rollingAvg =
      powerData
        .slice(i - windowSizeCorrected + 1, i + 1)
        .reduce((a, b) => a + b) / windowSizeCorrected;
    rollingAveragePower.push(rollingAvg);
  }

  let rollingNormalizedPower = 0;

  // Calculate rolling normalized power
  // Raise each rolling average power to the 4th power
  // Then add it to rollingNormalizedPower
  for (let i = 0; i < rollingAveragePower.length; i += 1) {
    rollingNormalizedPower += rollingAveragePower[i] ** 4;
  }

  // Calculate final rolling normalized power
  // Divide rollingNormalizedPower by the number of rolling average power elements
  // Then raise it to the 1/4th power
  rollingNormalizedPower =
    (rollingNormalizedPower / rollingAveragePower.length) ** (1 / 4);

  return rollingNormalizedPower;
}

export function calculateIntensityFactor(
  normalizedPower: number,
  ftp: number
): number {
  return normalizedPower / ftp;
}

export function calculateTrainingStressScore(
  durationInSeconds: number,
  normalizedPower: number,
  ftp: number
): number {
  const intensityFactor = calculateIntensityFactor(normalizedPower, ftp);
  return (
    ((durationInSeconds * normalizedPower * intensityFactor) / (ftp * 3600)) *
    100
  );
}

export function calculateChronicTrainingLoad(
  yesterdayChronicTrainingLoad: number,
  trainingStressScore: number,
  timeConstant: number = chronicTrainingLoadTimeConstant
): number {
  return (
    (1 - 1 / timeConstant) * yesterdayChronicTrainingLoad +
    (1 / timeConstant) * trainingStressScore
  );
}

export function calculateAcuteTrainingLoad(
  yesterdayAcuteTrainingLoad: number,
  trainingStressScore: number,
  timeConstant: number = acuteTrainingLoadTimeConstant
): number {
  return (
    (1 - 1 / timeConstant) * yesterdayAcuteTrainingLoad +
    (1 / timeConstant) * trainingStressScore
  );
}

export function calculateTrainingStressBalance(
  yesterdayChronicTrainingLoad: number,
  yesterdayAcuteTrainingLoad: number
): number {
  return yesterdayChronicTrainingLoad - yesterdayAcuteTrainingLoad;
}
