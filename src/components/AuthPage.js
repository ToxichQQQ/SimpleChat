import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    chatContainer:{
        maxWidth:800,
        margin:'0 auto'
    },
    chatHeader:{

    }
})

export function AuthPage() {
    const classes = useStyles()
    const [userName,setUserName] = useState('')
    const [roomID, setRoomID] = useState('')
    const [isNewRoom, setNewRoom] = useState(false)

    return(
        <Grid container direction='column' className={classes.chatContainer}>
            <Typography component='h3' variant='h3' align='center'>Chat</Typography>
            <TextField placeholder='Type your name' value={userName} onChange={e => setUserName(e.target.value)}/>
            {isNewRoom && <TextField placeholder='Room ID' value={roomID} onChange={e => setRoomID(e.target.value)}/>}
            <Button variant='contained' color='primary'>Connect to Room</Button>
            <FormControlLabel control={<Checkbox color='primary' checked={!isNewRoom} onChange={e => setNewRoom(prevState => !prevState)}/>} label="Create new Room" />
        </Grid>
    )
}