import React, { useState,useEffect } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Dialog,
  FormControl
} from "@mui/material";

function UpdateThankYou({ user, handleClose, open }) {

 

  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("token"));
    if (items) {
      setItems(items);
    }
  }, []);

    const makeAPICall = async (data) => {

      const items = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.post(
          "https://medical.studiomyraa.com/api/update_providers_emailtemplate",
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
      formData.append("name", companyName ? companyName : " ");
      formData.append("content", content ? content : "");
      formData.append("subject", email ? email : "");
      formData.append("id", user.id);
  
      makeAPICall(formData);
    };
  
    const [companyId, setCompanyId] = useState("1");
    const [companyName, setCompanyName] = useState();
  
    const CompnaynameChange = (event) => {
      event.preventDefault();
      setCompanyName(event.target.value);
    };
  
    const [content, setContent] = useState();
  
    const ChangeContent = (e) => {
      setContent(e.target.value);
    };
  
    const [email, setEmail] = useState();
  
    const ChangeEmail = (event) => {
      event.preventDefault();
      setEmail(event.target.value);
    };




  return (
 
       <Dialog
          fullWidth
          maxWidth="sm"
          sx={{ marginTop: "90px" }}
          open={open}
          onClose={handleClose}
        >
      <CardContent>
        <Typography variant="h5">Edit Email Template</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="username_change_email"
                name="username_change[email]"
                label="Name"
                variant="outlined"
                multiline
                value={companyName || user?.name}
                onChange={CompnaynameChange}
                fullWidth
                required
                defaultValue=""
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="username_change_email"
                name="username_change[email]"
                label="Subject"
                variant="outlined"
                multiline
                value={email || user?.subject}
                onChange={ChangeEmail}
                fullWidth
                required
                defaultValue=""
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} >
            <FormControl fullWidth margin="normal">
              <TextField
                id="username_change_email"
                name="username_change[email]"
                label="Email Content"
                variant="outlined"
                multiline
                value={content || user?.content}
                onChange={ChangeContent}
                fullWidth
                required
                defaultValue=""
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              // endIcon={<SaveIcon />}
              onClick={handleAPICall}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>

      </CardContent>
      </Dialog>
   
  );
}

export default UpdateThankYou;
