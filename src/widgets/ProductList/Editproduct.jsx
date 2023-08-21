import { DialogContentText, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, Box,DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";
const Editproduct = ({ user, handleClose, open }) => {

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



const token = "3691|dVlgSacqhxeyluycbpjRwulO1cETYyxZXwlxF5Au";
const makeAPICall = async (data) => {
  try {
    const response = await axios.post(
      "https://medical.studiomyraa.com/api/update_provider_employee",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: ` Bearer ${token}`,
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
  formData.append("product_name", companyName);
  formData.append("product_category", lname);
  formData.append("product_type", email);
  formData.append("species", phone);
  formData.append("method", user.id);
  formData.append("brand", timeZone);
  formData.append("strain", state);

  formData.append("amount", user.id);
  formData.append("sale_amount", timeZone);
  formData.append("thc_dosage", state);
  formData.append("cbd_dosage", user.id);
  formData.append("cbn", timeZone);
  formData.append("unit", state);
  formData.append("pos_id", user.id);
  formData.append("remaining_amount", timeZone);
  formData.append("description", state);
  formData.append("ingredients", user.id);
  formData.append("THC", timeZone);
  formData.append("CBD", state);
  formData.append("CBG", timeZone);
  formData.append("CBC", state);
  formData.append("THCA", user.id);
  formData.append("THCVA", timeZone);
  formData.append("CBDA", state);

  formData.append("CBGA", user.id);
  formData.append("img", timeZone);
  formData.append("id", state);


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
     <>
        <CardContent style={{ overflowY: "auto", maxHeight: "600px" }}>
            
            <Typography variant="h5" gutterBottom>
              Create Simple Product
            </Typography>

            <FormControl fullWidth margin="normal">
              <div>
                <input
                  type="checkbox"
                  id="provider_product_enabled"
                  name="provider_product_enabled"
                  // value={productName}
                  // onChange={ProductChange}
                />
                <label htmlFor="provider_product_enabled">
                  Display Product in Shop?
                </label>
              </div>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Product Name"
                    id="provider_product_name"
                    name="provider_product_"
                    // value={formData.provider_product_name}
                    // onChange={handleChange}

                    value={productName}
                    onChange={ProductChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="provider_product_category-label" required>
                    Product Category
                  </InputLabel>
                  <Select
                    labelId="provider_product_method-label"
                    id="provider_product_method_cat"
                    name="provider_product_method_cat"  
                    required
                    multiple
                    value={formDataD.provider_product_category}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Concentrates">Concentrates</MenuItem>
                    <MenuItem value="Edibles">Edibles</MenuItem>
                    <MenuItem value="Flower">Flower</MenuItem>
                    <MenuItem value="Orals">Orals</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    <MenuItem value="Pre Rolls">Pre Rolls</MenuItem>
                    <MenuItem value="Tinctures">Tinctures</MenuItem>
                    <MenuItem value="Topicals">Topicals</MenuItem>
                    <MenuItem value="Vaporizers">Vaporizers</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>
              Meta Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="provider_product_species-label" required>
                    Species
                  </InputLabel>
                  <Select
                    labelId="provider_product_method-label"
                    id="provider_product_method"
                    name="provider_product_method"
                    required
                    multiple
                    value={formDataD.provider_product_species}
                    onChange={handleSpeciesOfUseChange}
                  >
                    <MenuItem value="1">Indica</MenuItem>
                    <MenuItem value="2">Sativa</MenuItem>
                    <MenuItem value="3">Hybrid</MenuItem>
                    <MenuItem value="4">Indica Dominant Hybrid</MenuItem>
                    <MenuItem value="5">Sativa Dominant Hybrid</MenuItem>
                    <MenuItem value="6">CBD</MenuItem>
                    <MenuItem value="7">Blended</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="provider_product_method-label" required>
                    Method of Use
                  </InputLabel>
                  <Select
                    labelId="provider_product_method-label"
                    id="provider_product_category"
                    name="provider_product_method_use"
                    value={formDataD.provider_product_method}
                    required
                    onChange={handleMethodOfUseChange}
                  >
                    <MenuItem value="1">Oral</MenuItem>
                    <MenuItem value="2">Sublingual</MenuItem>
                    <MenuItem value="3">Topical</MenuItem>
                    <MenuItem value="4">Inhale</MenuItem>
                    <MenuItem value="5">Rectal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Brand/Company"
                    id="provider_product_name_brand"
                    name="provider_product_name_brand"
                    value={provider_product_name_brand}
                    onChange={ProductBrandChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Strain(Kush, Skywalker, etc)"
                    id="provider_product_name_strain"
                    name="provider_product_name_strain"
                    value={productStrain}
                    onChange={ProductStrainChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              Pricing & Dosage
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Amount"
                    id="provider_product_name_amount"
                    name="provider_product_amount"
                    value={productAmount}
                    onChange={productAmountChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Sale amount"
                    id="provider_product_name_sales"
                    name="provider_product_name_sales"
                    value={salesAmount}
                    onChange={salesAmountChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="THC Dosage (in milligrams)"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={thc}
                    onChange={thcChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="CBD Dosage (in milligrams)"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={cbd}
                    onChange={cbdChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="CBN %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={cbn_percentage}
                    onChange={cbn_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Units Per Product"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={units_per_product}
                    onChange={units_per_productChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Unit Type"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={product_unit_type}
                    onChange={product_unit_typeChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              Inventory & POS Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Product POS ID"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={product_pos_id}
                    onChange={product_pos_idChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Amount Remaining in Inventory"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={inventory_remaining}
                    onChange={inventory_remainingChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* <Typography variant="h6" gutterBottom>
              Product Description... need to done
            </Typography>
            <Typography variant="h6" gutterBottom>
              Ingredients... need to done
            </Typography>

            <Typography variant="h6" gutterBottom>
              Cannabinoids
            </Typography> */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="THC %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={product_thc_percentage}
                    onChange={product_thc_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="CBD %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={product_cbd_percentage}
                    onChange={product_cbd_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="CBG %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={product_cbg_percentage}
                    onChange={product_cbg_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="CBC %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={cbc_percentage}
                    onChange={cbc_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="THCA %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={thca_percentage}
                    onChange={thca_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="THCVA %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={thcva_percentage}
                    onChange={thcva_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="CBDA %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={cbda_percentage}
                    onChange={cbda_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="CBCBGA %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={cbcbga_percentage}
                    onChange={cbcbga_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>
              Terpenes
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Camphene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={camphene_percentage}
                    onChange={camphene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Beta-Caryophyllene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={
                      caryophyllene_percentage
                    }
                    onChange={caryophyllene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Caryophyllene Oxide %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={
                      caryophyllene_oxide_percentage
                    }
                    required

                  onChange={caryophyllene_oxide_percentageChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Fenchol %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={fenchol_percentage}
                    onChange={fenchol_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Geraniol %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={geraniol_percentage}
                    onChange={geraniol_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Alpha-Humulene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={
                      alpha_humulene_percentage
                    }
                    onChange={alpha_humulene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Linalool %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={linalool_percentage}
                    onChange={linalool_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Limonene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={limonene_percentage}
                    onChange={limonene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Myrcene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={myrcene_percentage}
                    onChange={myrcene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Ocimene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={ocimene_percentage}
                    onChange={ocimene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Alpha-Phellandrene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={
                      alpha_phellandrene_percentage
                    }
                    onChange={alpha_phellandrene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Alpha-Pinene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={alpha_pinene_percentage}
                    onChange={alpha_pinene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Beta-Pinene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={beta_pinene_percentage}
                    onChange={beta_pinene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Alpha-Terpinene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={
                      alpha_terpinene_percentage
                    }
                    onChange={alpha_terpinene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Terpineol %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={terpineol_percentage}
                    onChange={terpineol_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Valencene %"
                    id="provider_product_name"
                    name="provider_product[name]"
                    value={valencene_percentage}
                    onChange={valencene_percentageChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* <Container maxWidth="sm">
              <Box mt={4} p={3}>
                <Typography variant="h5">Product Photos</Typography>
                <Box mt={2}>
                  <div className="form-group">
                    <label htmlFor="provider_product_newPhotos">
                      New photos
                    </label>
                    <div className="custom-file">
                      <input
                        type="file"
                        id="provider_product_newPhotos"
                        name="provider_product[newPhotos][]"
                        accept="image/*"
                        multiple
                        className="custom-file-input"
                      />
                      <label
                        htmlFor="provider_product_newPhotos"
                        className="custom-file-label"
                      ></label>
                    </div>
                  </div>
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SaveIcon />}
                  >
                    Save Changes
                  </Button>
                </Box>
                <Divider mt={2} />
                <Box mt={2} mb={4}>
                  <Typography variant="body1">
                    You have no photos uploaded at this time.
                  </Typography>
                </Box>
              </Box>
            </Container> */}

<Container maxWidth="sm">
    <Box mt={4} p={3}>
      <Typography variant="h5">Product Photos</Typography>
      <Box mt={2}>
        <div className="form-group">
          <label htmlFor="provider_product_newPhotos">
            New photos
          </label>
          <div className="custom-file">
            <input
              type="file"
              id="provider_product_newPhotos"
              name="provider_product[newPhotos][]"
              accept="image/*"
              multiple
              className="custom-file-input"
              onChange={handleFileChange}
            />
            <label
              htmlFor="provider_product_newPhotos"
              className="custom-file-label"
            >
              {/* Show the name of the selected files, if any */}
              {selectedFiles.length > 0
                ? selectedFiles.map((file) => file.name).join(', ')
                : 'Choose files'}
            </label>
          </div>
        </div>
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SaveIcon />}
        >
          Save Changes
        </Button>
      </Box>
      <Divider mt={2} />
      <Box mt={2} mb={4}>
        {selectedFiles.length === 0 ? (
          <Typography variant="body1">
            You have no photos uploaded at this time.
          </Typography>
        ) : (
          // Show the list of selected files, if any
          <Typography variant="body1">
            Selected Files: {selectedFiles.map((file) => file.name).join(', ')}
          </Typography>
        )}
      </Box>
    </Box>
  </Container>

            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SaveIcon />}
              onClick={handleAPICall}
            >
              Save Changes
            </Button>
          </CardContent>
     </>
  );
};

export default Editproduct;