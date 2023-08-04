// styled components
import { List, Header } from "@widgets/PatientsTests/style";
import axios from "axios";
// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import CustomSelect from "@ui/Select";
import MonthNavigator from "@ui/Navigator/MonthNavigator";
import SearchBar from "@ui/SearchBar";
import TestItem from "@components/TestItem";
import GroupSeparator from "@ui/GroupSeparator";
import NoDataPlaceholder from "@components/NoDataPlaceholder";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

import Box from "@mui/material/Box";
// utils
import { testsOptions } from "@constants/options";


// hooks
import { useEffect, useRef, useState } from "react";

// data placeholder
import { patient_tests } from "@db/patient_tests";

// bootstrap

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import moment from 'moment'
const DoctorsList = () => {
  const contentRef = useRef(null);
  const currentMonth = new Date().getMonth();
  const [category, setCategory] = useState(testsOptions[0]);
  const [month, setMonth] = useState({
    label: "This month",
    number: currentMonth,
  });
  const [search, setSearch] = useState("");
  const uniqueDates = [
    ...new Set(
      patient_tests.map((item) => moment(item.date).format("DD MMM YYYY"))
    ),
  ];

  const filteredTests = patient_tests.filter((test) => {
    const testDate = new Date(test.date);
    const testMonth = testDate.getMonth();
    const testName = test.title.toLowerCase();
    const testCategory = test.type.toLowerCase();
    const doctorName = test.doctor.toLowerCase();
    const queryMatch =
      testName.includes(search.toLowerCase()) ||
      doctorName.includes(search.toLowerCase());
    const categoryMatch =
      category.value === "all" || testCategory === category.value;

    return testMonth === month.number && queryMatch && categoryMatch;
  });

  const drawTests = () => {
    return uniqueDates.map((date) => {
      const tests = filteredTests.filter(
        (test) => moment(test.date).format("DD MMM YYYY") === date
      );
      const isToday = moment(date).isSame(new Date(), "day");

      return (
        tests.length !== 0 &&
        new Date(date).getMonth() === month.number && (
          <div key={date}>
            <GroupSeparator text={isToday ? "Today's visit" : date} />
            <List>
              {tests.map((test) => (
                <TestItem
                  key={`${test.id}-${search}-${category.value}`}
                  data={test}
                />
              ))}
            </List>
          </div>
        )
      );
    });
  };

  useEffect(() => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [month, search]);


  const [products, setProductData] = useState([]);

console.log(products,'patientData')


  
const token = "3691|dVlgSacqhxeyluycbpjRwulO1cETYyxZXwlxF5Au";



const handleAPICall = async (event) => {

  event.preventDefault();

  const formData = new FormData();
  formData.append("first_name", name ? name : '');
  formData.append("email", email ? email :'');
  formData.append("order_id", phone ? phone : '');
  // formData.append("mname",mname ? mname :'' );
  formData.append("last_name", lname ? lname : '');
  //formData.append("dob", dob);
  formData.append("status", status ? status :'');
  formData.append("total_amount", regis_id ? regis_id :'');

   axios.post(
      "https://medical.studiomyraa.com/api/find_order",
      formData,
      { headers: { "Accept": "application/json", Authorization: ` Bearer ${token}` }
    })
    .then((response) =>{

      
      if (response.data.data && Array.isArray(response.data.data)) {
        // Update the products state with the fetched data
        setProductData(response.data.data);
      } else {
        console.error("Invalid API response format:", response.data);
        setProductData([]);
      }

  
    
    })
    .catch( (error) =>{
      console.error(error)
    })


};





const [name, setName] = useState();
const  Changename = (e) => {
  setName(e.target.value);
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

const [lname, setLname] = useState();
const  ChangeLastname = (e) => {
    setLname(e.target.value);
};

// const [mname, setMname] = useState();
// const  Changemname = (e) => {
//   setMname(e.target.value);
// };


const [dob, setDob] = useState('25/09/1999');
const  Changedob = (e) => {
  setDob(e.target.value);
};

const [status, setStatus] = useState();
const  Changegender = (e) => {
  setStatus(e.target.value);
};

const [regis_id, setRegis_id] = useState();
const  Changeregister = (e) => {
  setRegis_id(e.target.value);
};
  return (
    <Widget name="PatientsTests">
      <Header style={{ padding: 18 }}>
      
        {/* <div className="wrapper">
          <CustomSelect
            options={testsOptions}
            variant="minimal"
            value={category}
            changeHandler={(e) => setCategory(e)}
          />
          <MonthNavigator state={month} handler={setMonth} loop={false} />
        </div> */}
        <SearchBar
          placeholder="Search patient details"
          handler={setSearch}
          value={search}
        />
      </Header>
      <WidgetBody style={{ padding: 18 }} elRef={contentRef}>
        {/* {filteredTests.length !== 0 ? drawTests() : <NoDataPlaceholder/>} */}

        <form name="patient_search" method="get">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="First Name"
                id="patient_search_firstName"
                name="patient_search[firstName]"
                variant="outlined"
                value={name}
                onChange={Changename}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Last Name"
                id="patient_search_lastName"
                name="patient_search[lastName]"
                variant="outlined"
                value={lname}
                onChange={ChangeLastname}
                fullWidth
              />
            </Grid>

            {/* <Grid item xs={12} md={4}>
              <TextField
                label="Middle Name"
                id="patient_search_provincialHealthcareNumber"
                name="patient_search[provincialHealthcareNumber]"
                variant="outlined"
                onChange={Changemname}
                value={mname}
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Email Address"
                id="patient_search_email"
                name="patient_search[email]"
                variant="outlined"
                value={email}
                onChange={ChangeEmail}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Order ID"
                type="number"
                id="patient_search_phone"
                name="patient_search[phone]"
                variant="outlined"
                onChange={ChangePhone}
                value={phone}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="patient_search_gender">status</InputLabel>
                <Select
                  label="Gender"
                  id="patient_search_gender"
                  name="patient_search[gender]"
                  defaultValue=""
                  value={status}
                  onChange={Changegender}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="New orders">New orders</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending_payment">Pending payment</MenuItem>
                  <MenuItem value="eligible">Not yet eligible</MenuItem>
                  <MenuItem value="pickUp"> Ready to pickUp</MenuItem>
                </Select>
              </FormControl>
            </Grid>
         
            <Grid item xs={12} md={4}>
              <TextField
                label="Total amount"
                type="number"
                id="patient_search_provincialHealthcareNumber"
                name="patient_search[provincialHealthcareNumber]"
                variant="outlined"
                onChange={Changeregister}
                value={regis_id}
                fullWidth
              />
            </Grid>
           
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAPICall}
                endIcon={<i className="fa fa-search" />}
              >
                Find Patients
              </Button>
            </Grid>
          </Grid>
        </form>
      </WidgetBody>
      <Table sx={{ minWidth: 650 }} className="table table-bordered">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 150, maxWidth: "25%" }}>
                    <TableSortLabel active={false} direction="asc">
                      Patient ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Patient
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                     Created
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                     Last Update
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                     Status
                    </TableSortLabel>
                  </TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell>{product.first_name} {product.last_name}</TableCell>
                    <TableCell>
                     {product.total_amount}
                    </TableCell>
                    <TableCell>
                    {moment(product.created_at).format("MM/DD/YYYY h:mm A")}
                    </TableCell>
                    <TableCell>{moment(product.updated_at).format("MM/DD/YYYY h:mm A")}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    {/* <TableCell>
                      <Button variant="contained" color="success">
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "5px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        style={{ color: "red", marginLeft: "5px" }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
    </Widget>
  );
};

export default DoctorsList;
