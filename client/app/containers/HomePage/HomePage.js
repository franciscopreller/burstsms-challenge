import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = {
  paper: {
    minWidth: 640,
    maxWidth: 820,
    margin: '50px auto 100px',
    padding: 50,
  },
  divider: {
    marginTop: 10,
    marginBottom: 20,
  },
  messageCount: {
    textAlign: 'right',
    fontSize: 10,
    color: '#ccc',
  },
};

const MAX_MESSAGE_LENGTH = 480;

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      usernameForm: {
        name: {
          value: '',
          errorText: '',
        },
      },
      smsForm: {
        number: {
          value: '',
          errorText: '',
        },
        message: {
          value: '',
          errorText: '',
        },
      },
    };
  }

  onFormSubmit() {
    return (evt) => {
      evt.preventDefault();
      // Handle username submission if that is our current context
      if (!this.props.username) {
        this.props.changeUsername(this.state.usernameForm.name.value);
        this.setState({
          usernameForm: {
            name: {
              value: '',
              errorText: '',
            },
          },
        });
      } else {
        // Handle SMS form submission
        const payload = {
          number: this.state.smsForm.number.value,
          message: this.state.smsForm.message.value,
          from: this.props.username,
        };
        console.log('Send SMS with payload:', payload);
      }
    };
  }

  onNumberChange() {
    return (evt) => {
      // Check validation
      const match = /^([0-9]){0,10}$/;
      const regex = new RegExp(match);
      const numberValue = evt.target.value.replace(/ /g, ''); // trim number
      // Set the components internal state for the username form
      this.setState({
        smsForm: Object.assign({}, this.state.smsForm, {
          number: Object.assign({}, this.state.smsForm.number, {
            value: evt.target.value,
            errorText: '',
          }),
        }),
      });
      // Do validation post setting the state for the value
      if (!regex.test(numberValue)) {
        this.setState({
          smsForm: Object.assign({}, this.state.smsForm, {
            number: Object.assign({}, this.state.smsForm.number, {
              errorText: 'Must be a valid Australian phone number',
            }),
          }),
        });
      }
    };
  }

  onMessageChange() {
    return (evt) => {
      if (evt.target.value.length <= MAX_MESSAGE_LENGTH) {
        this.setState({
          smsForm: Object.assign({}, this.state.smsForm, {
            message: Object.assign({}, this.state.smsForm.message, {
              value: evt.target.value,
              errorText: '',
            }),
          }),
        });
      } else {
        this.setState({
          smsForm: Object.assign({}, this.state.smsForm, {
            message: Object.assign({}, this.state.smsForm.message, {
              errorText: 'Message maximum length is 460 characters',
            }),
          }),
        });
      }
    };
  }

  onUsernameChange() {
    return (evt) => {
      // Check validation
      const match = /^([a-zA-Z0-9]){1,11}$/;
      const regex = new RegExp(match);
      if (regex.test(evt.target.value)) {
        // Set the components internal state for the username form
        this.setState({
          usernameForm: Object.assign({}, this.state.usernameForm, {
            name: Object.assign({}, this.state.usernameForm.name, {
              value: evt.target.value,
              errorText: '',
            }),
          }),
        });
      } else {
        this.setState({
          usernameForm: Object.assign({}, this.state.usernameForm, {
            name: Object.assign({}, this.state.usernameForm.name, {
              errorText: 'Username must be 1-11 alphanumeric characters',
            }),
          }),
        });
      }
    };
  }

  render() {
    const { username, classes } = this.props;
    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="A React.js BurstSMS Interface" />
        </Helmet>
        <section>
          <Paper className={classes.paper}>
            <form onSubmit={this.onFormSubmit()}>
              <Grid container spacing={24}>
                <Grid item xs={10}>
                  <Typography component="h5" variant="h5">
                    {(username) ? 'Send SMS' : 'Please enter your username'}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {username && (
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      onClick={this.props.unsetUsername}
                      fullWidth>
                      Logout
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Typography component="small" variant="subtitle2">
                {(username)
                  ? <div>Welcome back <strong>{username}</strong>! Would you like to send an SMS now?</div>
                  : 'Your username can be up to 11 characters long, and use alphanumeric characters, eg: Fred235'
                }
              </Typography>
              <Divider className={classes.divider} />
                {(username) ? (
                  // If user state logged in, show SMS send form
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="number"
                        name="number"
                        label="Enter a valid Australian mobile number. eg: 0430 123 456"
                        variant="outlined"
                        fullWidth
                        onChange={this.onNumberChange()}
                        error={this.state.smsForm.number.errorText.length !== 0}
                        helperText={this.state.smsForm.number.errorText}
                        value={this.state.smsForm.number.value}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="message"
                        name="message"
                        label="Enter your message. Any links in the text will be converted into Bitly."
                        variant="outlined"
                        multiline
                        fullWidth
                        onChange={this.onMessageChange()}
                        error={this.state.smsForm.message.errorText.length !== 0}
                        helperText={this.state.smsForm.message.errorText}
                        value={this.state.smsForm.message.value}
                      />
                      <div className={classes.messageCount}>
                        {this.state.smsForm.message.value.length} / {MAX_MESSAGE_LENGTH}
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  // Otherwise ask the user to log in
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="username"
                        name="username"
                        label="Enter username"
                        fullWidth
                        onChange={this.onUsernameChange()}
                        error={this.state.usernameForm.name.errorText.length !== 0}
                        helperText={this.state.usernameForm.name.errorText}
                        value={this.state.usernameForm.name.value}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container spacing={24}>
                  <Grid item xs={6} />
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
            </form>
          </Paper>
        </section>
      </article>
    );
  }
}

HomePage.propTypes = {
  username: PropTypes.string,
};

export default withStyles(styles)(HomePage);
