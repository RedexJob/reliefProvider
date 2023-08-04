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
                        control={<Checkbox defaultChecked />}
                        label="free delevery"
                      />
                      <Button variant="text" onClick={Chnagefree}>
                        <ManageAccountsIcon />
                        configuration
                      </Button>
                    </TableCell>

                    <TableCell>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="In Store Pickup"
                      />
                    </TableCell>

                    <TableCell>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
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
                          // value={formData.provider_product_name}
                          // onChange={handleChange}

                          value=""
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
                          value=""
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
                          id="provider_product_name"
                          name="provider_product_"
                          // value={formData.provider_product_name}
                          // onChange={handleChange}

                          value=""
                          required
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          label="Name To Display"
                          id="provider_product_name"
                          name="provider_product_"
                          // value={formData.provider_product_name}
                          // onChange={handleChange}

                          value=""
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
                          value=""
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
