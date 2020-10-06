import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 0,
      flexGrow: 1,
      backgroundColor: theme.palette.background.primary,
    },
  }));
  