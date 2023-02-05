/* BASIC HTML STRUCTURE EXAMPLE
<div class='wrapper'>
  <div class='caption'>Дисперсія = 10</div>
  <div class='info'>Згенеровані 25 точок для кожного кластера</div>
  <div class='graph-wrapper' id='id1'></div>
</div>
*/

export const insertHtml = (HTML) => {
  document.body.insertAdjacentHTML('beforeend', HTML);
};
