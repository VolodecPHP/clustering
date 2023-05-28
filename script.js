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
  // centers: [
  //   {
  //     x: -2.5,
  //     y: 2,
  //   },
  //   {
  //     x: 0,
  //     y: 2.5,
  //   },
  //   {
  //     x: 2,
  //     y: 4,
  //   },
  //   {
  //     x: 4,
  //     y: 4,
  //   },
  // ],
  centers: [
    {
      x: 0,
      y: 0,
    },
    {
      x: -2.5,
      y: 2,
    },
    {
      x: 0.5,
      y: 4,
    },
    {
      x: 3,
      y: 3,
    },
    {
      x: 2,
      y: 0.7,
    },
  ],
  dispersion: 0.3,
  numberOfClusters: 5,
  numberOfPoints: 1000,
};

const data = getClusters(
  TEST_DATA.centers,
  TEST_DATA.dispersion,
  TEST_DATA.numberOfPoints,
  MOCK_DATA_TEST_CENTERS
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

// dendogram(data);

for (let i = 5; i <= 6; i++) {
  let result = {
    min: 1,
    max: 0,
    lessThanTen: 0,
  };

  for (let j = 0; j < 1; j++) {
    const kMeansResult = getKMeansClusters(
      data,
      i,
      getInitialCentroids(data, i, 'k++')
    );

    const s = silhouetteResults(kMeansResult);

    if (s.eachToClusterAvarage < result.min) {
      result.min = +s.eachToEachAvarage;
    }

    if (s.eachToClusterAvarage > result.max) {
      result.max = +s.eachToEachAvarage;
    }

    result.lessThanTen = kMeansResult.clusters.filter(
      (arr) => arr.length <= 800
    ).length;

    console.log('N=', i);
    console.log(s);
  }

  // console.log('N=', i);
  // console.log(s);
  // // console.log(...[Object.values(result).map((v) => Number(v.toFixed(3)))]);
  // console.log('*****');
}
