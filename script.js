import {
  getClusters,
  getKMeansClusters,
  dendogram,
  silhouetteResults,
} from './sections/clustering.js';

const TEST_DATA = {
  centers: [
    { x: 4, y: 4 },
    { x: 0, y: 3 },
    { x: -3, y: 2 },
    { x: 2, y: 4 },
  ],
  dispersion: 0.2,
  numberOfClusters: 4,
  numberOfPoints: 20,
};

const data = getClusters(
  TEST_DATA.centers,
  TEST_DATA.dispersion,
  TEST_DATA.numberOfPoints
);

dendogram(data);

const kMeansResult = getKMeansClusters(data, 4);

const s = silhouetteResults(kMeansResult);
