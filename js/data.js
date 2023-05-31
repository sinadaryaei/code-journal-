/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const $stringData = localStorage.getItem('data');
if ($stringData) {
  data = JSON.parse($stringData);
}

window.addEventListener('beforeunload', event => {
  const $stringData = JSON.stringify(data);
  localStorage.setItem('data', $stringData);
});
