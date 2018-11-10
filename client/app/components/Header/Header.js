import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GithubIcon from '../CustomIcons/Github';
import pkg from '../../../package.json';

const styles = {
  header: {
    height: 80,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    margin: 20,
    display: 'block',
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
};

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static navigateToHomePage() {
    window.open(pkg.homepage, '_self');
  }

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.header}>
        <AppBar position="static" color="default">
          <Toolbar>
            <a href="//bit.ly/2PNWlqZ">
              <img className={classes.logo} src="//bit.ly/2PIDMoc" alt="BurstSMS logo" />
            </a>
            <Typography variant="h6" color="inherit">
              Technical Challenge
            </Typography>
            <div className={classes.toolbarButtons}>
              <IconButton onClick={Header.navigateToHomePage} color="inherit">
                <GithubIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </section>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
