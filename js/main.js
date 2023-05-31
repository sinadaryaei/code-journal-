const $imgInput = document.getElementById('url');
const $imgPreview = document.querySelector('img');

$imgInput.addEventListener('input', event => {
  $imgPreview.setAttribute('src', $imgInput.value);
});
