// styled components
import { List, Header } from "@widgets/PatientsTests/style";
import axios from "axios";
import DatePicker from "react-datepicker";
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

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

import Box from "@mui/material/Box";
// utils
import { testsOptions } from "@constants/options";

// hooks
import { useEffect, useRef, useState } from "react";

// data placeholder
import { patient_tests } from "@db/patient_tests";

// bootstrap

import Page from "@layout/Page";

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

const Reportset = () => {
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

  console.log(products, "patientData");

  const handleAPICall = async (event) => {
    event.preventDefault();
    setHide(true)
    const formData = new FormData();
    formData.append(
      "start_date",
      selectedDate1.toLocaleDateString("en-GB")
        ? selectedDate1.toLocaleDateString("en-GB")
        : ""
    );
    formData.append(
      "end_date",
      selectedDate2.toLocaleDateString("en-GB")
        ? selectedDate2.toLocaleDateString("en-GB")
        : ""
    );
    formData.append("user", selectedProvider ? selectedProvider : "");
    formData.append("event_name", eventName ? eventName : "");

    const items = JSON.parse(localStorage.getItem("token"));
    axios
      .post("https://medical.studiomyraa.com/api/activity_report", formData, {
        headers: {
          Accept: "application/json",
          Authorization: ` Bearer ${items}`,
        },
      })
      .then((response) => {
        if (response.data.data && Array.isArray(response.data.data)) {
          // Update the products state with the fetched data
          setProductData(response.data.data);
        } else {
          console.error("Invalid API response format:", response.data);
          setProductData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [name, setName] = useState();
  const Changename = (e) => {
    setName(e.target.value);
  };

  // const [dateState, setDateState] = useState(new Date());

  // console.log(dateState, "dateState.....");
  // const changeDate = (e) => {
  //   setDateState(e);
  // };

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setIsCalendarOpen(false); // Close the calendar after selecting a date
  // };

  // const handleInputClick = () => {
  //   setIsCalendarOpen(true);
  // };

  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [isCalendarOpen1, setIsCalendarOpen1] = useState(false);
  const [isCalendarOpen2, setIsCalendarOpen2] = useState(false);

  console.log(selectedDate1, "selectedDate1");
  console.log(selectedDate2, "selectedDate2");
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
    setIsCalendarOpen1(false);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    setIsCalendarOpen2(false);
  };

  const handleInputClick1 = () => {
    setIsCalendarOpen1(!isCalendarOpen1);
  };

  const handleInputClick2 = () => {
    setIsCalendarOpen2(!isCalendarOpen2);
  };

  // dropdown API integrated
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");

  useEffect(() => {
    
    const items = JSON.parse(localStorage.getItem("token"));
    // Fetch data from the API
    axios
      .get("https://medical.studiomyraa.com/api/provider_list",{   headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${items}`,
      },})
      .then((response) => {
        console.log(response,'resppppppppppppp')
        setProviders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, []);

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };


  const [eventName,setEventName] = useState()
  
  const ChangeeventName =(event) =>{
  
   console.log(event.target.value,' name for ')
    setEventName(event.target.value)
  }

  const [hide, setHide] = useState(false)
  return (
    <Page title="Activity Report">
      <Widget name="PatientsTests">
        <WidgetBody style={{ padding: 18 }} elRef={contentRef}>
          {/* {filteredTests.length !== 0 ? drawTests() : <NoDataPlaceholder/>} */}

          <form name="patient_search" method="get">
            <Grid container spacing={2}>
              {/* <>
                <Calendar value={dateState} onChange={changeDate} />
                <p>
                  Current selected date is{" "}
                  <b>{moment(dateState).format("MMMM Do YYYY")}</b>
                </p>
              </> */}

              <Grid item xs={12} md={3}>
                <div>
                  <TextField
                    type="text"
                    label="Start date"
                    id="patient_search_firstName"
                    name="patient_search[firstName]"
                    variant="outlined"
                    fullWidth
                    value={selectedDate1.toLocaleDateString("en-GB")}
                    onClick={handleInputClick1}
                  />
                  {isCalendarOpen1 && (
                    <Calendar
                      onChange={handleDateChange1}
                      value={selectedDate1}
                      onClickDay={() => setIsCalendarOpen1(false)}
                    />
                  )}
                </div>
              </Grid>

              <Grid item xs={12} md={3}>
                <div>
                  <TextField
                    type="text"
                    label="End date"
                    id="patient_searc"
                    name="patient_search[firstName]"
                    variant="outlined"
                    fullWidth
                    value={selectedDate2.toLocaleDateString("en-GB")}
                    onClick={handleInputClick2}
                  />
                  {isCalendarOpen2 && (
                    <Calendar
                      onChange={handleDateChange2}
                      value={selectedDate2}
                      onClickDay={() => setIsCalendarOpen2(false)}
                    />
                  )}
                </div>
              </Grid>
              {/* working here  */}
              {/* <Grid item xs={12} md={3}>
                <div>
                  <TextField
                    label="End date"
                    id="patient_search_firstName"
                    name="patient_search[firstName]"
                    variant="outlined"
                    value={selectedDate.toLocaleDateString("en-GB")} // Format the date as dd/mm/yyyy
                    onClick={handleInputClick}
                    fullWidth
                  />
                  {isCalendarOpen && (
                    <Calendar
                      value={selectedDate}
                      onChange={handleDateChange}
                      onClickOutside={() => setIsCalendarOpen(false)} // Close the calendar on outside click
                    />
                  )}
                </div>
              </Grid> */}

              <Grid item xs={12} md={3}>
                {/* <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="patient_search_gender">
                    User
                  </InputLabel>
                  <Select
                    label="Gender"
                    id="patient_search_gender"
                    name="patient_search[gender]"
                    defaultValue=""
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="1">demo provider</MenuItem>
                    <MenuItem value="2">body basic</MenuItem>
                    <MenuItem value="3">testing </MenuItem>
                  </Select>
                </FormControl> */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="provider_select">Provider</InputLabel>
                  <Select
                    label="Provider"
                    id="provider_select"
                    value={selectedProvider}
                    onChange={handleProviderChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {providers.map((provider) => (
                      <MenuItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="patient_search_gender">
                    Event Name
                  </InputLabel>
                  <Select
                    label="Gender"
                    id="patient_search_gender"
                    name="Event_name"
                    value={eventName}
                    onChange={ChangeeventName}
                  
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="inserted">Created</MenuItem>
                    <MenuItem value="Updated">Updated</MenuItem>
                    <MenuItem value="deleted">deleted</MenuItem>
                  </Select>
                </FormControl>
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
       { hide &&  <Table sx={{ minWidth: 650 }} className="table table-bordered">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={false} direction="asc">
                  Created
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={false} direction="asc">
                  Employee
                </TableSortLabel>
              </TableCell>
              {/* <TableCell>First Name</TableCell> */}
              <TableCell>
                <TableSortLabel active={false} direction="asc">
                  Event
                </TableSortLabel>
              </TableCell>

              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {moment(product.created_at).format("MM/DD/YYYY h:mm A")}
                </TableCell>
                <TableCell>{product.name ? product.name : ""}</TableCell>
                <TableCell>{product.event ? product.event : "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </Widget>
    </Page>
  );
};

export default Reportset;
