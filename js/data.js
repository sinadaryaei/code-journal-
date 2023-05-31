/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', event => {
  const $stringData = JSON.stringify(data);
  localStorage.setItem('data', $stringData);
});
