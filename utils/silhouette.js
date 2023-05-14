import { getDistance } from './getDistance.js';

export const silhouette = (data) => {
  const clustersKoeficients = data.map((cluster, i, arr) => {
    return cluster.map((point) => {
      const externalPoints = arr.filter((_, j) => i !== j).flat();

      const internalDistance =
        cluster.reduce((acc, v) => {
          acc += getDistance(point, v);
          return acc;
        }, 0) /
        (cluster.length - 1);

      const externalDistance =
        externalPoints.reduce((acc, v) => {
          acc += getDistance(point, v);
          return acc;
        }, 0) / externalPoints.length;

      return (
        (externalDistance - internalDistance) /
        Math.max(externalDistance, internalDistance)
      );
    });
  });

  return {
    clusters: clustersKoeficients,
    average:
      clustersKoeficients.flat().reduce((acc, v) => (acc += v), 0) /
      clustersKoeficients.flat().length,
  };
};
