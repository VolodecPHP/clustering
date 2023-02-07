import {
  getRandomFloat,
  getRandomId,
  getRandomColor,
  insertHtml,
  draw,
} from '../utils/index.js';

export const example2 = () => {
  const id_1 = getRandomId();
  const id_2 = getRandomId();

  const CLUSTER_1 = {
    x: new Array(20).fill().map(() => getRandomFloat(25, 75)),
    y: new Array(20).fill().map(() => getRandomFloat(25, 75)),
  };

  const CLUSTER_2 = {
    x: new Array(20).fill().map(() => getRandomFloat(100, 900)),
    y: new Array(20).fill().map(() => getRandomFloat(100, 900)),
  };

  insertHtml(`
			<div class='wrapper'>
				<div class='graph-wrapper' id='${id_1}'></div>
				<div class='graph-wrapper' id='${id_2}'></div>
			</div>
	`);

  draw(
    [
      {
        x: [...CLUSTER_1.x],
        y: [...CLUSTER_1.y],
        mode: 'markers',
        type: 'scatter',
      },
    ],
    id_1,
    {
      height: 500,
      width: 500,
      xaxis: {
        range: [0, 100],
      },
      yaxis: {
        range: [0, 100],
      },
      shapes: [
        {
          type: 'circle',
          xref: 'x',
          yref: 'y',
          x0: 10,
          y0: 10,
          x1: 90,
          y1: 90,
          opacity: 0.2,
          fillcolor: 'yellow',
          line: {
            color: 'blue',
          },
        },
      ],
    }
  );

  draw(
    [
      {
        x: [...CLUSTER_2.x],
        y: [...CLUSTER_2.y],
        mode: 'markers',
        type: 'scatter',
      },
    ],
    id_2,
    {
      height: 500,
      width: 500,
      xaxis: {
        range: [0, 1000],
      },
      yaxis: {
        range: [0, 1000],
      },
      shapes: CLUSTER_2.x.map((x, i) => ({
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: x - 30,
        y0: CLUSTER_2.y[i] - 30,
        x1: x + 30,
        y1: CLUSTER_2.y[i] + 30,
        opacity: 0.2,
        fillcolor: getRandomColor(),
        line: {
          color: 'blue',
        },
      })),
    }
  );
};
