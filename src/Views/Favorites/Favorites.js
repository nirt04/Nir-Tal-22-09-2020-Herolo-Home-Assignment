import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import { Card, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import favAcations from './actions';

function Favorites(props) {
  const useStyles = makeStyles(() => ({
    favList: {
      maxHeight: '65vh',
      overflowY: 'auto',
    },
    root: {
      margin: '0 auto',
      width: '100%',
      maxWidth: '957px',
      // backgroundColor: theme.palette.otterCard[props.appConfig.themeType],
    },
  }));

  React.useEffect(() => {
    localStorage.setItem('FAVORITES_STORE', JSON.stringify(props.FAVORITES_STORE));
  }, [props.FAVORITES_STORE]);

  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="h5" className="px-4 py-3">
                h5. Heading
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.favList}>
              <List component="nav" aria-label="main mailbox folders">
                { Object.keys(props.FAVORITES_STORE).map((key, i) => (
                  <ListItem button key={i} onClick={() => props.history.push(props.FAVORITES_STORE[key])}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={key} />
                  </ListItem>
                ))}

              </List>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
  FAVORITES_STORE: state.favorites,
});
const mapDispatchToProps = (dispatch) => ({
  REMOVE_FAVORITE: (key) => dispatch(favAcations.REMOVE_FAVORITE(key)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
