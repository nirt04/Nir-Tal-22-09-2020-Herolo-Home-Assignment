import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { useStyles } from './style';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}

        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="warning" onClose={handleClose} severity="warning">
            {ERROR_STORE.error ? ERROR_STORE.error.toString() : ''}</Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ERROR_STORE: state.error,
});

export default connect(mapStateToProps)(ErrorSnackbar);
