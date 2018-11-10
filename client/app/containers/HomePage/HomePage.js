import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Message from '../../components/Message';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // Placeholder
  }

  render() {
    const { username } = this.props;
    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="inbox">
          {!username && (
            <section>
              <Message
                message={'Hello, welcome to the technical Challenge'}
                sender={'Bursty, your assistant'}
                receivedAt={Date.now()}
              />
              <Message
                message={'It is really great that you could join me, would you like to send an SMS now?'}
                sender={'Bursty, your assistant'}
                receivedAt={Date.now()}
              />
              <Message
                message={'Great! What country would you like to SMS to, please choose one of the following: [AU, UK]?'}
                sender={'Bursty, your assistant'}
                receivedAt={Date.now()}
              />
              <Message
                message={'Great! Please enter a valid Australian mobile phone number'}
                sender={'Bursty, your assistant'}
                receivedAt={Date.now()}
              />
            </section>
          )}
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  username: PropTypes.string,
};
