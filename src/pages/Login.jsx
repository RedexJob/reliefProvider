import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Link,
  Card,
  Box,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import patientsLogin from "./assets/patientsLogin.png";
import axios from "axios";
import Doctor from "../../src/assets/avatars/providers-login.png";

export default function Login({ onSuccess }) {
  //   const { users } = useParams();
  const navigateTo = useNavigate();
  const [email_phone, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email_phone", email_phone);
      formData.append("password", password);

      const response = await axios.post(
        "https://medical.studiomyraa.com/api/login_action",
        formData
      );

      // Handle successful login response
      if (response?.data?.role == "provider") {
        toast.success("Login successful");
        localStorage.setItem("profile", JSON.stringify());
        console.log("Login successful:", response.data);
        localStorage.setItem("all ", JSON.stringify(response?.data));
        localStorage.setItem("profile", JSON.stringify(response?.data?.user));
        localStorage.setItem("token", JSON.stringify(response?.data?.token));

        setTimeout(() => {
          onSuccess();
        }, 2500);
      } else {
        console.log("errorrrr login");
        alert("check your id ");
      }

      // Reset the form
      setUsername("");
      setPassword("");

      // Navigate to the home page
      //   navigateTo("/home");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  };

  const BUttonDisble = {
    border: "1px solid black",
    backgroundColor: "grey",
    color: "white",
    padding: "15px",
    cursor: "not-allowed",
  };

  const isButtonDisabled = !email_phone || !password;
  return (
    <Container
      maxWidth="lg"
      sx={{ px: 1, pxMd: 5, pxLg: 1, pxXl: 5, py: 10, mx: "auto" }}
    >
      <Card sx={{ border: 0 }} elevation={4}>
        <Grid container alignItems="center">
          <Grid item lg={6}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={Doctor} alt="Main Image" className="image" />
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <form onSubmit={handleLogin}>
              <Card sx={{ border: 0, px: 4, py: 10 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: 17 }}>
                      Provider Portal Login
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      Please use the form below to access your account!
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      placeholder="Enter a valid email address"
                      // value={email}
                      //   onChange={handleEmailChange}

                      value={email_phone}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="Password"
                      label="Password"
                      placeholder="Enter password"
                      //  value={password}
                      //   onChange={handlePasswordChange}

                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    {/* <button
                  
                    type="submit"
                    style={{
                      width: "150px",
                      backgroundColor: "red",
                      height: "40px",
                      borderRadius: 4,
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    Login
                  </button> */}

                    <button
                      type="submit"
                      disabled={isButtonDisabled} // Set the disabled attribute
                      style={{
                        width: "150px",
                        backgroundColor: isButtonDisabled ? "gray" : "red", // Change color based on disabled state
                        height: "40px",
                        borderRadius: 4,
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      Login
                    </button>
                    {/* <button disabled style={BUttonDisble}>loginsss </button> */}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {/* <Link href="#"> Forgot password? </Link> */}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
