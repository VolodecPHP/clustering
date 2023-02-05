export const draw = (plots, graph, ...options) => {
  try {
    const plts = [];

    plots.forEach((plot) => {
      plts.push({
        ...plot,
      });
    });

    const data = [...plts];

    Plotly.newPlot(graph, data, ...options);
  } catch (err) {
    console.error(err);
  }
};
