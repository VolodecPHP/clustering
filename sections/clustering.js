import {
  getRandomId,
  insertHtml,
  draw,
  randomPointInCircle,
  kMeans,
  hierarchicalClustering,
  silhouette,
} from '../utils/index.js';

export const getClusters = (centers, R, numberOfPoints, MOCKED_DATA) => {
  const plotId1 = getRandomId();

  let knownClusters = [];

  if (MOCKED_DATA) {
    knownClusters = [...MOCKED_DATA];
  } else {
    centers.forEach(() => {
      knownClusters.push([]);
    });

    for (let i = 0; i < numberOfPoints; i++) {
      centers.forEach((center, j) => {
        knownClusters[j].push(randomPointInCircle(center, R));
      });
    }
  }

  const centersString = centers
    .map((center) => [center.x, center.y])
    .join('; ');

  insertHtml(`
			<div class='wrapper'>
				<div class="caption">Згенеровані дані для випробування</div>
				<div class="caption">Центри: ${centersString}</div>
				<div class="caption">Дисперсія: ${R}</div>
				<div class='graph-wrapper' id='${plotId1}' style="height: 800px;"></div>
			</div>
		`);

  draw(
    [
      {
        x: knownClusters.flat().map((p) => p.x),
        y: knownClusters.flat().map((p) => p.y),
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: 5,
        },
      },
    ],
    plotId1,
    {
      // shapes: [
      //   ...centers.map((center) => ({
      //     type: 'circle',
      //     xref: 'x',
      //     yref: 'y',
      //     x0: center.x - R,
      //     y0: center.y - R,
      //     x1: center.x + R,
      //     y1: center.y + R,
      //     opacity: 0.1,
      //     fillcolor: center.color,
      //     line: {
      //       color: center.color,
      //     },
      //   })),
      // ],
    }
  );

  return knownClusters;
};

export const getKMeansClusters = (data, N, initialCentroids) => {
  const plotId1 = getRandomId();

  // K-means
  insertHtml(`
		<div class='wrapper'>
			<div class="caption">Кластеризовані дані</div>
			<div class="caption">Кількість кластерів: ${N}</div>
			<div class='graph-wrapper' id='${plotId1}' style="height: 800px;"></div>
		</div>
	`);

  const kMeansClustering = kMeans(data.flat(), N, initialCentroids);

  draw(
    [
      ...kMeansClustering.clusters.map((cluster, i) => ({
        x: cluster.map((p) => p.x),
        y: cluster.map((p) => p.y),
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: 5,
          color: kMeansClustering.centroids[i].color,
        },
      })),
      ...kMeansClustering.centroids.map((center) => ({
        x: [center.x],
        y: [center.y],
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: 8,
          color: 'red',
        },
      })),
    ],
    plotId1
    // {
    //   xaxis: {
    //     range: [-5.5, 5.5],
    //   },
    //   yaxis: {
    //     range: [-5.5, 5.5],
    //   },
    // }
  );

  return kMeansClustering;
};

export const dendogram = (data) => {
  let hierarchicalClusters = hierarchicalClustering(data.flat());

  const order =
    hierarchicalClusters[hierarchicalClusters.length - 1][0].id.split(',');

  const step = 1;
  const merged = new Map([
    ...order.map((id, i) => [id, { position: i * step, level: 0 }]),
  ]);
  const lines = [];

  hierarchicalClusters.map((row) => {
    const latPair = row[row.length - 1];
    const cluster1 = merged.get(latPair.cluster1);
    const cluster2 = merged.get(latPair.cluster2);
    const nextLevel =
      Math.max(cluster1.level, cluster2.level) + latPair.distance;
    merged.set(latPair.id, {
      position: (cluster1.position * step + cluster2.position * step) / 2,
      level: nextLevel,
    });

    lines.push(
      {
        x: [cluster1.position * step, cluster2.position * step],
        y: [nextLevel, nextLevel],
        mode: 'lines',
        line: {
          color: '#000',
        },
      },
      {
        x: [cluster1.position * step, cluster1.position * step],
        y: [cluster1.level, nextLevel],
        mode: 'lines',
        line: {
          color: '#000',
        },
      },
      {
        x: [cluster2.position * step, cluster2.position * step],
        y: [cluster2.level, nextLevel],
        mode: 'lines',
        line: {
          color: '#000',
        },
      }
    );
  });

  const id = getRandomId();

  insertHtml(`
		<div class='wrapper'>
			<div class='graph-wrapper' id=${id} style="height: 1200px;"></div>
		</div>
	`);

  draw(
    [
      {
        x: order.map((_, i) => i * step),
        y: order.map(() => 0),
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: 5,
          color: 'red',
        },
      },
      ...lines,
    ],
    id
  );
};

export const silhouetteResults = (kMeansResult) => {
  const s = silhouette(kMeansResult.clusters);
  const id = getRandomId();

  insertHtml(`
		<div class='wrapper'>
			<div class='graph-wrapper' id=${id} style="height: 1200px;"></div>
		</div>
	`);

  let n = 0;
  draw(
    [
      ...s.clusters.map((cluster, i) => {
        return {
          x: [...cluster].sort(),
          y: [
            ...cluster.map(() => {
              n++;
              return n;
            }),
          ],
          marker: {
            color: kMeansResult.centroids[i].color,
          },
          type: 'bar',
          orientation: 'h',
        };
      }),
    ],
    id,
    {
      shapes: [
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: 0.7,
          y0: 0,
          x1: 0.7,
          y1: n + 1,
          line: {
            color: '#000',
            width: 10,
          },
          fillcolor: '#fff',
        },
      ],
    }
  );

  return s;
};
