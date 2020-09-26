import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Box, Card, Container, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => {
  debugger;
  return {
    favList: {
      maxHeight: "65vh",
      overflowY: "auto",
    },
    root: {
      margin: "0 auto",
      //   marginTop: "17vh",
      width: "100%",
      maxWidth: "957px",
      backgroundColor: theme.palette.OutterCard.main,
    },
    innerCard: {
      //   width: "100%",
      //   margin: "20px",
      // maxWidth: 360,
      backgroundColor: theme.palette.innerCard.main,
    },
  };
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      zIndex={4}
      className={classes.root}
    >
      <Grid container spacing={3} className="py-4">
        <Grid item xs={12}>
          <Card container className={classes.innerCard}>
            <Typography variant="h5" className="px-4 py-3">
              h5. Heading
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card container className={(classes.innerCard, classes.favList)}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary="Trash" />
              </ListItem>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
              <ListItemLink href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemLink>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
