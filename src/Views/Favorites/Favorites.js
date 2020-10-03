import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { Card, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import favAcations from './redux/actions';

function Favorites({ FAVORITES_STORE, REMOVE_FAVORITE, history }) {
  const useStyles = makeStyles(() => ({
    favList: {
      maxHeight: '65vh',
      overflowY: 'auto',
    },
    root: {
      margin: '0 auto',
      width: '100%',
      maxWidth: '957px',
    },
  }));

  React.useEffect(() => {
    localStorage.setItem(
      'FAVORITES_STORE',
      JSON.stringify(FAVORITES_STORE),
    );
  }, [FAVORITES_STORE]);

  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="h5" className="px-4 py-3">
                Favorites
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.favList}>
              <List component="nav" aria-label="main mailbox folders">
                { Object.keys(FAVORITES_STORE).length === 0 && (
                <ListItem>
                  <ListItemText primary="Nothing to show :(" />
                </ListItem>
                )}
                {Object.keys(FAVORITES_STORE).map((key, i) => (

                  <ListItem button key={i}>
                    <ListItemIcon onClick={() => REMOVE_FAVORITE(key)}>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={key}
                      onClick={() => history.push(FAVORITES_STORE[key])}
                    />
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

Favorites.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  FAVORITES_STORE: PropTypes.objectOf(PropTypes.any).isRequired,
  REMOVE_FAVORITE: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  FAVORITES_STORE: state.favorites,
});
const mapDispatchToProps = (dispatch) => ({
  REMOVE_FAVORITE: (key) => dispatch(favAcations.REMOVE_FAVORITE(key)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
