const $imgInput = document.getElementById('url');
const $imgPreview = document.querySelector('img');
const $form = document.querySelector('form');
const $title = document.getElementById('title');
const $url = document.getElementById('url');
const $notes = document.getElementById('notes');
const $ul = document.querySelector('ul');
const entryFormView = document.querySelector("[data-view='entry-form']");
const entriesView = document.querySelector("[data-view='entries']");
const formTitle = document.querySelector("[data-view='entry-form'] h2");
const viewEntriesAnchor = document.querySelector('#view-entries');
const $deleteButton = document.getElementById('delete-button');
$deleteButton.style.display = 'none';

$imgInput.addEventListener('input', event => {
  $imgPreview.setAttribute('src', $imgInput.value);
});

$form.addEventListener('submit', event => {
  event.preventDefault();

  const newObject = {
    title: $title.value,
    url: $url.value,
    notes: $notes.value
  };

  if (data.editing === null) {
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObject);

    const newEntry = renderEntry(newObject);
    $ul.prepend(newEntry);

    $imgPreview.src = 'images/placeholder-image-square.jpg';
    $form.reset();

  } else if (data.editing !== null) {
    newObject.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newObject.entryId) {
        data.entries[i] = newObject;

        const newLI = renderEntry(newObject);
        const oldLI = $ul.querySelector(`[data-entry-id='${newObject.entryId}']`);
        $ul.replaceChild(newLI, oldLI);

        formTitle.textContent = 'New Entry';
        data.editing = null;
        $form.reset();
      }
    }
  }

  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {

  const $li = document.createElement('li');
  $li.className = 'entry';
  $li.setAttribute('data-entry-id', entry.entryId);

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

  const $i = document.createElement('i');
  $i.className = 'fa-solid fa-pencil';

  $label.appendChild($i);
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
  viewSwap(data.view);
  toggleNoEntries();
  for (let i = 0; i < data.entries.length; i++) {
    const loopEntry = data.entries[i];
    const entryElement = renderEntry(loopEntry);
    $ul.appendChild(entryElement);
  }

});

function toggleNoEntries() {
  const noEntriesText = document.getElementById('no-entries');
  if (data.entries.length === 0) {
    noEntriesText.classList.remove('hidden');
  } else {
    noEntriesText.classList.add('hidden');
  }
}

function viewSwap(viewName) {

  if (viewName === 'entry-form') {
    entryFormView.classList.remove('hidden');
    entriesView.classList.add('hidden');
  } else if (viewName === 'entries') {
    entriesView.classList.remove('hidden');
    entryFormView.classList.add('hidden');
  }
  data.view = viewName;
}

viewEntriesAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
  $form.reset();
  formTitle.textContent = 'New Entry';
  data.editing = null;
});
const newEntryButton = document.querySelector('#new-entry-button');

newEntryButton.addEventListener('click', function (event) {
  $form.reset();
  viewSwap('entry-form');
  data.editing = null;
  $deleteButton.style.display = 'none';
});

$ul.addEventListener('click', function (event) {
  if (event.target.matches('.fa-pencil')) {
    const entryId = event.target.closest('li').getAttribute('data-entry-id');
    const entry = data.entries.find(entry => entry.entryId === Number(entryId));
    if (entry) {
      data.editing = entry;
      $title.value = entry.title;
      $url.value = entry.url;
      $notes.value = entry.notes;
      formTitle.textContent = 'Edit Entry';
      viewSwap('entry-form');
      $deleteButton.style.display = 'block';
    }
  }
});

$deleteButton.addEventListener('click', function (event) {
  event.preventDefault();

  const modal = document.getElementById('confirmation-modal');
  modal.classList.remove('hidden');
});

document.getElementById('confirm-delete').addEventListener('click', function () {
  document.getElementById('confirmation-modal').classList.add('hidden');
});

document.getElementById('cancel-delete').addEventListener('click', function () {
  document.getElementById('confirmation-modal').classList.add('hidden');
});
