import React, { useState,useEffect } from "react";
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
} from "@mui/material";

function CreateCouponDiscount() {

  const makeAPICall = async (data) => {

    const items = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        "https://medical.studiomyraa.com/api/add_providers_coupons",
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
    formData.append("name", companyName);
    formData.append("code", email);
    formData.append("discount", phone);
    formData.append("discountType", address);
    formData.append("description", postCode);
    formData.append("expiration", timeZone);
    // formData.append("is_public", state);
    formData.append("patient_uses", patientUse);

    formData.append("provider_company_id", companyId);

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

  const [email, setEmail] = useState();

  const ChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const [phone, setPhone] = useState();

  const ChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const [address, setaddress] = useState();
  const AddressChange = (e) => {
    setaddress(e.target.value);
  };

  const [postCode, setPostCode] = useState();
  const ChangePostalcode = (e) => {
    setPostCode(e.target.value);
  };

  const [timeZone, setTimeZone] = useState();
  const ChangeTimezone = (e) => {
    setTimeZone(e.target.value);
  };

//   const [state, setState] = useState();
//   const ChangeState = (e) => {
//     setState(e.target.value);
//   };
  return (
    <>
      <CardContent>
        {/* <Typography variant="h5">Company Information</Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Discount Name"
                type="text"
                id="provider_product_name"
                name="provider_product_"
                value={companyName}
                onChange={CompnaynameChange}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Discount Code"
                id="provider_product_name"
                name="provider_product_"
                value={email}
                onChange={ChangeEmail}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                 label="Discount Amount"
                id="provider_product_name"
                name="provider_product_"
                value={phone}
                onChange={ChangePhone}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                 label="Discount Type"
                id="provider_product_name"
                name="provider_product_"
                value={address}
                onChange={AddressChange}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
               
                label="Description"
                id="provider_product_name"
                name="provider_product_"
                value={postCode}
                onChange={ChangePostalcode}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                 label="Expires On"
                id="provider_product_name"
                name="provider_product_"
                placeholder="DD/MM/YYYY"
                value={timeZone}
                onChange={ChangeTimezone}
                required
              />
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Expires On"
                id="provider_product_name"
                name="provider_product_"
                value={state}
                onChange={ChangeState}
                required
              />
            </FormControl>
          </Grid> */}

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Uses Per Patient"
                type="number"
                id="provider_product_name"
                name="provider_product_"
                value={patientUse}
                onChange={ChangePartient}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} >
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{    margin: 'auto',  marginTop: '28px'}}
              // endIcon={<SaveIcon />}
              onClick={handleAPICall}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
}

export default CreateCouponDiscount;
