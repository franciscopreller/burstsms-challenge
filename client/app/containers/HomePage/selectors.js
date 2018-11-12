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

export {
  selectHome,
  makeSelectUsername,
  makeFormSubmitting,
};
