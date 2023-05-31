const $imgInput = document.getElementById('url');
const $imgPreview = document.querySelector('img');
const $form = document.querySelector('form');
const $title = document.getElementById('title');
const $url = document.getElementById('url');
const $notes = document.getElementById('notes');

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
