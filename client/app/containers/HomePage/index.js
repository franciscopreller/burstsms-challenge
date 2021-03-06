import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import {
  changeUsername,
  sendSMS,
  clearLastMessageId,
} from './actions';
import {
  makeSelectUsername,
  makeFormSubmitting,
  makeFormSubmitted,
  makeFormError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';
import { USERNAME_KEY } from './constants';

const mapDispatchToProps = (dispatch) => ({
  changeUsername: (name) => {
    window.localStorage.setItem(USERNAME_KEY, name);
    dispatch(changeUsername(name));
  },
  unsetUsername: () => {
    window.localStorage.removeItem(USERNAME_KEY);
    dispatch(changeUsername(''));
  },
  sendSMS: (payload, callback) => dispatch(sendSMS(payload, callback)),
  clearSnackbar: () => dispatch(clearLastMessageId()),
});

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  sending: makeFormSubmitting(),
  formSubmitted: makeFormSubmitted(),
  formError: makeFormError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
