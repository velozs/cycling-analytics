# @velozs/cycling-analytics

This library offers essential functions to calculate key training metrics:

- **Normalized Power (NP):** Measures workout intensity, accounting for variations in effort and intensity.

- **Intensity Factor (IF):** Quantifies workout intensity relative to an athlete's FTP (Functional Threshold Power).

- **Training Stress Score (TSS):** Provides a numerical value reflecting the physiological stress of a training session.

- **Chronic Training Load (CTL):** Tracks an athlete's long-term training load.

- **Acute Training Load (ATL):** Monitors an athlete's recent training stress.

- **Training Stress Balance (TSB):** Evaluates the balance between fatigue and freshness.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

To get started with `@velozs/cycling-analytics`, simply install it using npm:

```sh
npm install @velozs/cycling-analytics
```

## Usage

To calculate the normalized power (NP) of a workout, use the `calculateNormalizedPower` function:

```js
import { calculateNormalizedPower } from '@velozs/cycling-analytics';

const powerData = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
const np = calculateNormalizedPower(powerData);
```

To calculate the intensity factor (IF) of a workout, use the `calculateIntensityFactor` function:

```js
import { calculateIntensityFactor } from '@velozs/cycling-analytics';

const np = 160; // You can use the result of calculateNormalizedPower
const ftp = 240;
const intensityFactor = calculateIntensityFactor(np, ftp);
```

To calculate the training stress score (TSS) of a workout, use the `calculateTrainingStressScore` function:

```js
import { calculateTrainingStressScore } from '@velozs/cycling-analytics';

const np = 160; // You can use the result of calculateNormalizedPower
const ftp = 240;
const duration = 3600; // Duration of the workout in seconds
const tss = calculateTrainingStressScore(duration, np, ftp);
```

To calculate the chronic training load (CTL) of a workout, use the `calculateChronicTrainingLoad` function:

```js
import { calculateChronicTrainingLoad } from '@velozs/cycling-analytics';

const yesterdayCtl = 100;
const tss = 100; // You can use the result of calculateTrainingStressScore
const ctl = calculateChronicTrainingLoad(yesterdayCtl, tss);
```

You can customize the time window used to calculate the chronic training load (CTL) by passing a third parameter to the `calculateChronicTrainingLoad` function:

```js
import { calculateChronicTrainingLoad } from '@velozs/cycling-analytics';

const yesterdayCtl = 100;
const tss = 100; // You can use the result of calculateTrainingStressScore
const ctl = calculateChronicTrainingLoad(yesterdayCtl, tss, 60); // 60 days
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to extend our sincere gratitude to the authors of "Training + Racing with a Power Meter" for their invaluable contributions to the field of cycling training and power meter analytics. Their work has inspired and informed this library, @velozs/cycling-analytics, and has been a source of knowledge and inspiration for countless cyclists.
