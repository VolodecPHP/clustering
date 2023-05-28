export const randomPointInCircle = ({ x, y }, dispersion = 1) => {
  const u1 = Math.random();
  const u2 = Math.random();

  const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

  const xR = x + z1 * dispersion;
  const yR = y + z2 * dispersion;

  return { x: xR, y: yR };
};
