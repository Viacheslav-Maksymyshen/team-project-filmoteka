const loaderBackdrop = document.querySelector('.loader__backdrop');

window.addEventListener('load', function () {
  loaderBackdrop.classList.add('.hidden');
  setTimeout(() => {
    loaderBackdrop.remove();
  }, 500);
});
