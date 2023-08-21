// styled components
import { Header } from "@components/Widget/style";
import React from "react";
// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
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
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { width } from "@mui/system";
import { createStore } from "@reduxjs/toolkit";
function ShopMyCompany() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [freeD, setFreeD] = useState(false);

  const Chnagefree = () => {
    setFreeD(!freeD);
  };

  const [rateD, setRateD] = useState(false);

  const ChnageRate = () => {
    setRateD(!rateD);
  };

  const [delevery, setDelevery] = useState(false);
  const ChangeDelevery = (e) => {

    console.log(e.target.checked,'delivery status')
    setDelevery(e.target.checked);
    
  };

  const [store, setStore] = useState(false);
  const ChangeStore = (e) => {

    console.log(e.target.checked,'store status')
    setStore(e.target.checked);
    
  };

  const [rate , setRate] = useState(false);
  const ChangeRate = (e) => {
    console.log(e.target.checked,'rate status')
    setRate(e.target.checked);
    
  };


  const handleAPICallStatus = async (event) => {

    event.preventDefault();
  
    const formData = new FormData();
    formData.append("free_delivery", delevery ? 'yes' : 'no');
    formData.append("in_store_pickup", store ? 'yes' : 'no');
    formData.append("flate_rate", rate ? 'yes' : 'no');
    formData.append("company_id", companyId ? companyId :'');
  
    
    const token = JSON.parse(localStorage.getItem("token"));
     axios.post(
        "https://medical.studiomyraa.com/api/provider_delivery_setting",
        formData,
        { headers: { "Accept": "application/json", Authorization: ` Bearer ${token}` }
      })
      
      .catch( (error) =>{
        console.error(error)
      })
  
  
  };

  const [nameTo, setNameTo] = useState()

  const ChangeName = (e) =>{
    e.preventDefault();
    setNameTo(e.target.value)
  }

 const [description, setDescription] = useState()

 const ChangeDescription = (e) =>{
  e.preventDefault();
  setDescription(e.target.value)
 }

 const [companyId, setCompanyID] = useState('1')



  const handleAPICall = async (event) => {

    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", nameTo ? nameTo : '');
    formData.append("description", description ? description :'');
    formData.append("id", companyId ? companyId :'');
  
    
    const token = JSON.parse(localStorage.getItem("token"));
     axios.post(
        "https://medical.studiomyraa.com/api/update_provider_delivery_module_1",
        formData,
        { headers: { "Accept": "application/json", Authorization: ` Bearer ${token}` }
      })
      
      .catch( (error) =>{
        console.error(error)
      })
  
  
  };

  const [amount,setAmount] = useState()

  const ChangeAmount =(e) =>{
    e.preventDefault();
    setAmount(e.target.value)
  }

  const [nameTor, setNameTor] = useState()

  const ChangeNameRate = (e) =>{
    e.preventDefault();
    setNameTor(e.target.value)
  }
 const [descriptionR, setDescriptionR] = useState()

 const ChangeDescriptionRate = (e) =>{
  e.preventDefault();
  setDescriptionR(e.target.value)
 }
  const handleAPICallTwo = async (event) => {

    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", nameTor ? nameTor : '');
    formData.append("amount", amount ? amount : '');
    formData.append("description", descriptionR ? descriptionR :'');
    formData.append("id", companyId ? companyId :'');

    
  
    
    const token = JSON.parse(localStorage.getItem("token"));
     axios.post(
        "https://medical.studiomyraa.com/api/update_delivery_module_2",
        formData,
        { headers: { "Accept": "application/json", Authorization: ` Bearer ${token}` }
      })
      
      .catch( (error) =>{
        console.error(error)
      })
  
  
  };
  
  return (
    <>
      <Widget name="PatientsList">
        {/* <Typography variant="h6" style={{ marginLeft: "15px" }}>
          Appointment Types
        </Typography> */}
        <WidgetBody style={{ padding: 0 }}>
          <div className="card-body">
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Item>
                  <FormGroup>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={ChangeDelevery}
                            checked={delevery}
                          />
                        }
                        label="free delevery"
                      />
                      <Button variant="text" onClick={Chnagefree}>
                        <ManageAccountsIcon />
                        configuration
                      </Button>
                    </TableCell>

                    <TableCell>
                      <FormControlLabel
                        control={<Checkbox 
                          onChange={ChangeStore}
                          checked={store}
                           />}
                        label="In Store Pickup"
                      />
                    </TableCell>

                    <TableCell>
                      <FormControlLabel
                        control={<Checkbox 
                          onChange={ChangeRate}
                          checked={rate}
                           />}
                        label="Flat Rate Delivery"
                      />
                      <Button variant="text" onClick={ChnageRate}>
                        <ManageAccountsIcon />
                        configuration
                      </Button>
                    </TableCell>

                    <br />
                    <Button
                      variant="contained"
                      size="small"
                      style={{ height: "40px", width: "auto" }}
                      onClick={handleAPICallStatus}
                    >
                      Publish Changes
                    </Button>
                  </FormGroup>
                </Item>
              </Grid>

              {freeD && (
                <Grid item xs={7}>
                  <Typography variant="h6" gutterBottom>
                    Edit Delivery Module Settings
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          label="Name To Display"
                          id="provider_product_name"
                          name="provider_product_"
                          value={nameTo}
                          onChange={ChangeName}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          label="Description To Display"
                          id="provider_product_name_strain"
                          name="provider_product_name_strain"
                          value={description}
                          onChange={ChangeDescription}
                          required
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SaveIcon />}
                    onClick={handleAPICall}
                  >
                    Save Changes
                  </Button>
                </Grid>
              )}

              {rateD && (
                <Grid item xs={7}>
                  <Typography variant="h6" gutterBottom>
                    Edit Delivery Module Settings
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          label="Amount To Charge"
                          id="provider_product"
                          name="provider_product_"
                          value={amount}
                          onChange={ChangeAmount}
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          label="Name To Display"
                          id="provider_"
                          name="provider_product_"
                          value={nameTor}
                          onChange={ChangeNameRate}

                        
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          label="Description To Display"
                          id="provider_product_name_strain"
                          name="provider_product_name_strain"
                          value={descriptionR}
                          onChange={ChangeDescriptionRate}
                          required
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SaveIcon />}
                    onClick={handleAPICallTwo}
                  >
                    Save Changes
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        </WidgetBody>
      </Widget>
    </>
  );
}

export default ShopMyCompany;
