import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    // width: '100%',
    padding: "0",
    // margin: '0'
    "& > div": {
      marginTop: "15vh",
    },
  },
}));
