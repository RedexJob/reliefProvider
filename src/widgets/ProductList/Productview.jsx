// styled components
import { Header } from "@components/Widget/style";
import {
  LetterNav,
  LetterNavWrapper,
  LetterNavItem,
  NavWrapper,
} from "./style";

// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import GenderNav from "@components/GenderNav";
import MonthNavigator from "@ui/Navigator/MonthNavigator";
// import Group from './Group';
import NoDataPlaceholder from "@components/NoDataPlaceholder";

// utils
import { generateAlphabet } from "@utils/helpers";
import { nanoid } from "nanoid";

// hooks
import { useState, useRef, useEffect, useMemo } from "react";
import useGenderFilter from "@hooks/useGenderFilter";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// data placeholder
import { patients } from "@db/patients";

import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Divider,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import JoditEditor from "jodit-react";
import axios from "axios";
import { fromPairs } from "lodash";
import { events } from "@db/calendar_appointments";

const Findorder = () => {
  const contentRef = useRef(null);
  const editor = useRef(null);
  const [content, setContent] = useState();

  const [ingredients, setIngredients] = useState();
  console.log(content, "contentcontentcontentcontent");

  // current filter by month

  const [simple, setSimple] = useState(false);

  const OpenSimple = () => {
    setSimple(!simple);
    setProductType("simple");
  };

  const [variable, setVariable] = useState(false);

  const OpenSimplevariable = () => {
    setVariable(!variable);
    setProductType("variable");
  };

  // Add your API call function here using Axios with POST method and form-data
  const items = JSON.parse(localStorage.getItem("token"));
  const makeAPICall = async (data) => {
    try {
      const response = await axios.post(
        "https://medical.studiomyraa.com/api/add_Product",
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
      toast.success("Login successful");
    } catch (error) {
      // Handle errors if the API call fails
      toast.error("Login failed");
      console.error(error);
    }
  };

  // Add your logic to trigger the API call when needed.
  // For example, if you have a button to initiate the API call:

  const handleAPICall = () => {
    // Prepare your form data to send in the API call (if needed)
    const formData = new FormData();
    formData.append("product_name", productName ? productName : "");
    formData.append(
      "product_category",
      provider_product_category ? provider_product_category : ""
    );
    formData.append("product_type", productType ? productType : "");
    formData.append(
      "species",
      provider_product_species ? provider_product_species : ""
    );
    formData.append(
      "method",
      provider_product_method ? provider_product_method : ""
    );
    formData.append(
      "brand",
      provider_product_name_brand ? provider_product_name_brand : ""
    );
    formData.append("strain", productStrain ? productStrain : "");
    formData.append("amount", productAmount ? productAmount : "");
    formData.append("sale_amount", salesAmount ? salesAmount : "");
    formData.append("thc_dosage", thc ? thc : "");
    formData.append("cbd_dosage", cbd ? cbd : "");
    formData.append("cbn", cbn_percentage ? cbn_percentage : "");
    formData.append("unit", units_per_product ? units_per_product : "");
    formData.append("unit_type", product_unit_type ? product_unit_type : "");
    formData.append("pos_id", product_pos_id ? product_pos_id : "");
    formData.append(
      "remaining_amount",
      inventory_remaining ? inventory_remaining : ""
    );
    formData.append("description", content ? content : "");
    formData.append("ingredients", ingredients ? ingredients : "");

    formData.append(
      "THC",
      product_thc_percentage ? product_thc_percentage : ""
    );
    formData.append(
      "CBD",
      product_cbd_percentage ? product_cbd_percentage : ""
    );
    formData.append(
      "CBG",
      product_cbg_percentage ? product_cbg_percentage : ""
    );
    formData.append("CBG", cbc_percentage ? cbc_percentage : "");

    formData.append("THCA", thca_percentage ? thca_percentage : "");
    formData.append("THCVA", thcva_percentage ? thcva_percentage : "");
    formData.append("CBDA", cbda_percentage ? cbda_percentage : "");
    formData.append("CBGA", cbcbga_percentage ? cbcbga_percentage : "");
    formData.append("img", selectedFiles ? selectedFiles : "");

    formData.append("company_id", 1);

    // formData.append("key2", "value2");
    // Add more key-value pairs if necessary

    // Make the API call with the form data
    console.log(formData, "------------rrrrrrrrrrrrrrr");
    makeAPICall(formData);
  };

  // const [formDataD, setFormDataD] = useState({
  //   provider_product_category: [],
  //   provider_product_species: [],
  //   provider_product_method: [], // Handle file upload separately
  // });

  
  

// category api here
  const [providers, setProviders] = useState([]);
  const [provider_product_category, setProvider_product_category] = useState();

  useEffect(() => {
    
    const items = JSON.parse(localStorage.getItem("token"));
    // Fetch data from the API
    axios
      .get("https://medical.studiomyraa.com/api/product_category",{   headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${items}`,
      },})
      .then((response) => {
        console.log(response.data.data,'add products')
        setProviders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setProvider_product_category(event.target.value);
  };


  // species api here
  const [providersp, setProvidersp] = useState([]);
  const [provider_product_species, setProvider_product_species] = useState();

  useEffect(() => {
    
    const items = JSON.parse(localStorage.getItem("token"));
    // Fetch data from the API
    axios
      .get("https://medical.studiomyraa.com/api/product_category",{   headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${items}`,
      },})
      .then((response) => {
        console.log(response.data.data,'add products')
        setProvidersp(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, []);


  const handleSpeciesOfUseChange = (event) => {
    setProvider_product_species(event.target.value);
  };


    // species api here
    const [providerspm, setProviderspm] = useState([]);   
    const [provider_product_method, setProvider_product_method] = useState();
  
    useEffect(() => {
      
      const items = JSON.parse(localStorage.getItem("token"));
      // Fetch data from the API
      axios
        .get("https://medical.studiomyraa.com/api/use_of_method",{   headers: {
          Accept: "application/json",
          Authorization: ` Bearer ${items}`,
        },})
        .then((response) => {
          console.log(response.data.data,'add products')
          setProviderspm(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching providers:", error);
        });
    }, []);
  const handleMethodOfUseChange = (event) => {
    setProvider_product_method(event.target.value);
  };



  const [productType, setProductType] = useState(null);

  const [productName, setProductName] = useState("");

  const ProductChange = (e) => {
    e.preventDefault();
    setProductName(e.target.value);
  };

  const [provider_product_name_brand, setProvider_product_name_brand] =
    useState("");

  const ProductBrandChange = (e) => {
    e.preventDefault();
    setProvider_product_name_brand(e.target.value);
  };

  const [productStrain, setProductStrain] = useState();

  const ProductStrainChange = (e) => {
    e.preventDefault();
    setProductStrain(e.target.value);
  };

  const [productAmount, setProductAmount] = useState();

  const productAmountChange = (e) => {
    e.preventDefault();
    setProductAmount(e.target.value);
  };

  const [salesAmount, setSalesAmount] = useState();

  const salesAmountChange = (e) => {
    e.preventDefault();
    setSalesAmount(e.target.value);
  };

  const [thc, setThc] = useState();

  const thcChange = (e) => {
    e.preventDefault();
    setThc(e.target.value);
  };

  const [cbd, setCbd] = useState();

  const cbdChange = (e) => {
    e.preventDefault();
    setCbd(e.target.value);
  };

  const [cbn_percentage, setCbn_percentage] = useState();

  const cbn_percentageChange = (e) => {
    setCbn_percentage(e.target.value);
  };

  const [units_per_product, setUnits_per_product] = useState();

  const units_per_productChange = (e) => {
    setUnits_per_product(e.target.value);
  };

  const [product_unit_type, setProduct_unit_type] = useState();

  const product_unit_typeChange = (e) => {
    setProduct_unit_type(e.target.value);
  };

  const [product_pos_id, setProduct_pos_id] = useState();

  const product_pos_idChange = (e) => {
    setProduct_pos_id(e.target.value);
  };

  const [inventory_remaining, setInventory_remaining] = useState();

  const inventory_remainingChange = (e) => {
    setInventory_remaining(e.target.value);
  };

  const [product_thc_percentage, setProduct_thc_percentage] = useState();

  const product_thc_percentageChange = (e) => {
    setProduct_thc_percentage(e.target.value);
  };

  const [product_cbd_percentage, setProduct_cbd_percentage] = useState();

  const product_cbd_percentageChange = (e) => {
    setProduct_cbd_percentage(e.target.value);
  };

  const [product_cbg_percentage, setProduct_cbg_percentage] = useState();

  const product_cbg_percentageChange = (e) => {
    setProduct_cbg_percentage(e.target.value);
  };

  const [cbc_percentage, setCbc_percentage] = useState();

  const cbc_percentageChange = (e) => {
    setCbc_percentage(e.target.value);
  };

  const [thca_percentage, setThca_percentage] = useState();

  const thca_percentageChange = (e) => {
    setThca_percentage(e.target.value);
  };

  const [thcva_percentage, setThcva_percentage] = useState();

  const thcva_percentageChange = (e) => {
    setThcva_percentage(e.target.value);
  };

  const [cbda_percentage, setCbda_percentage] = useState();

  const cbda_percentageChange = (e) => {
    setCbda_percentage(e.target.value);
  };

  const [cbcbga_percentage, setCbcbga_percentage] = useState();

  const cbcbga_percentageChange = (e) => {
    setCbcbga_percentage(e.target.value);
  };

  const [camphene_percentage, setcamphene_percentage] = useState();

  const camphene_percentageChange = (e) => {
    setcamphene_percentage(e.target.value);
  };

  const [caryophyllene_percentage, setCaryophyllene_percentage] = useState();

  const caryophyllene_percentageChange = (e) => {
    setCaryophyllene_percentage(e.target.value);
  };

  const [caryophyllene_oxide_percentage, setCaryophyllene_oxide_percentage] =
    useState();

  const caryophyllene_oxide_percentageChange = (e) => {
    setCaryophyllene_oxide_percentage(e.target.value);
  };

  const [fenchol_percentage, setFenchol_percentage] = useState();

  const fenchol_percentageChange = (e) => {
    setFenchol_percentage(e.target.value);
  };

  const [geraniol_percentage, setGeraniol_percentage] = useState();

  const geraniol_percentageChange = (e) => {
    setGeraniol_percentage(e.target.value);
  };

  const [alpha_humulene_percentage, setAlpha_humulene_percentage] = useState();

  const alpha_humulene_percentageChange = (e) => {
    setAlpha_humulene_percentage(e.target.value);
  };

  const [linalool_percentage, setLinalool_percentage] = useState();

  const linalool_percentageChange = (e) => {
    setLinalool_percentage(e.target.value);
  };

  const [limonene_percentage, setimonene_percentage] = useState();

  const limonene_percentageChange = (e) => {
    setimonene_percentage(e.target.value);
  };

  const [myrcene_percentage, setMyrcene_percentage] = useState();

  const myrcene_percentageChange = (e) => {
    setMyrcene_percentage(e.target.value);
  };

  const [ocimene_percentage, setOcimene_percentage] = useState();

  const ocimene_percentageChange = (e) => {
    setOcimene_percentage(e.target.value);
  };

  const [alpha_phellandrene_percentage, setAlpha_phellandrene_percentage] =
    useState();

  const alpha_phellandrene_percentageChange = (e) => {
    setAlpha_phellandrene_percentage(e.target.value);
  };

  const [alpha_pinene_percentage, setAlpha_pinene_percentage] = useState();

  const alpha_pinene_percentageChange = (e) => {
    setAlpha_pinene_percentage(e.target.value);
  };

  const [beta_pinene_percentage, setBeta_pinene_percentage] = useState();

  const beta_pinene_percentageChange = (e) => {
    setBeta_pinene_percentage(e.target.value);
  };

  const [alpha_terpinene_percentage, setAlpha_terpinene_percentage] =
    useState();

  const alpha_terpinene_percentageChange = (e) => {
    setAlpha_terpinene_percentage(e.target.value);
  };

  const [terpineol_percentage, setTerpineol_percentage] = useState();

  const terpineol_percentageChange = (e) => {
    setTerpineol_percentage(e.target.value);
  };

  const [valencene_percentage, setValencene_percentage] = useState();

  const valencene_percentageChange = (e) => {
    setValencene_percentage(e.target.value);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    // Get the selected files from the input element
    const files = event.target.files;

    // Convert the FileList to an array and store it in the component state
    setSelectedFiles(Array.from(files));
  };

  return (
    <Widget name="PatientsList">
      <Header sidePadding={true}>
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Card sx={{ cursor: "pointer" }} onClick={OpenSimple}>
                  <CardContent>
                    <Typography variant="h4">
                      <i className="fa fa-cube" /> Simple Product
                    </Typography>
                    <Typography variant="body1">
                      A simple product is a single item product which has no
                      variations or other prices.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ cursor: "pointer" }} onClick={OpenSimplevariable}>
                  <CardContent>
                    <Typography variant="h4">
                      <i className="fa fa-cubes" /> Variable Product
                    </Typography>
                    <Typography variant="body1">
                      A variable product has different dosages or price points
                      based on variations of the base product.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Header>
      <WidgetBody style={{ padding: 18 }} elRef={contentRef}>
        <Card>
          {simple && (
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel
                      id="provider_product_category-label"
                      //
                    >
                      Product Category &nbsp;
                    </InputLabel>

                    {/* <Select
                      labelId="provider_product_method-label"
                      id="provider_product_method_cat"
                      name="provider_product_method_cat"
                      label="Product Category"
                      //
                      // multiple
                      value={provider_product_category}
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
                    </Select> */}

                     <Select
                      labelId="provider_product_method-label"
                      id="provider_product_method_cat"
                      name="provider_product_method_cat"
                      label="Product Category"
                      //
                      // multiple
                      value={provider_product_category}
                      onChange={handleCategoryChange}
                    >
                     {providers.map((provider) => (
                      <MenuItem key={provider.id} value={provider.id}>
                        {provider.product_category}
                      </MenuItem>
                    ))}
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
                    <InputLabel
                      id="provider_product_species-label"
                      //
                    >
                      Species
                    </InputLabel>
                    <Select
                      labelId="provider_product_method-label"
                     
                      label="Species"
                     
                      value={provider_product_species}
                      onChange={handleSpeciesOfUseChange}
                    >
                      {/* <MenuItem value="1">Indica</MenuItem>
                      <MenuItem value="2">Sativa</MenuItem>
                      <MenuItem value="3">Hybrid</MenuItem>
                      <MenuItem value="4">Indica Dominant Hybrid</MenuItem>
                      <MenuItem value="5">Sativa Dominant Hybrid</MenuItem>
                      <MenuItem value="6">CBD</MenuItem>
                      <MenuItem value="7">Blended</MenuItem> */}
                        {providersp.map((providersp) => (
                      <MenuItem key={providersp.id} value={providersp.id}>
                        {providersp.unit_type}
                      </MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="provider_product_method-label">
                      Method of Use
                    </InputLabel>
                    <Select
                      labelId="provider_product_method-label"
                      id="provider_product_category"
                      name="provider_product_method_use"
                      label=" Method of Use"
                      value={provider_product_method}
                      onChange={handleMethodOfUseChange}
                    >
                      {/* <MenuItem value="1">Oral</MenuItem>
                      <MenuItem value="2">Sublingual</MenuItem>
                      <MenuItem value="3">Topical</MenuItem>
                      <MenuItem value="4">Inhale</MenuItem>
                      <MenuItem value="5">Rectal</MenuItem> */}
                       {providerspm.map((providerspm) => (
                      <MenuItem key={providerspm.id} value={providerspm.id}>
                        {providerspm.method}
                      </MenuItem>
                    ))}
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
                    />
                  </FormControl>
                </Grid>
              </Grid>
              &nbsp; &nbsp;
              <Typography variant="h6" gutterBottom>
                Product Description
              </Typography>
              &nbsp;
              <Grid container spacing={2}>
                <JoditEditor
                  ref={editor}
                  value={content}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setContent(newContent)}
                  // onChange={HandleChange}
                />
              </Grid>
              &nbsp; &nbsp;
              <Typography variant="h6" gutterBottom>
                Ingredients
              </Typography>
              &nbsp;
              <Grid container spacing={2}>
                <JoditEditor
                  ref={editor}
                  value={ingredients}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setIngredients(newContent)}
                  // onChange={HandleChange}
                />
              </Grid>
              &nbsp; &nbsp;
              <Typography variant="h6" gutterBottom>
                Cannabinoids
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="THC %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={product_thc_percentage}
                      onChange={product_thc_percentageChange}
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Beta-Caryophyllene %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={caryophyllene_percentage}
                      onChange={caryophyllene_percentageChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Caryophyllene Oxide %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={caryophyllene_oxide_percentage}
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Alpha-Humulene %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={alpha_humulene_percentage}
                      onChange={alpha_humulene_percentageChange}
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Ocimene %"
                      id="Ocimene"
                      name="Ocimene[name]"
                      value={ocimene_percentage}
                      onChange={ocimene_percentageChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Alpha-Phellandrene %"
                      id="Alpha-Phellandrene"
                      name="Alpha-Phellandrene[name]"
                      value={alpha_phellandrene_percentage}
                      onChange={alpha_phellandrene_percentageChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Alpha-Pinene %"
                      id="Alpha-Pinene"
                      name="Alpha-Pinene[name]"
                      value={alpha_pinene_percentage}
                      onChange={alpha_pinene_percentageChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Beta-Pinene %"
                      id="Beta-Pinene"
                      name="Beta-Pinene[name]"
                      value={beta_pinene_percentage}
                      onChange={beta_pinene_percentageChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Alpha-Terpinene %"
                      id="Alpha-Terpinene"
                      name="Alpha-Terpinene[name]"
                      value={alpha_terpinene_percentage}
                      onChange={alpha_terpinene_percentageChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Terpineol %"
                      id="Terpineol"
                      name="Terpineol[name]"
                      value={terpineol_percentage}
                      onChange={terpineol_percentageChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Valencene %"
                      id="Valencene"
                      name="Valencene[name]"
                      value={valencene_percentage}
                      onChange={valencene_percentageChange}
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
                  {/* <Typography variant="h5">Product Photos</Typography> */}
                  {/* <Box mt={2}>
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
                        
                          {selectedFiles.length > 0
                            ? selectedFiles.map((file) => file.name).join(", ")
                            : "Choose files"}
                        </label>
                      </div>
                    </div>
                  </Box> */}
                  {/* <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<SaveIcon />}
                    >
                      Save Changes
                    </Button>
                  </Box> */}
                  {/* <Divider mt={2} />
                  <Box mt={2} mb={4}>
                    {selectedFiles.length === 0 ? (
                      <Typography variant="body1">
                        You have no photos uploaded at this time.
                      </Typography>
                    ) : (
                      // Show the list of selected files, if any
                      <Typography variant="body1">
                        Selected Files:{" "}
                        {selectedFiles.map((file) => file.name).join(", ")}
                      </Typography>
                    )}
                  </Box> */}
                </Box>
              </Container>
              <Button
                variant="contained"
                color="primary"
                size="large"
                // endIcon={<SaveIcon />}
                onClick={handleAPICall}
              >
                Save Changes
              </Button>
            </CardContent>
          )}

          {variable && (
            <CardContent style={{ overflowY: "auto", maxHeight: "600px" }}>
              <Typography variant="h5" gutterBottom>
                Create Variable Product
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="provider_product_category-label">
                      Product Category
                    </InputLabel>
                    {/* <Select
                      labelId="provider_product_method-label"
                      id="provider_product_method_cat"
                      name="provider_product_method_cat"
                      multiple
                      value={provider_product_category}
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
                    </Select> */}
                     <Select
                      labelId="provider_product_method-label"
                      id="provider_product_method_cat"
                      name="provider_product_method_cat"
                      label="Product Category"
                      //
                      // multiple
                      value={provider_product_category}
                      onChange={handleCategoryChange}
                    >
                     {providers.map((provider) => (
                      <MenuItem key={provider.id} value={provider.id}>
                        {provider.product_category}
                      </MenuItem>
                    ))}
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
                    <InputLabel id="provider_product_species-label">
                      Species
                    </InputLabel>
                    {/* <Select
                      labelId="provider_product_method-label"
                      id="provider_product_method"
                      name="provider_product_method"
                      multiple
                      value={provider_product_species}
                      onChange={handleSpeciesOfUseChange}
                    >
                      <MenuItem value="1">Indica</MenuItem>
                      <MenuItem value="2">Sativa</MenuItem>
                      <MenuItem value="3">Hybrid</MenuItem>
                      <MenuItem value="4">Indica Dominant Hybrid</MenuItem>
                      <MenuItem value="5">Sativa Dominant Hybrid</MenuItem>
                      <MenuItem value="6">CBD</MenuItem>
                      <MenuItem value="7">Blended</MenuItem>
                    </Select> */}
                      <Select
                      labelId="provider_product_method-label"
                     
                      label="Species"
                     
                      value={provider_product_species}
                      onChange={handleSpeciesOfUseChange}
                    >
                      {/* <MenuItem value="1">Indica</MenuItem>
                      <MenuItem value="2">Sativa</MenuItem>
                      <MenuItem value="3">Hybrid</MenuItem>
                      <MenuItem value="4">Indica Dominant Hybrid</MenuItem>
                      <MenuItem value="5">Sativa Dominant Hybrid</MenuItem>
                      <MenuItem value="6">CBD</MenuItem>
                      <MenuItem value="7">Blended</MenuItem> */}
                        {providersp.map((providersp) => (
                      <MenuItem key={providersp.id} value={providersp.id}>
                        {providersp.unit_type}
                      </MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="provider_product_method-label">
                      Method of Use
                    </InputLabel>
                    {/* <Select
                      labelId="provider_product_method-label"
                      id="provider_product_category"
                      name="provider_product_method_use"
                      value={provider_product_method}
                      onChange={handleMethodOfUseChange}
                    >
                      <MenuItem value="1">Oral</MenuItem>
                      <MenuItem value="2">Sublingual</MenuItem>
                      <MenuItem value="3">Topical</MenuItem>
                      <MenuItem value="4">Inhale</MenuItem>
                      <MenuItem value="5">Rectal</MenuItem>
                    </Select> */}
                    <Select
                      labelId="provider_product_method-label"
                      id="provider_product_category"
                      name="provider_product_method_use"
                      label=" Method of Use"
                      value={provider_product_method}
                      onChange={handleMethodOfUseChange}
                    >
                      {/* <MenuItem value="1">Oral</MenuItem>
                      <MenuItem value="2">Sublingual</MenuItem>
                      <MenuItem value="3">Topical</MenuItem>
                      <MenuItem value="4">Inhale</MenuItem>
                      <MenuItem value="5">Rectal</MenuItem> */}
                       {providerspm.map((providerspm) => (
                      <MenuItem key={providerspm.id} value={providerspm.id}>
                        {providerspm.method}
                      </MenuItem>
                    ))}
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
                    />
                  </FormControl>
                </Grid>
              </Grid>
              &nbsp; &nbsp;
              <Typography variant="h6" gutterBottom>
                Product Description
              </Typography>
              &nbsp;
              <Grid container spacing={2}>
                <JoditEditor
                  ref={editor}
                  value={content}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setContent(newContent)}
                  // onChange={HandleChange}
                />
              </Grid>
              &nbsp; &nbsp;
              <Typography variant="h6" gutterBottom>
                Ingredients
              </Typography>
              &nbsp;
              <Grid container spacing={2}>
                <JoditEditor
                  ref={editor}
                  value={ingredients}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setIngredients(newContent)}
                  // onChange={HandleChange}
                />
              </Grid>
              &nbsp; &nbsp;
              <Typography variant="h6" gutterBottom>
                Cannabinoids
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="THC %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={product_thc_percentage}
                      onChange={product_thc_percentageChange}
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Beta-Caryophyllene %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={caryophyllene_percentage}
                      onChange={caryophyllene_percentageChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Caryophyllene Oxide %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={caryophyllene_oxide_percentage}
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Alpha-Humulene %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={alpha_humulene_percentage}
                      onChange={alpha_humulene_percentageChange}
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
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Alpha-Phellandrene %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={alpha_phellandrene_percentage}
                      onChange={alpha_phellandrene_percentageChange}
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Alpha-Terpinene %"
                      id="provider_product_name"
                      name="provider_product[name]"
                      value={alpha_terpinene_percentage}
                      onChange={alpha_terpinene_percentageChange}
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
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="Valencene %"
                      value={valencene_percentage}
                      onChange={valencene_percentageChange}
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
              <Button
                variant="contained"
                color="primary"
                size="large"
                // endIcon={<SaveIcon />}
                onClick={handleAPICall}
              >
                Save Changes
              </Button>
            </CardContent>
          )}
        </Card>
      </WidgetBody>
    </Widget>
  );
};

export default Findorder;
