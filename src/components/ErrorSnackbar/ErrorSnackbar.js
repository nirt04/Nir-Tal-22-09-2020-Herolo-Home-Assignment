import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import errorActions from './actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function ErrorSnackbar({ ERROR_STORE }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (ERROR_STORE.error) setOpen(true);
  }, [ERROR_STORE.error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}

        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="warning" onClose={handleClose} severity="warning">{ERROR_STORE.error ? ERROR_STORE.error.toString() : ''}</Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ERROR_STORE: state.error,
});

const mapDispatchToProps = (dispatch) => ({
//   SET_ERROR: (payload) => dispatch(errorActions.SET_ERROR(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
