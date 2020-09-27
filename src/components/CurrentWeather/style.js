import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  tempUnitBtn: {
    paddingTop: "12px",
    minWidth: "unset",
    outline: "none !important",
    "&:hover": {
      backgroundColor: "#461eb7 !important",
    },
  },
  media: {
    backgroundSize: "auto",
    width: "45px",
    height: "45px",
  },
  root: {
    minWidth: "444px",
    minHeight: "191px",
  },
});
