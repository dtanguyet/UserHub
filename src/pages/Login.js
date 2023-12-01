import React , {useState,useEffect} from 'react'

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import Copyright from '../common/CopyRight';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CITEDU from "../assets/imgs/CIT Education.png";
import Logo from "../assets/imgs/Logo.jpg";

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";


function Login() {
    const navigate = useNavigate() 
    const[loading, setLoading] = useState(true) 

    useEffect(() => {
        setTimeout(function() {
          setLoading(false)
        }, 3000)
      }, [])

      const validationScheme = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(20).required(),
      })

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode : "onChange", resolver: yupResolver(validationScheme)});

    const handleDataLogin = (dataLogin) => {
        console.log("===========================, dataLogin", dataLogin)
        var dataRegisterLocal = JSON.parse(localStorage.getItem("dataRegister"))
       // console.log("dataRegister", dataRegisterLocal)

        if(dataLogin.email === dataRegisterLocal.email && dataLogin.password === dataRegisterLocal.password){
            toast.success('Login Successfuly', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setTimeout(function(){
                    navigate("/") // tu dong dieu huong sang trang home
                   }, 3000)
        } else {
            toast.error('Login Faild', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
      }

   

  return (
    <>
    {
        loading ? <Box sx= {{display:"flex", justifyContent:"center", margin:"25%"}}><CircularProgress /></Box> :
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Box
                component="img"
                sx={{
                    height: "100%",
                    width: "50%",
                }}
                alt="CITEDU"
                src={CITEDU}
            />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 150,
                        }}
                        alt="Logo"
                        src={Logo}
                    />
                    <Typography component="h1" variant="h5">
                        Sign in CIT Education
                    </Typography>
                    <Box
                        component="form"
                        sx={{ mt: 3 }}
                        onSubmit={handleSubmit(handleDataLogin)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                {...register("email")}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                                <Typography
                                    sx={{ fontSize: "12px", marginTop: "7px" }}
                                    color="tomato"
                                >{errors?.email?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                {...register("password")}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                                <Typography
                                    sx={{ fontSize: "12px", marginTop: "7px" }}
                                    color="tomato"
                                >{errors?.email?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="Agree with CIT Education's terms and conditions"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
        </Box>
    }
    </>
  )
}


export default Login