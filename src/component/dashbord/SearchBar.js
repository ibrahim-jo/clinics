import React,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { ImageSearchSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({handelSearch}) {
  const classes = useStyles();
   const [serch, setserch] = useState("")
  const handelchange=(e)=>{
   
     setserch(e.target.value)
      
  }
   const handelsubmit=(e)=>{
     e.preventDefault()
     handelSearch(serch)
     setserch('')
   }
  return (
    <Paper component="form"   className={classes.root}>
      
      <InputBase
        className={classes.input}
        placeholder="Search By ID"
        inputProps={{ 'aria-label': 'search id' }}
        onChange={handelchange}
        
      />
      <IconButton type="submit" onClick={handelsubmit} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </Paper>
  );
}