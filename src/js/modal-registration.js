import { on } from 'process';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open-registration]'),
  closeModalBtn: document.querySelector('[data-modal-close-registration]'),
  backdrop: document.querySelector('.backdrop__reg-modal'),
  regForm: document.querySelector('#register_form'),
  logForm: document.querySelector('#login_form'),
  logInSwitcher: document.querySelector('[data-open-signup]'),
  signUpSwitcher: document.querySelector('[data-open-login]'),
  logInSwitcherText: document.querySelector('.modal-reg__switch-text--to-sign'),
  signUpSwitcherText: document.querySelector('.modal-reg__switch-text--to-log'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onClickBackdrop);
refs.logInSwitcher.addEventListener('click', onLogInSwitcherClick);
refs.signUpSwitcher?.addEventListener('click', onSignUpSwitcherClick);
refs.logForm.addEventListener('submit', onCloseModal);
refs.regForm.addEventListener('submit', onCloseModal);

function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
}

function onCloseModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
}

function onClickBackdrop(e) {
  if (e.target.classList.contains('js-close-modal')) {
    onCloseModal();
  }
}

function onPressESC(e) {
  if (e.keyCode === 27) {
    onCloseModal();
  }
}

function onLogInSwitcherClick() {
  refs.logInSwitcherText.classList.toggle('visually-hidden');
  refs.signUpSwitcherText.classList.toggle('visually-hidden');
  refs.logForm.classList.toggle('visually-hidden');
  refs.regForm.classList.toggle('visually-hidden');
}

function onSignUpSwitcherClick() {
  refs.logInSwitcherText.classList.toggle('visually-hidden');
  refs.signUpSwitcherText.classList.toggle('visually-hidden');
  refs.logForm.classList.toggle('visually-hidden');
  refs.regForm.classList.toggle('visually-hidden');
}
