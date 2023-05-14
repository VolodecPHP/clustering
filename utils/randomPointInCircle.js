export const randomPointInCircle = ({ x, y }, r = 1) => {
  let ang = Math.random() * 2 * Math.PI,
    hyp = Math.sqrt(Math.random()) * r,
    adj = Math.cos(ang) * hyp,
    opp = Math.sin(ang) * hyp;

  return { x: x + adj, y: y + opp };
};
