const $imgInput = document.getElementById('url');
const $imgPreview = document.querySelector('img');
const $form = document.querySelector('[data-view="entry-form"]');

$imgInput.addEventListener('input', event => {
  $imgPreview.setAttribute('src', $imgInput.value);
});

$form.addEventListener('submit', event => {
  event.preventDefault();

});
