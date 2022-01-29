import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import userLogo from '../assests/userImage.png'
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) =>({
    chatRoomContainer:{
        height:'100vh',
    },
    userListContainer:{
    backgroundColor:'#3f0e40'
    },
    participantsHeader:{
      color:'white',
        textAlign:'center',
        textTransform:'uppercase',
        [theme.breakpoints.down('md')]: {
            fontSize: 14
        },

    },
    userLogo:{
      maxWidth:50,
        maxHeight:50,
        borderRadius:'50%',
        marginRight:10
    },
    participantName:{
        fontSize:18,
        color:"white"
    },
    chatZoneContainer:{
        position:'relative'
    },
    newMessageContainer:{
        width:'100%',
        position:'absolute',
        bottom:'0'
    },
    messageInput:{
        padding:5,
        boxSizing:'border-box',
        width:'calc(100% - 70px)',
        height: '60px !important',
        '&::-webkit-scrollbar':{
            width:0
        },
        [theme.breakpoints.down('md')]: {
            height: '40px !important',
        },
    },
    sendMessage:{
        borderRadius:0,
        height: '60px !important',
        [theme.breakpoints.down('md')]: {
            height: '40px !important',
        },
    },
    userMessage:{
        backgroundColor:'#f1f0f0',
        borderRadius:7,
        marginBottom:20,
        marginLeft:10,
        padding:'10px 10px 10px 10px'
    },
    myMessage:{
        backgroundColor:'#3f0e40',
        borderRadius:7,
        color:'#fff',
        marginBottom:20,
        marginRight:10,
        padding:'10px 10px 10px 10px'
    },
    messageUserName:{
      margin:0,
        fontWeight:600
    },
    textMessage:{
        margin:0
    },
    chatTitle:{
        padding:20,
        borderBottom:'1px solid black'
    },
    chatMessages:{
        overflow:'auto',
        maxHeight:'80vh',
        '&::-webkit-scrollbar':{
            width:0
        }
    }
}))
export function ChatRoom() {
    const classes = useStyles()
    const users = [{userName:'Anton',id:'1'},{userName: 'Alisa',id:'2'}]
    const [newMessage,setMessage] = useState('')
    const [messages,setMessages] = useState([{userName:'Anton', id:1, text:'My message'}, {userName: 'Alisa', id:2, text:'Hi! My name is Alisa'},
        {userName:'Anton', id:1, text:'My message My message My message My message My message My message'}])


    const handleAddNewMessage = (messageText) => {
        setMessages(prevState => [...prevState,{userName:'Anton',id:1, text:messageText}])
        setMessage('')
    }


    return (
        <Grid container className={classes.chatRoomContainer}>
            <Grid item xs={4} md={3} className={classes.userListContainer}>
                <Typography variant='h5' component='h5' className={classes.participantsHeader}>Сhat participants</Typography>
              <Grid container justifyContent='center'>
                  {users.map(user => <Grid item xs={12} key={user.id}>
                      <Grid container alignItems='center'>
                       {/*   <img src={userLogo} alt='userLogo' className={classes.userLogo}/>*/}
                          <p className={classes.participantName}>{user.userName}</p>
                      </Grid>
                  </Grid>)}
              </Grid>
                <Grid container justifyContent='space-between'>
                    <Button endIcon={<ExitToAppIcon/>}>Delete/Exit</Button>
                </Grid>
            </Grid>
            <Grid item xs={8} md={9} className={classes.chatZoneContainer}>
                <Grid container direction='column' alignItems='stretch'>
                    <Grid item xs={12} className={classes.chatTitle}>
                        <Typography varinat='h5' component='h5' align='center'>Chat ID:2131231231231232</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.chatMessages}>
                        <Grid container>
                            {messages.map((message,index) =>
                                <Grid container key={index} justifyContent={index%2 === 0 ? 'flex-start' : 'flex-end'}>
                                <Grid item xs={10} md={3} className={index%2 === 0 ? classes.userMessage :classes.myMessage}>
                                    <p className={classes.messageUserName}>{message.userName}</p>
                                    <p className={classes.textMessage}>{message.text}</p>
                            </Grid></Grid>)}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.newMessageContainer}>
                        <Grid container alignItems='flex-start'>
                            <TextareaAutosize value={newMessage} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message" maxRows={2} minRows={2} className={classes.messageInput}/>
                            <Button onClick={() => handleAddNewMessage(newMessage)} color='primary' variant='contained' className={classes.sendMessage}>Send</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}