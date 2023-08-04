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
  } from "@mui/material";

function CompanyInfo() {


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
        const response = await axios.post("https://medical.studiomyraa.com/api/update_provider_company", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: ` Bearer ${items}` 
          },
        });
  
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
      formData.append("company_name", companyName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("postal_code", postCode);
      formData.append("timezone", timeZone);
      formData.append("state", state);
      formData.append("id", companyId);


    
      makeAPICall(formData);
    };


const [companyId, setCompanyId] = useState('1')
    const [companyName, setCompanyName] = useState()

    const CompnaynameChange = (event) =>{
      event.preventDefault();
      setCompanyName(event.target.value)
    }

    const [email, setEmail] = useState()

    const ChangeEmail = (event) =>{
      event.preventDefault();
      setEmail(event.target.value)
    }

    const [phone , setPhone] =useState()

    const ChangePhone = (e) =>{
      setPhone(e.target.value)
    }

    const [address, setaddress] = useState()
    const AddressChange = (e) =>{
      setaddress(e.target.value)
    }
    

    const [postCode, setPostCode] = useState()
    const ChangePostalcode = (e) =>{
      setPostCode(e.target.value)
    }

  

    const [timeZone, setTimeZone] = useState()
    const ChangeTimezone = (e) =>{
      setTimeZone(e.target.value)
    }
    

    const [state, setState] = useState()
    const ChangeState = (e) =>{
      setState(e.target.value)
    }
  return (
    <>           
              <CardContent>
                {/* <Typography variant="h5">Company Information</Typography> */}
                <form name="username_change" method="post">
                  <Box mt={2}>
                    <TextField
                      id="username_change_email"
                      name="username_change[email]"
                      label="Company Name"
                      variant="outlined"
                      value={companyName}
                      onChange={CompnaynameChange}
                      fullWidth
                      required
                      defaultValue=""
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="username_change_username"
                      name="username_change[username]"
                      label="Email Address"
                      variant="outlined"
                      value={email}
                      onChange={ChangeEmail}
                      fullWidth
                      required
                      defaultValue=""
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="username_change_username"
                      name="username_change[username]"
                      label="Phone Number"
                      variant="outlined"
                      value={phone}
                      onChange={ChangePhone}
                      fullWidth
                      required
                      defaultValue=""
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="username_change_username"
                      name="username_change[username]"
                      label="Address"
                      variant="outlined"
                      value={address}
                      onChange={AddressChange}
                      fullWidth
                      required
                      defaultValue=""
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="username_change_username"
                      name="username_change[username]"
                      label="Postal code"
                      variant="outlined"
                      value={postCode}
                      onChange={ChangePostalcode}
                      fullWidth
                      required
                      defaultValue=""
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="username_change_username"
                      name="username_change[username]"
                      label="Time zone"
                      variant="outlined"
                      value={timeZone}
                      onChange={ChangeTimezone}
                      fullWidth
                      required
                      defaultValue=""
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="username_change_username"
                      name="username_change[username]"
                      label="state"
                      variant="outlined"
                      value={state}
                      onChange={ChangeState}
                      fullWidth
                      required
                      defaultValue=""
                    />
                  </Box>
                  {/* <input
                    type="hidden"
                    id="username_change__token"
                    name="username_change[_token]"
                    value="wldSYHr-ywUqj75Y7iWj-BRqVCD9iQhRzw9O1m0JvJg"
                  /> */}
                  
                  <Box mt={3}>
                    {/* <Button variant="contained" color="success"  onChange={handleAPICall}>
                      <i className="fa fa-save"></i> Save Changes
                    </Button> */}

                    <Button
                variant="contained"
                color="primary"
                size="large"
                // endIcon={<SaveIcon />}
                onClick={handleAPICall}
              >
                Save Changes
              </Button>
                  </Box>
                </form>
              </CardContent>

    </>
  )
}

export default CompanyInfo