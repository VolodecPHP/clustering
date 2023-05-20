import { getRandomFloat } from './getRandomFloat.js';
import { getRandomColor } from './getRandomColor.js';
import { getRandomId } from './getRandomId.js';
import { insertHtml } from './insertHtml.js';
import { draw } from './draw.js';
import { randomPointInCircle } from './randomPointInCircle.js';
import { getDistance } from './getDistance.js';
import { kMeans } from './methods/kMeans.js';
import { hierarchicalClustering } from './methods/hierarchical.js';
import { silhouette } from './methods/silhouette.js';

Array.prototype.sum = function () {
  return this.reduce((acc, v) => (acc += v), 0) / this.length;
};

export {
  getRandomFloat,
  getRandomColor,
  getRandomId,
  insertHtml,
  draw,
  randomPointInCircle,
  getDistance,
  kMeans,
  hierarchicalClustering,
  silhouette,
};
