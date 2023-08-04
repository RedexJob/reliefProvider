// styled components
import { Header } from "@components/Widget/style";
import React from "react";
// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import GenderNav from "@components/GenderNav";
import MonthNavigator from "@ui/Navigator/MonthNavigator";
import EditUser from './EditUsers'
// import Group from './Group';
import NoDataPlaceholder from "@components/NoDataPlaceholder";

// utils
import { generateAlphabet } from "@utils/helpers";
import { nanoid } from "nanoid";

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
  Box,

} from "@mui/material";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import DeleteIcon from "@mui/icons-material/Delete";
import  CrearteUsers from './CrearteUsers'
const CompanyUsers = () => {
  const contentRef = useRef(null);

  const [products, setProductData] = useState([]);
  const [hasMore, setHasMore] = useState(true); // For infinite scrolling
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  console.log(products,'products')
  const itemsPerPage = 10; // Number of items per page


  useEffect(() => {
    // Fetch data from the API
    const token = "3952|yZfrkiN9ixDvjAirkmRo5TtUEY0xFWs1USuDKmbm";
    const items = JSON.parse(localStorage.getItem("token"));
    axios
      .get("https://medical.studiomyraa.com/api/get_provider_employee/1", {
        headers: { Authorization: ` Bearer ${items}` },
      })
      .then((response) => {
        if (response.data  &&  Array.isArray(response.data.data)) {
          // Update the products state with the fetched data

          setProductData(response.data.data);
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

  // Function to fetch more data for infinite scrolling
  const fetchMoreData = () => {
    // Implement your API call here to fetch the next set of data based on currentPage
    // Example:
    // const nextPage = currentPage + 1;
    // axios.get(`your-api-url?page=${nextPage}`).then((response) => {
    //   if (response.data && Array.isArray(response.data.data)) {
    //     // Update the products state with the new data
    //     setProductData((prevData) => [...prevData, ...response.data.data]);
    //     setCurrentPage(nextPage);
    //   } else {
    //     console.error("Invalid API response format:", response.data);
    //   }
    //   setHasMore(response.data.data.length > 0);
    // }).catch((error) => {
    //   console.error("Error fetching data:", error);
    // });

    // Since we don't have a real API call in this example, we'll simulate fetching more data after a delay.
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newData = Array.from({ length: itemsPerPage }, (_, index) => ({
        id: `new-${nanoid()}`,
        user_id: `User ${nextPage}-${index + 1}`,
        // ... (other properties)
      }));
      setProductData((prevData) => [...prevData, ...newData]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < 5); // Assuming there are 5 pages in total
    }, 1000);
  };


    // State variables to manage selected user and edit dialog open state
    const [selectedUser, setSelectedUser] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
  
    // Function to handle opening the edit dialog for a particular user
    const handleEditUser = (user) => {
      setSelectedUser(user);
      setEditDialogOpen(true);
    };

  return (
    <Widget name="PatientsList">
      <WidgetBody style={{ padding: 0 }} elRef={contentRef}>
        <div className="card-body">
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="content-container" // Replace "content-container" with the ID of the container that should have the scrolling behavior
          >
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
                     Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Enabled?</TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Last Login
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.email}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>{product.updated_at}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" onClick={handleClickOpen}>
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
                    
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
          <br />
        </div>
      </WidgetBody>
      
      <EditUser user={selectedUser} handleClose={() => setEditDialogOpen(false)} open={editDialogOpen} />

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Users</DialogTitle>
        <CrearteUsers  handleClose={handleClose}/>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </Widget>
  );
};

export default CompanyUsers;
