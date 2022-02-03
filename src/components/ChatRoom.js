import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import userLogo from "../assests/userImage.png";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  chatRoomContainer: {
    height: "100vh",
  },
  userListContainer: {
    backgroundColor: "#3f0e40",
  },
  participantsHeader: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
  userLogo: {
    maxWidth: 50,
    maxHeight: 50,
    borderRadius: "50%",
    marginRight: 10,
  },
  participantName: {
    fontSize: 18,
    color: "white",
  },
  chatZoneContainer: {
    margin: "0 auto",
    position: "relative",
  },
  newMessageContainer: {
    width: "100%",
    position: "absolute",
    bottom: "0",
  },
  messageInput: {
    padding: 5,
    boxSizing: "border-box",
    width: "calc(100% - 70px)",
    height: "60px !important",
    "&::-webkit-scrollbar": {
      width: 0,
    },
    [theme.breakpoints.down("md")]: {
      height: "40px !important",
    },
  },
  sendMessage: {
    borderRadius: 0,
    height: "60px !important",
    [theme.breakpoints.down("md")]: {
      height: "40px !important",
    },
  },
  userMessage: {
    backgroundColor: "#f1f0f0",
    borderRadius: 7,
    marginBottom: 20,
    marginLeft: 10,
    padding: "10px 10px 10px 10px",
  },
  myMessage: {
    backgroundColor: "#4e83fa",
    borderRadius: 7,
    color: "#fff",
    marginBottom: 20,
    marginRight: 10,
    padding: "10px 10px 10px 10px",
  },
  messageUserName: {
    margin: 0,
    fontWeight: 600,
  },
  textMessage: {
    margin: 0,
  },
  chatTitle: {
    padding: 20,
    borderBottom: "1px solid black",
  },
  chatMessages: {
    paddingTop: 10,
    overflow: "auto",
    maxHeight: "80vh",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  buttonsPanel: {
    position: "absolute",
    bottom: 0,
  },
  exitButton: {
    color: "white",
  },
  chatLiveTime: {
    fontSize: 14,
  },
}));
export function ChatRoom({ socket, username, roomID }) {
  const classes = useStyles();
  let navigate = useNavigate();

  const [newMessage, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendNewMessage = async () => {
    if (!newMessage) return true;
    const messageData = {
      roomID,
      author: username,
      message: newMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("send_message", messageData);
    setMessages((prevState) => [...prevState, messageData]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (!roomID) {
      navigate("/");
    }
  }, [roomID]);

  return (
    <Grid container className={classes.chatRoomContainer}>
      <Grid item xs={8} md={9} className={classes.chatZoneContainer}>
        <Grid container direction="column" alignItems="stretch">
          <Grid item xs={12} className={classes.chatTitle}>
            <Typography varinat="h5" component="h5" align="center">
              Chat ID: {roomID}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.chatMessages}>
            <Grid container>
              {messages.map((message, index) => (
                <Grid
                  container
                  key={index}
                  justifyContent={
                    username !== message.author ? "flex-start" : "flex-end"
                  }
                >
                  <Grid
                    item
                    xs={10}
                    md={3}
                    className={
                      username !== message.author
                        ? classes.userMessage
                        : classes.myMessage
                    }
                  >
                    <p className={classes.messageUserName}>{message.author}</p>
                    <p className={classes.textMessage}>{message.message}</p>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.newMessageContainer}>
            <Grid container alignItems="flex-start">
              <TextareaAutosize
                onKeyPress={(e) => e.key === "Enter" && handleSendNewMessage()}
                value={newMessage}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                maxRows={2}
                minRows={2}
                className={classes.messageInput}
              />
              <Button
                onClick={handleSendNewMessage}
                color="primary"
                variant="contained"
                className={classes.sendMessage}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
