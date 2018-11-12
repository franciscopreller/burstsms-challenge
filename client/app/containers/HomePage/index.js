import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  changeUsername,
  sendSMS,
} from './actions';
import {
  makeSelectUsername,
  makeFormSubmitting,

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
  sendSMS: ({ number, from, message }) =>
    dispatch(sendSMS(number, from, message)),
});

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  sending: makeFormSubmitting(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
