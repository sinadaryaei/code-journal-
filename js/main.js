const $imgInput = document.getElementById('url');
const $imgPreview = document.querySelector('img');
const $form = document.querySelector('form');
const $title = document.getElementById('title');
const $url = document.getElementById('url');
const $notes = document.getElementById('notes');
const entryList = document.querySelector('ul');

$imgInput.addEventListener('input', event => {
  $imgPreview.setAttribute('src', $imgInput.value);
});

$form.addEventListener('submit', event => {
  event.preventDefault();

  const newObject = {
    title: $title.value,
    url: $url.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;

  data.entries.unshift(newObject);
  $imgPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

function renderEntry(entry) {

  const $li = document.createElement('li');
  $li.className = 'entry';

  const $divRow = document.createElement('div');
  $divRow.className = 'row';

  const $divColumn1 = document.createElement('div');
  $divColumn1.className = 'column-half';

  const $divImage = document.createElement('div');
  $divImage.className = 'image image-entry';

  const $img = document.createElement('img');
  $img.className = 'image';
  $img.src = entry.url;
  $img.alt = 'entry image';

  const $divColumn2 = document.createElement('div');
  $divColumn2.className = 'column-half';

  const $divTitle = document.createElement('div');
  $divTitle.className = 'title title-entry';

  const $label = document.createElement('label');
  $label.for = 'title';
  $label.textContent = entry.title;

  const $p = document.createElement('p');
  $p.className = 'notes';
  $p.textContent = entry.notes;

  $li.appendChild($divRow);
  $divRow.appendChild($divColumn1);
  $divColumn1.appendChild($divImage);
  $divImage.appendChild($img);
  $divRow.appendChild($divColumn2);
  $divColumn2.appendChild($divTitle);
  $divTitle.appendChild($label);
  $divColumn2.appendChild($p);

  return $li;
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const loopEntry = data.entries[i];
    const entryElement = renderEntry(loopEntry);
    entryList.appendChild(entryElement);
  }
});
