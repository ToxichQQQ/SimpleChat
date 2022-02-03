import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  chatContainer: {
    maxWidth: 400,
    margin: "30vh auto",
  },
  chatHeader: {
    fontFamily: "Rowdies, cursive",
  },
  authField: {
    padding: 10,
  },
});

export function AuthPage({
  handleConnect,
  username,
  setUsername,
  roomID,
  setRoomID,
}) {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.chatContainer}>
      <Typography
        component="h3"
        variant="h3"
        align="center"
        className={classes.chatHeader}
      >
        Chat
      </Typography>
      <TextField
        className={classes.authField}
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className={classes.authField}
        placeholder="Room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={username === "" || roomID === ""}
        onClick={() => handleConnect(username, roomID)}
      >
        Connect to Room
      </Button>
    </Grid>
  );
}
