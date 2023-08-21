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
  FormControl,


  MenuItem,
  InputLabel,
  Select
} from "@mui/material";

function EditTigger({ user, handleClose, open }) {


  console.log(user,'user edit tiger')
    const makeAPICall = async (data) => {
        const items = JSON.parse(localStorage.getItem("token"));
        try {
          const response = await axios.post(
            "https://medical.studiomyraa.com/api/update_providers_trigger",
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
        formData.append("triggerName", companyName ? companyName : " ");
        formData.append("description", content ? content : "");
        formData.append("event", email ? email : "");
        formData.append("delay", delay ? delay : "");
        formData.append(
          "notificationType",
          notificationType ? notificationType : ""
        );
        formData.append("company_id", companyId);
        formData.append("sms_template_id", smsId);
        formData.append("email_template_id", emaiId);
        formData.append("id", user?.id);
    
        makeAPICall(formData);
      };
    
      const [smsId, setSmsId] = useState("1");
      const [emaiId, setEmailId] = useState("2");
      const [companyId, setCompanyId] = useState("1");
      const [companyName, setCompanyName] = useState();
    
      const CompnaynameChange = (event) => {
        event.preventDefault();
        setCompanyName(event.target.value);
      };
    
      const [delay, setDelay] = useState();
    
      const ChangeDeley = (e) => {
        setDelay(e.target.value);
      };
    
      const [notificationType, setNotificationType] = useState();
    
      const ChangeNotify = (e) => {
        setNotificationType(e.target.value);
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
        <Typography variant="h5">Edit Trigger</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="username_change_email"
                name="username_change[email]"
                label="Name"
                variant="outlined"
                multiline
                value={companyName || user?.triggerName}
                onChange={CompnaynameChange}
                fullWidth
                required
                defaultValue=""
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="username_change_email"
                name="username_change[email]"
                label="Email Content"
                variant="outlined"
                multiline
                value={content || user?.description}
                onChange={ChangeContent}
                fullWidth
                required
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="patient_search_gender">
            Status Changed To (event)
              </InputLabel>
              <Select
                label="Status Changed To (event)"
                id="Status"
                name="patient_search[gender]"
                defaultValue=""
                value={email || user?.event}
                onChange={ChangeEmail}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="order">new order</MenuItem>
                <MenuItem value="denied">denied</MenuItem>
              </Select>
            </FormControl>
          </Grid>

         

       

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="patient_search_gender">
                Notification type
              </InputLabel>
              <Select
                label="Notification type"
                id="patient_search_gender"
                name="patient_search[gender]"
                defaultValue=""
                value={notificationType || user?.notificationType}
                onChange={ChangeNotify}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="email">email</MenuItem>
                <MenuItem value="msg">Text msg</MenuItem>
                <MenuItem value="denied">denied</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="username_change_email"
                name="username_change[email]"
                label="Delay (in minutes)"
                variant="outlined"
                multiline
                value={delay || user?.delay}
                onChange={ChangeDeley}
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
              style={{ margin: "auto", marginTop: "28px" }}
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

export default EditTigger;
