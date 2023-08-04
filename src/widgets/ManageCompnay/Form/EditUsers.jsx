import { DialogContentText, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, Box,DialogTitle, TextField } from '@mui/material';
import React, { useState,useEffect } from "react";
import axios from "axios";
const EditUser = ({ user, handleClose, open }) => {

    console.log(user,'users edit..............')
  // State variables to manage user data for editing
//   const [name, setName] = useState(user.name || '');
//   const [email, setEmail] = useState(user.email || '');
//   const [status, setStatus] = useState(user.status || '');
//   const [lastLogin, setLastLogin] = useState(user.lastLogin || '');

  // Function to handle form submission for editing
//   const handleEdit = () => {
//     // Implement your logic here to perform the edit operation
//     // You can make an API call to update the user data in the database
//     // For this example, let's just log the edited data
//     console.log({
//       id: user.id,
//       name: name,
//       email: email,
//       status: status,
//       lastLogin: lastLogin,
//     });

//     // Close the dialog after successful edit
//     handleClose();
//   };

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
      "https://medical.studiomyraa.com/api/update_provider_employee",
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



const handleAPICall = () => {
  // Prepare your form data to send in the API call (if needed)
  const formData = new FormData();
  formData.append("name", companyName);
  formData.append("lname", lname);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("id", user.id);
//   formData.append("timezone", timeZone);
//   formData.append("state", state);

  makeAPICall(formData);


  handleClose();
};

const [companyId, setCompanyId] = useState("1");
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

const [lname, setLname] = useState();
const  ChangeLastname = (e) => {
    setLname(e.target.value);
};

// const [timeZone, setTimeZone] = useState();
// const ChangeTimezone = (e) => {
//   setTimeZone(e.target.value);
// };

// const [state, setState] = useState();
// const ChangeState = (e) => {
//   setState(e.target.value);
// };
  return (
    <Dialog fullWidth maxWidth="sm"  sx={{marginTop:'90px'}} open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <form name="username_change" method="post" style={{paddingLeft:' 15px', paddingRight:'15px'}}>
          <Box mt={2}>
            <TextField
              id="username_change_email"
              name="username_change[email]"
              label="First Name"
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
              label="Last Name"
              variant="outlined"
              
              value={lname}
              onChange={ChangeLastname}
              fullWidth
              required
              defaultValue=""
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="username_change_username"
              name="username_change[username]"
              label="Email ID"
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
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={ChangePhone}
              fullWidth
              required
              defaultValue=""
            />
          </Box>
          {/* <Box mt={2}>
            <TextField
              id="username_change_username"
              name="username_change[username]"
              label="Email Address"
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
              label="Confirm New Password"
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
          </Box> */}
          {/* <input
                    type="hidden"
                    id="username_change__token"
                    name="username_change[_token]"
                    value="wldSYHr-ywUqj75Y7iWj-BRqVCD9iQhRzw9O1m0JvJg"
                  /> */}

          <Box mt={3} sx={{ padding: "20px" }}>
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
    </Dialog>
  );
};

export default EditUser;