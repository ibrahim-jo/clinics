import React from 'react'
import { useState,useEffect} from 'react';
import { connect} from 'react-redux'
import {pationt} from '../../../store/actions/projectActions'
import Container from '@material-ui/core/Container';
import jspdf from 'jspdf'
import html2canvas from 'html2canvas'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Grid,Card,Typography,Divider} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
    root: {
    //  display: 'flex',
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    
    },
    
card:{
    maxWidth: 410,
    maxHeight:100 ,
    margin: 'auto'
},
media:{
    
    height:100,
    width:410   
},
paper: {
    padding: theme.spacing(2),
 textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: 'wight',
  }

 }));


 const Toreport1=(props)=> {
  const  {pationt}=props
  const paid= props.match.params.id
   const [state, setstate] = useState([])

 const fetchdata=async(paid)=> {
console.log('im in .....')
    const data= await pationt(paid)
   setstate(data)
}

useEffect(() => {
    fetchdata(paid)

   
}, [paid])

console.log('sss',state)
  
   const  genratpdf=()=>{

html2canvas(document.querySelector("#content" ),{
    allowTaint:true,
    useCORS:true,
    scale:1,
    width:1100,
    height:800
}).then(canvas => {
  // document.body.appendChild(canvas)
    var img=canvas.toDataURL('image/png')
     const pdf= new jspdf()
     pdf.addImage(img,'PNG',20,13,200,120)
     pdf.save("mypdf.pdf")
});

   }
     
     const {cl}=props.location.state
     console.log('cl is a ',cl)
        var  classes= useStyles();

    return (

        <Container className={classes.root}  maxWidth='md'>
             
            <Grid container spacing={2} id='content'  >
               
                <Grid item xs={4}  >  
                 <Paper className={classes.paper} >  
                 <Typography  variant='h5' color='error'  display="inline"  >Name:</Typography>
                 <Typography variant="h6" className={classes.typography} display='inline'  > Center medical</Typography>

                <Typography variant="h5"   color='error'   >Tel: 
                <span> 
                <Typography variant="h6"  color='primary'
                 display='inline'  > +97200000000</Typography>
                    </span></Typography>
                

                 </Paper>
               

                 </Grid>
                
                <Grid item xs={4} >
                    {/* <Card className={classes.card} >
                <CardMedia  image={require ('/home/ibr/Documents/drtest/src/pngtreemedical.jpg')}
                 className={classes.media} />
                 </Card> */}
                </Grid>
                <Grid item xs={4}  >
                    <Paper className={classes.paper}>
                    <Typography variant="h5"color="error" align='right' >الاسم :<span style={{color:'GrayText'}}> مركز طبي </span></Typography>
                    <Typography variant="h6"color="error" align='right'  >هاتف :<span style={{color:'GrayText'}}> +97200000000 </span></Typography>

                    </Paper>
               
                </Grid>
                <Grid item xs={12}   >
                    <Paper  className={classes.paper}>
                    <Typography variant="h6"  color='error' align ='left'> <span style={{marginRight:200,border:'double' }}>Date: {moment().format('YYYY-MM-DD')}</span>
                           <span style={{marginLeft:30,border:'double',paddingRight:30}} >Name: {state.name}</span>
                           <span style={{marginLeft:150,border:'double',paddingRight:20}} >Age: { moment( state.bairth).fromNow()}</span>
                    </Typography>
                    <br/>
                    <Divider  />
                    <br/> <br/>
                    <Typography variant="h5"  style={{width:100}} > {cl.resip}</Typography>
                    </Paper>
                </Grid>
              
                
            </Grid>


        <button onClick={genratpdf}  style={{margin:10}}>PDF</button> 
        </Container>
       
       

        
    )
}
const mapDispatchToProps = (dispatch)=>{
    return{
        pationt:(id)=>dispatch(pationt(id))
    }
}

export default  connect(null,mapDispatchToProps)(Toreport1)
