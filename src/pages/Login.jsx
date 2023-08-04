import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Grid, Link, Paper } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import patientsLogin from "./assets/patientsLogin.png";
import axios from "axios";

export default function Login({onSuccess}) { 
//   const { users } = useParams();
  const navigateTo = useNavigate();
  const [email_phone, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    onSuccess();
   
    try {
      const formData = new FormData();
      formData.append("email_phone", email_phone);
      formData.append("password", password);

      const response = await axios.post(
        "https://medical.studiomyraa.com/api/login_action",
        formData
      );

      // Handle successful login response
      console.log("Login successful:", response.data);
      localStorage.setItem("roles", JSON.stringify(response?.data?.role));
      toast.success("Login successful");

      // Reset the form
      setUsername("");
      setPassword("");

      // Navigate to the home page
    //   navigateTo("/home");

    onSuccess();
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={0} direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Grid item lg={6}>
          <Paper elevation={6} sx={{ padding: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {/* {users} Portal Login */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Please use the form below to access your account!
            </Typography>

            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Username or Email Address"
                    name="username"
                    value={email_phone}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2, mb: 2 }}>
                Login Now
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/patients/reset_password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item lg={6}>
          {/* <div style={{ backgroundImage: `url(${patientsLogin})`, height: "100vh", backgroundSize: "cover" }}></div> */}
        </Grid>
      </Grid>
    </Container>
  );
}