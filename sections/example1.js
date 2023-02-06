import {
  getRandomFloat,
  getRandomId,
  insertHtml,
  draw,
} from '../utils/index.js';

export const example1 = () => {
  const id = getRandomId();

  const CLUSTER_1 = {
    x: new Array(50).fill().map(() => getRandomFloat(1, 4)),
    y: new Array(50).fill().map(() => getRandomFloat(1, 7)),
  };

  const CLUSTER_2 = {
    x: new Array(50).fill().map(() => getRandomFloat(-10, -14)),
    y: new Array(50).fill().map(() => getRandomFloat(30, 37)),
  };

  const CLUSTER_3 = {
    x: new Array(50).fill().map(() => getRandomFloat(30, 34)),
    y: new Array(50).fill().map(() => getRandomFloat(20, 27)),
  };

  insertHtml(`
			<div class='wrapper'>
				<div class='graph-wrapper' id='${id}'></div>
			</div>
		`);

  draw(
    [
      {
        x: [...CLUSTER_1.x, ...CLUSTER_2.x, ...CLUSTER_3.x],
        y: [...CLUSTER_1.y, ...CLUSTER_2.y, ...CLUSTER_3.y],
        mode: 'markers',
        type: 'scatter',
      },
    ],
    id
  );
};
