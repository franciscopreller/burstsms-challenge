import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeFormSubmitting = () => createSelector(
  selectHome,
  (homeState) => homeState.get('formSubmitting')
);

const makeFormSubmitted = () => createSelector(
  selectHome,
  (homeState) => homeState.get('lastMessageId')
);

const makeFormError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('formError')
);

export {
  selectHome,
  makeSelectUsername,
  makeFormSubmitting,
  makeFormSubmitted,
  makeFormError,
};
