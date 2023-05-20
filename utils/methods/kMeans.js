import { getDistance } from '../getDistance.js';
import { getRandomColor } from '../getRandomColor.js';

export const kMeans = (data, k, initialCentroids) => {
  let centroids = [...initialCentroids];
  let clusters = [];

  for (let i = 0; i < k; i++) {
    clusters.push([]);
  }

  while (true) {
    for (let i = 0; i < data.length; i++) {
      let minDistance = Infinity;
      let clusterIndex = NaN;

      for (let j = 0; j < centroids.length; j++) {
        let distance = getDistance(data[i], centroids[j]);

        if (distance < minDistance) {
          minDistance = distance;
          clusterIndex = j;
        }
      }

      clusters[clusterIndex].push(data[i]);
    }

    let newCentroids = [];
    for (let i = 0; i < k; i++) {
      let sumX = 0;
      let sumY = 0;

      for (let j = 0; j < clusters[i].length; j++) {
        sumX += clusters[i][j].x;
        sumY += clusters[i][j].y;
      }

      const theoreticalCentroid = {
        x: sumX / clusters[i].length,
        y: sumY / clusters[i].length,
      };

      newCentroids.push(theoreticalCentroid);
      // let bestCurrentCentroid = null;
      // let bestDistance = Infinity;
      // clusters[i].forEach((point) => {
      //   const d = getDistance(point, theoreticalCentroid);

      //   if (d < bestDistance) {
      //     bestCurrentCentroid = { ...point };
      //     bestDistance = d;
      //   }
      // });

      // newCentroids.push(bestCurrentCentroid);
    }

    let converged = true;
    for (let i = 0; i < k; i++) {
      if (
        centroids[i].x !== newCentroids[i].x ||
        centroids[i].y !== newCentroids[i].y
      ) {
        converged = false;
        break;
      }
    }

    if (converged) {
      break;
    }
    centroids = newCentroids;

    // Clear clusters
    for (let i = 0; i < k; i++) {
      clusters[i] = [];
    }
  }

  return {
    clusters,
    centroids: centroids.map((centroid) => ({
      ...centroid,
      color: getRandomColor(),
    })),
  };
};
