import { getDistance } from '../getDistance.js';

export const silhouette = (data) => {
  const getInternalDistance = (arr, p) =>
    arr.reduce((acc, v) => (acc += getDistance(p, v)), 0) / (arr.length - 1);

  const getExternalDistance = (arr, p) =>
    arr.reduce((acc, v) => (acc += getDistance(p, v)), 0) / arr.length;

  const clustersKoeficients = data.map((cluster, i, arr) => {
    const eachToEachDistance = cluster.map((point) => {
      const externalPoints = arr.filter((_, j) => i !== j).flat();

      const internalDistance = getInternalDistance(cluster, point);
      const externalDistance = getExternalDistance(externalPoints, point);

      return (
        (externalDistance - internalDistance) /
        Math.max(externalDistance, internalDistance)
      );
    });

    const eachToClusterDistance = cluster.map((point) => {
      const externalClusters = arr.filter((_, j) => i !== j);

      const internalDistance = getInternalDistance(cluster, point);
      const externalDistances = externalClusters.map((c) =>
        getExternalDistance(c, point)
      );

      return externalDistances.map(
        (d) => (d - internalDistance) / Math.max(d, internalDistance)
      );
    });

    return {
      eachToEachDistance,
      ind: eachToClusterDistance.flat().sum(),
    };
  });

  const eachToEach = clustersKoeficients
    .map((c) => c.eachToEachDistance)
    .flat();

  const eachToCluster = clustersKoeficients.map((c) => c.ind).flat();

  return {
    clusters: clustersKoeficients.map((c) => c.eachToEachDistance),
    eachToCluster: clustersKoeficients.map((c) => c.ind),
    eachToEachAvarage: eachToEach.sum(),
    eachToClusterAvarage: eachToCluster.sum(),
  };
};
