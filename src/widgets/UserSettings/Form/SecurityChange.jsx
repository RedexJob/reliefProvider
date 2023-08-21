import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  Typography,
  Divider,
} from "@mui/material";

function SecurityChange() {
  const makeAPICall = async (data) => {
    const items = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        "https://medical.studiomyraa.com/api/changePassword",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: ` Bearer ${items}`,
          },
        }
      );

      // Handle the API response here if needed
      console.log(response.data);
    } catch (error) {
      // Handle errors if the API call fails
      console.error(error);
    }
  };

  // Add your logic to trigger the API call when needed.
  // For example, if you have a button to initiate the API call:

  const handleAPICall = () => {
    // Prepare your form data to send in the API call (if needed)
    const formData = new FormData();
    formData.append("current_password", companyName ? companyName : "");
    formData.append("password", lname ? lname : "");
    formData.append("password_confirmation", email ? email : "");
    // formData.append("img", patientUse);

    makeAPICall(formData);
  };

  const [companyId, setCompanyId] = useState("1");

  const [patientUse, setPatientUse] = useState();
  const ChangePartient = (e) => {
    setPatientUse(e.target.value);
  };
  const [companyName, setCompanyName] = useState();

  const CompnaynameChange = (event) => {
    event.preventDefault();
    setCompanyName(event.target.value);
  };

  const [lname, setLname] = useState();

  const ChangeLname = (event) => {
    event.preventDefault();
    setLname(event.target.value);
  };

  const [email, setEmail] = useState();

  const ChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };


 return (
    <>
      <CardContent>
        <Typography variant="h5">Change Password</Typography>

        <Grid container spacing={2}>
        

            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Current Password"
                  id="provider_product_name"
                  name="provider_product_"
                  value={companyName}
                  onChange={CompnaynameChange}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Password"
                  id="provider_product_name"
                  name="provider_product_"
                  value={lname}
                  onChange={ChangeLname}
                  required
                />
              </FormControl>
        
            {/* </Grid> */}
          </Grid>      
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Password Confirmation"
                  id="provider_product_name"
                  name="provider_product_"
                  value={email}
                  onChange={ChangeEmail}
                  required
                  type="password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
              <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    // endIcon={<SaveIcon />}
                    onClick={handleAPICall}
                  >
                    Save Changes
                  </Button>
              </FormControl>
            </Grid>
        </Grid>
      </CardContent>
    </>
  );
}

export default SecurityChange;



