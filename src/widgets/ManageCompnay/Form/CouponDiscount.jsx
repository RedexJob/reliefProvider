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
import moment from "moment";
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
import CreateCouponDiscount from "./CreateCouponDiscount";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditCouponDiscount from "./EditCouponDiscount";

function CouponDiscount() {
  const [products, setProductData] = useState([]);

  // modal open state here.......
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  // State variables to manage selected user and edit dialog open state
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Function to handle opening the edit dialog for a particular user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



 const  DeleteData = async (id) => {


    let person = prompt(
      "Are you sure you want to delete this coupon!! then type - YES",
      "YES"
    );
  
    if (person === "YES" || person === "yes") {
      // Delete API call
      const providerCompanyId = 1; // Replace with the actual provider_company_id
      const name = "Coupon Name"; // Replace with the actual coupon name
      const length = 10; // Replace with the actual length
  
  
      const token = JSON.parse(localStorage.getItem("token"));
      // Create a new FormData and append the parameters as URL parameters
      const formData = new FormData();
      formData.append("provider_company_id", providerCompanyId);
      formData.append("name", name);
      formData.append("length", length);
  
      try {
        const response = await axios.delete(
          `https://medical.studiomyraa.com/api/delete_providers_coupons/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: formData,
          }
        );
  
        // Handle the API response here if needed
        console.log(response.data);
        alert("Deleted successfully!"); // Show success message to the user
      } catch (error) {
        // Handle errors if the API call fails
        console.error(error);
        alert("An error occurred while deleting the coupon."); // Show error message to the user
      }
    } else {
      alert("Cancel");
    }
  };


  
  useEffect(() => {
    // Fetch data from the API

    const items = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://medical.studiomyraa.com/api/get_providers_coupons/1", {
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
        <WidgetBody style={{ padding: 0 }}>
          <Typography variant="h6" style={{ marginLeft: "15px" }}>
            Coupons & Discounts
          </Typography>
          <div className="card-body">
            <Table sx={{ minWidth: 650 }} className="table table-bordered">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 150, maxWidth: "25%" }}>
                    <TableSortLabel active={false} direction="asc">
                      Coupon Code
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Name & Description
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Allowed Uses per Patient
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Expires On
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Display on Shop?
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>
                      {product.name}| {product.description}{" "}
                    </TableCell>
                    <TableCell>
                      {product.patient_uses ? product.patient_uses : "N/A"}
                    </TableCell>
                    <TableCell>{product.expiration}</TableCell>
                    <TableCell>
                      {" "}
                      {product.is_public ? product.is_public : "N/A"}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleClickOpen}
                      >
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "5px" }}
                        onClick={() => handleEditUser(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        style={{ color: "red", marginLeft: "5px" }}
                        onClick={ () => DeleteData(product.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <br />
          </div>
          <EditCouponDiscount
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
            <DialogTitle>Add Users</DialogTitle>
            <CreateCouponDiscount handleClose={handleClose} />
            {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
          </Dialog>
        </WidgetBody>
      </Widget>
    </>
  );
}

export default CouponDiscount;
