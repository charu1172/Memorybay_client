import {React,useState,useContext} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
// import { BrowserRouter as Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { SignupContext } from '../context/SignupContext';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor:"whitesmoke",
    padding:"40px",
    borderRadius:"10px",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [userName, setUsern] = useState('');
  const [email, setEmail] = useState('');
  const [pswd, setPass] = useState('');
  const history = useHistory();
  // eslint-disable-next-line
  const [user,setUser] = useContext(SignupContext);


  const handlesubmit = async (e) => {
    e.preventDefault();
    if(userName === '' || email === '' || pswd === ''){
      alert("Please enter your credentials");
    }else{
    try{
      const response = await axios.post('http://localhost:5000/auth/signup',{
        email:email,
        userName:userName,
        pswd:pswd
      });
      if(response.data.name){
        console.log(response.data.name);
        setUser({        
        userName:response.data.name,
        email:response.data.email,
      });
        history.push("/main");
      }
      if(response.data.error){
         if(response.data.error === "Already exists"){
          alert("User already exists kindly sign in");   
            // history.push("/login");
         }else{
        alert(response.data.error);
         }
      }
    }catch(err){
      console.log(err);
    }
  }
    
  };
  
  return (    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handlesubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                onChange={(e) => setUsern(e.target.value)}
                value={userName}
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={(e) => setPass(e.target.value)}
                value={pswd}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
              Sign Up
            
          </Button>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
        Already have an account?
        <Link color="inherit" href="/login">
        Sign In
    </Link>
        <Box mt={5}>
        <Copyright />
      </Box>
      </div>

    </Container>
  );
}