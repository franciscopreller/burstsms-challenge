import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Welcome to the Challenge
            </Typography>
            <IconButton color="inherit">
              <AccountIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <a href="https://support.burstsms.com/hc/en-us/categories/200154016-API-Documentation">
          <img className="splash" src="//theme.zdassets.com/theme_assets/90242/ee59b76d5a2f9723e4e36e308251611564c2820c.png" alt="BurstSMS logo" />
        </a>
      </div>
    );
  }
}

export default Header;
