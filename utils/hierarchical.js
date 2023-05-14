export const hierarchicalClustering = (data) => {
  let clusters = data.map((d, i) => ({
    id: d.name || i.toString(),
    items: [d],
    distance: 0,
    cluster1Level: 0,
    cluster2Level: 0,
  }));
  let hierarchicalClusters = [];

  const findClosestClusters = (clusters) => {
    let minDistance = Infinity;
    let closestClusters = {};
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        let distance = distanceFunc(clusters[i], clusters[j]);
        if (distance < minDistance) {
          minDistance = distance;
          closestClusters = { i, j };
        }
      }
    }
    return closestClusters;
  };

  let distanceFunc = (cluster1, cluster2) => {
    let minDistance = Infinity;
    for (let item1 of cluster1.items) {
      for (let item2 of cluster2.items) {
        let distance = Math.sqrt(
          (item1.x - item2.x) ** 2 + (item1.y - item2.y) ** 2
        );
        if (distance < minDistance) {
          minDistance = distance;
        }
      }
    }
    return minDistance;
  };

  while (clusters.length > 1) {
    let closestClusters = findClosestClusters(clusters);
    let mergedCluster = {
      id: clusters[closestClusters.i].id + ',' + clusters[closestClusters.j].id,
      items: [
        ...clusters[closestClusters.i].items,
        ...clusters[closestClusters.j].items,
      ],
      distance: distanceFunc(
        clusters[closestClusters.i],
        clusters[closestClusters.j]
      ),
      cluster1: clusters[closestClusters.i].id,
      cluster2: clusters[closestClusters.j].id,
    };
    clusters = clusters.filter(
      (c, i) => i !== closestClusters.i && i !== closestClusters.j
    );
    clusters.push(mergedCluster);
    hierarchicalClusters.push(clusters.slice());
  }

  return [...hierarchicalClusters];
};
