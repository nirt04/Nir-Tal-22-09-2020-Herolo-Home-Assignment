import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    padding: '0',
    '& > div': {
      marginTop: '15vh',
    },
  },
}));
