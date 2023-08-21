// import React, { useState } from "react";
// import axios from "axios";

// import {
//     Box,
//     Button,
//     Card,
//     CardContent,
//     Grid,
//     TextField,
//     Typography,
//   } from "@mui/material";

// function ThankYou() {

//     const token = "4024|tIj4OPX9yE2zfbwx40sLNmmqb7JG50NcnfUfXI8t";
//     const makeAPICall = async (data) => {
//       try {
//         const response = await axios.post("https://medical.studiomyraa.com/api/add_providers_thankyoupage", data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: ` Bearer ${token}`
//           },
//         });

//         // Handle the API response here if needed
//         console.log(response.data);
//       } catch (error) {
//         // Handle errors if the API call fails
//         console.error(error);
//       }
//     };

//     // Add your logic to trigger the API call when needed.
//     // For example, if you have a button to initiate the API call:

//     const handleAPICall = () => {
//       // Prepare your form data to send in the API call (if needed)
//       const formData = new FormData();
//       formData.append("content", companyName);
//       formData.append("provider_company_id", companyId);

//       makeAPICall(formData);
//     };

// const [companyId, setCompanyId] = useState('1')
//     const [companyName, setCompanyName] = useState()

//     const CompnaynameChange = (event) =>{
//       event.preventDefault();
//       setCompanyName(event.target.value)
//     }

//   return (
//     <>
//               <CardContent>
//                 <Typography variant="h5">Thank You Page</Typography>
//                 <form name="username_change" method="post">
//                   <Box mt={2}>
//                     <TextField
//                       id="username_change_email"
//                       name="username_change[email]"
//                       label="Company Name"
//                       variant="outlined"
//                       multiline
//                       value={companyName}
//                       onChange={CompnaynameChange}
//                       fullWidth
//                       required
//                       defaultValue=""
//                     />

//                     <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 // endIcon={<SaveIcon />}
//                 onClick={handleAPICall}
//               >
//                 Save Changes
//               </Button>
//                   </Box>
//                 </form>
//               </CardContent>

//     </>
//   )
// }

// export default ThankYou;

// styled components
import { Header } from "@components/Widget/style";
import React from "react";
// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import DeleteIcon from "@mui/icons-material/Delete";
// hooks
import { useState, useRef, useEffect } from "react";
import useGenderFilter from "@hooks/useGenderFilter";
import InfiniteScroll from "react-infinite-scroll-component";
// data placeholder
import { patients } from "@db/patients";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateSms from "./CreateSms";
import EditSms from "./EditSms";
function Sms() {
  // modal open state here.......
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // State variables to manage selected user and edit dialog open state
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Function to handle opening the edit dialog for a particular user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const [products, setProductData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const items = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://medical.studiomyraa.com/api/get_providers_smstemplate/1", {
        headers: { Authorization: ` Bearer ${items}` },
      })
      .then((response) => {
        console.log(response.data.result, "rrrrrrrrrrrrrrrrrrr");
        if (response.data.result && Array.isArray(response.data.result)) {
          // Update the products state with the fetched data
          setProductData(response.data.result);
        } else {
          console.error("Invalid API response format:", response.data);
          setProductData([]);
        }
        // setProductData(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Widget name="PatientsList">
        <Button
          variant="contained"
          color="success"
          onClick={handleClickOpen}
          style={{ marginRight: "87rem" }}
        >
          Create
        </Button>
        <WidgetBody style={{ padding: 0 }}>
          {/* <Typography variant="h6" style={{ marginLeft: "15px" }}>
            {" "}
            SMS Templates
          </Typography> */}
          <div className="card-body">
            <Table sx={{ minWidth: 650 }} className="table table-bordered">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 150, maxWidth: "25%" }}>
                    <TableSortLabel active={false} direction="asc">
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      content
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Action
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.content}</TableCell>

                    <TableCell>
                      {/* <Button variant="contained" color="success"
                      onClick={handleClickOpen}
                    >
                      Add
                    </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "5px" }}
                        onClick={() => handleEditUser(product)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <br />
          </div>

          <EditSms
            user={selectedUser}
            handleClose={() => setEditDialogOpen(false)}
            open={editDialogOpen}
          />
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Create SMS Template</DialogTitle>
            <CreateSms handleClose={handleClose} />
            {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
          </Dialog>
        </WidgetBody>
      </Widget>
    </>
  );
}

export default Sms;
