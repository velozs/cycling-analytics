const chronicTrainingLoadTimeConstant = 42;
const acuteTrainingLoadTimeConstant = 7;
const normalizedPowerWindowSizeConstant = 30;

/**
 * Calculates the rolling normalized power (NP).
 * @param {number[]} powerData - Array of power readings.
 * @param {number} windowSize - Size of the rolling window (default: 30)
 * @returns {number} - Rolling normalized power (NP).
 */
function calculateNormalizedPower(
  powerData,
  windowSize = normalizedPowerWindowSizeConstant
) {
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

/**
 * Calculates the intensity factor by dividing the normalized power by the functional threshold power (FTP).
 * @param {number} normalizedPower - The normalized power value.
 * @param {number} ftp - The functional threshold power value.
 * @returns {number} - The intensity factor.
 */
function calculateIntensityFactor(normalizedPower, ftp) {
  return normalizedPower / ftp;
}

/**
 * Calculates the Training Stress Score (TSS) based on the given parameters.
 * @param {number} durationInSeconds - The duration of the training in seconds.
 * @param {number} normalizedPower - The normalized power of the training.
 * @param {number} ftp - The Functional Threshold Power (FTP).
 * @returns {number} - The Training Stress Score (TSS).
 */
function calculateTrainingStressScore(durationInSeconds, normalizedPower, ftp) {
  const intensityFactor = calculateIntensityFactor(normalizedPower, ftp);
  return (
    ((durationInSeconds * normalizedPower * intensityFactor) / (ftp * 3600)) *
    100
  );
}

/**
 * Calculates the chronic training load.
 * @param {number} yesterdayChronicTrainingLoad - The yesterday's chronic training load.
 * @param {number} trainingStressScore - The training stress score.
 * @param {number} timeConstant - The time constant for calculating the chronic training load. (Optional)
 * @returns {number} The calculated chronic training load.
 */
function calculateChronicTrainingLoad(
  yesterdayChronicTrainingLoad,
  trainingStressScore,
  timeConstant = chronicTrainingLoadTimeConstant
) {
  return (
    (1 - 1 / timeConstant) * yesterdayChronicTrainingLoad +
    (1 / timeConstant) * trainingStressScore
  );
}

/**
 * Calculates the acute training load.
 * @param {number} yesterdayAcuteTrainingLoad - The yesterday's acute training load.
 * @param {number} trainingStressScore - The training stress score.
 * @param {number} timeConstant - The time constant for calculating the acute training load.
 * @returns {number} The calculated acute training load.
 */
function calculateAcuteTrainingLoad(
  yesterdayAcuteTrainingLoad,
  trainingStressScore,
  timeConstant = acuteTrainingLoadTimeConstant
) {
  return (
    (1 - 1 / timeConstant) * yesterdayAcuteTrainingLoad +
    (1 / timeConstant) * trainingStressScore
  );
}

/**
 * Calculates the training stress balance.
 * @param {number} yesterdayChronicTrainingLoad - The current chronic training load.
 * @param {number} yesterdayAcuteTrainingLoad - The current acute training load.
 * @returns {number} - The training stress balance.
 */
function calculateTrainingStressBalance(
  yesterdayChronicTrainingLoad,
  yesterdayAcuteTrainingLoad
) {
  return yesterdayChronicTrainingLoad - yesterdayAcuteTrainingLoad;
}

module.exports = {
  calculateNormalizedPower,
  calculateIntensityFactor,
  calculateTrainingStressScore,
  calculateChronicTrainingLoad,
  calculateAcuteTrainingLoad,
  calculateTrainingStressBalance,
};
