import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const styles = {
  card: {
    width: 500,
    marginLeft: 20,
  },
  timestamp: {
    fontSize: 12,
    float: 'right',
  },
  sender: {
    clear: 'both',
  },
  avatar: {
    float: 'left',
    color: '#fff',
    backgroundColor: blue[500],
    fontSize: 14,
    margin: '0 20px',
  },
  name: {
    float: 'left',
  }
};

function Message(props) {
  const { classes } = props;

  return (
    <section>
      <Avatar className={classes.avatar}>SMS</Avatar>
      <Card className={classes.card}>
        <CardContent>
          <section className={classes.sender}>
            <Typography className={classes.timestamp} color="textSecondary" gutterBottom>
              Received on: {props.receivedAt}
            </Typography>
            <Typography className={classes.name} variant="h6" component="p">
              { props.sender }
            </Typography>
            <br />
          </section>
          <Typography component="p">
            { props.message }
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  sender: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  receivedAt: PropTypes.number.isRequired,
};

export default withStyles(styles)(Message);
