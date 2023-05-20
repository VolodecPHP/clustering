import {
  getClusters,
  getKMeansClusters,
  dendogram,
  silhouetteResults,
} from './sections/clustering.js';
import { getDistance } from './utils/getDistance.js';
import { MOCK_DATA_LARGE_DISPERSION } from './utils/mocks/mockDataLargeDispersion.js';
import { MOCK_DATA_MEDIUM_DISPERSION } from './utils/mocks/mockDataMediumDispersion.js';
import { MOCK_DATA_SMALL_DISP } from './utils/mocks/mockDataSmallDispersion.js';
import { MOCK_DATA_TEST_CENTERS } from './utils/mocks/mockDataTestCenters.js';

const TEST_DATA = {
  centers: [
    {
      x: 0,
      y: 4,
    },
    {
      x: 4,
      y: 0,
    },
    {
      x: -4,
      y: 0,
    },
    {
      x: 0,
      y: 8,
    },
  ],
  dispersion: 0.9,
  numberOfClusters: 4,
  numberOfPoints: 100,
};

const data = getClusters(
  TEST_DATA.centers,
  TEST_DATA.dispersion,
  TEST_DATA.numberOfPoints
);

const getInitialCentroids = (data, n, method) => {
  const copy = JSON.parse(JSON.stringify(data.flat()));

  if (method === 'random') {
    return copy.sort(() => Math.random() - Math.random()).slice(0, n);
  }

  if (method === 'k++') {
    const centroids = [copy[Math.floor(Math.random() * copy.length)]];
    const distances = new Array(copy.length).fill(Number.MAX_VALUE);

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < copy.length; j++) {
        const p = copy[j];
        const distancesToCentroids = centroids.map((c) => getDistance(p, c));
        distances[j] = Math.min(...distancesToCentroids);
      }

      const sumDistances = distances.reduce((acc, d) => acc + d ** 2, 0);
      const probabilities = distances.map((d) => d ** 2 / sumDistances);
      const cumulativeProbabilities = [];
      let cumulativeProbability = 0;
      for (let j = 0; j < copy.length; j++) {
        cumulativeProbability += probabilities[j];
        cumulativeProbabilities.push(cumulativeProbability);
      }
      const r = Math.random();
      const nextCentroidIndex = cumulativeProbabilities.findIndex(
        (p) => p >= r
      );
      centroids.push(copy[nextCentroidIndex]);
    }

    return centroids;
  }
};

dendogram(data);

const kMeansResult = getKMeansClusters(
  data,
  i,
  getInitialCentroids(data, i, 'k++')
);

const s = silhouetteResults(kMeansResult);

console.log(s);
