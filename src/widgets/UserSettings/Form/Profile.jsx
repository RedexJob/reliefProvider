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
} from "@mui/material";

function Profile() {

  const [profileData, setProfileData] = useState(null);



console.log(profileData,'profileData.profileData...........')
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("token"));
    // Make the API call when the component mounts
    axios.get('https://medical.studiomyraa.com/api/profile',
  
    {
      headers: {
        Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: ` Bearer ${items}`,
      },
    })
      .then(response => {
        console.log(response,'rrrr get wali api ')
        setProfileData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const makeAPICall = async (data) => {
    const items = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        "https://medical.studiomyraa.com/api/update_provider_profile",
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
    formData.append("name", companyName ? companyName : "");
    formData.append("lname", lname ? lname : "");
    formData.append("email", email ? email : "");
    formData.append("phone", phone ? phone : "");
    formData.append("address", address ? address : "");
    formData.append("address2", addressTwo ? addressTwo : "");
    formData.append("city", city ? city : "");
    formData.append("pincode", postCode ? postCode : "");
    formData.append("dob", dob ? dob : "");
    formData.append("about", about ? about : "");
    formData.append("state", state ? state : "");
    formData.append("img", patientUse ? patientUse :'' );

    makeAPICall(formData);
  };
  const items = JSON.parse(localStorage.getItem("profile"));

  console.log(items,'ittttttttttttttttttttt')
  const [companyId, setCompanyId] = useState("1");

  const [patientUse, setPatientUse] = useState(items?.img);

  console.log(patientUse,'patientUse')
  const ChangePartient = (e) => {
    
    console.log(e.target.files,'file her eeeeeeeeeeeeeeeeeeeee');
    setPatientUse(URL.createObjectURL(e.target.files[0]));
  };

  const [companyName, setCompanyName] = useState(items?.name);

  const CompnaynameChange = (event) => {
    event.preventDefault();
    setCompanyName(event.target.value);
  };

  const [dob, setDob] = useState();

  const ChangeDob = (event) => {
    event.preventDefault();
    setDob(event.target.value);
  };

  const [about, setAbout] = useState(items?.about);

  const ChangeAbout = (event) => {
    event.preventDefault();
    setAbout(event.target.value);
  };

  const [lname, setLname] = useState(items?.lname);

  const ChangeLname = (event) => {
    event.preventDefault();
    setLname(event.target.value);
  };

  const [email, setEmail] = useState(items?.email);

  const ChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const [phone, setPhone] = useState(items?.phone);

  const ChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const [address, setaddress] = useState(items?.address);
  const AddressChange = (e) => {
    setaddress(e.target.value);
  };

  const [addressTwo, setaddressTwo] = useState(items?.address2);
  const AddressChangeTwo = (e) => {
    setaddressTwo(e.target.value);
  };

  const [postCode, setPostCode] = useState();
  const ChangePostalcode = (e) => {
    setPostCode(e.target.value);
  };

  const [timeZone, setTimeZone] = useState();
  const ChangeTimezone = (e) => {
    setTimeZone(e.target.value);
  };

  const [city, setCity] = useState(items.city);

  const ChangeCity = (e) => {
    setCity(e.target.value);
  };

  const [state, setState] = useState(items?.state);
  const ChangeState = (e) => {
    setState(e.target.value);
  };

  const [profileImg,setProfileImg] = useState(items?.img)

  return (
    <>
      <CardContent>
        {/* <Typography variant="h5">Company Information</Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="First Name"
                type="text"
                id="provider_product_name"
                name="provider_product_"
                value={companyName}
                onChange={CompnaynameChange}
                
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <img src={profileImg} alt="profile" width={50} height={50} />
            </FormControl>
          </Grid> */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="last Name"
                id="provider_product_name"
                name="provider_product_"
                value={lname}
                onChange={ChangeLname}
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email "
                id="provider_product_name"
                name="provider_product_"
                value={email}
                onChange={ChangeEmail}
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="phone Type"
                id="provider_product_name"
                name="provider_product_"
                value={phone}
                onChange={ChangePhone}
                
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="DOB "
                id="provider_product_name"
                name="provider_product_"
                placeholder="DD/MM/YYYY"
                value={dob}
                onChange={ChangeDob}
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Address"
                id="provider_product_name"
                name="provider_product_"
                value={address}
                onChange={AddressChange}
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Address 2"
                id="provider_product_name"
                name="provider_product_"
                placeholder="DD/MM/YYYY"
                value={addressTwo}
                onChange={AddressChangeTwo}
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label=" City"
                id="provider_product_name"
                name="provider_product_"
                value={city}
                onChange={ChangeCity}
                
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="state"
                id="provider_product_name"
                name="provider_product_"
                placeholder="DD/MM/YYYY"
                value={state}
                onChange={ChangeState}
                
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="pinCode"
                id="provider_product_name"
                name="provider_product_"
                value={postCode}
                onChange={ChangePostalcode}
                
              />
            </FormControl>
          </Grid>

          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="About"
                id="provider_product_name"
                name="provider_product_"
                placeholder="DD/MM/YYYY"
                value={about}
                onChange={ChangeAbout}
                
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
                
              />
            </FormControl>
          </Grid> */}

          <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
              {/* <TextField
                label="img"
                type="number"
                id="provider_product_name"
                name="provider_product_"
                value={patientUse}
                onChange={ChangePartient}
                
              /> */}
              <input type="file" onChange={ChangePartient} />
              <img src={patientUse} />

            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ margin: "auto", marginTop: "28px" }}
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

export default Profile;
