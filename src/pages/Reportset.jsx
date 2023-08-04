// components
import Page from "@layout/Page";
import NextPatient from "@widgets/NextPatient";
import LaboratoryTests from "@widgets/LaboratoryTests";
import UpcomingAppointments from "@widgets/UpcomingAppointments";
import DoctorOverallAppointment from "@widgets/DoctorOverallAppointment";
import PatientsPace from "@widgets/PatientsPace";
import RecentQuestions from "@widgets/RecentQuestions";
import ConfirmedDiagnoses from "@widgets/ConfirmedDiagnoses";
import EventsCompactCalendar from "@widgets/EventsCompactCalendar";
import DailyAppointmentChart from "@widgets/DailyAppointmentChart";
import {
  Box,
  Container,
  Grid,
  Breadcrumbs,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
const Reportset = () => {
  return (
    <Page title="Reports">
      <Container>
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            ></Box>
            <Typography variant="h4" component="h3" mt={2}>
              Activity Report
            </Typography>
            <Typography variant="body1" mt={1}>
              View a list of all activity by employees of your company.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            {/* <Typography variant="h3" component="h5" mt={2}>
              Activity Report
            </Typography> */}
            <form name="form" method="get">
            
              <Box mt={2} display="flex" alignItems="center">
                
                <Box mr={4}>
                  <Grid item xs={12} md={6}>
                    <fieldset>
                      <legend>Start Date</legend>

                      <Select
                        id="form_start_month"
                        name="form[start][month]"
                        value="6"
                        variant="outlined"
                      >
                        <MenuItem value="1">Jan</MenuItem>
                        <MenuItem value="2">Feb</MenuItem>
                        <MenuItem value="3">Mar</MenuItem>
                        <MenuItem value="4">Apr</MenuItem>
                        <MenuItem value="5">May</MenuItem>
                        <MenuItem value="6">Jun</MenuItem>
                        <MenuItem value="7">Jul</MenuItem>
                        <MenuItem value="8">Aug</MenuItem>
                        <MenuItem value="9">Sep</MenuItem>
                        <MenuItem value="10">Oct</MenuItem>
                        <MenuItem value="11">Nov</MenuItem>
                        <MenuItem value="12">Dec</MenuItem>
                      </Select>
                      <Select
                        id="form_start_day"
                        name="form[start][day]"
                        value="21"
                        variant="outlined"
                       style={{width:'50px'}}
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                      </Select>
                      <Select
                        id="form_start_year"
                        name="form[start][year]"
                        value="2023"
                        variant="outlined"
                      >
                        <MenuItem value="1">2021</MenuItem>
                        <MenuItem value="2">2022</MenuItem>
                        <MenuItem value="3">2023</MenuItem>
                        <MenuItem value="4">2024</MenuItem>
                        <MenuItem value="5">2025</MenuItem>
                        <MenuItem value="6">2026</MenuItem>
                        <MenuItem value="7">2027</MenuItem>
                        <MenuItem value="8">2028</MenuItem>
                        <MenuItem value="9">2029</MenuItem>
                        <MenuItem value="10">2030</MenuItem>
                        <MenuItem value="11">2031</MenuItem>
                     
                      </Select>
                    </fieldset>
                  </Grid>
                </Box>
                
                <Box mr={4}>
                  <fieldset>
                    <legend>Stop Date</legend>
                    <Select
                      id="form_stop_month"
                      name="form[stop][month]"
                      value="7"
                      variant="outlined"
                    >
                      {/* Options for months */}
                    </Select>
                    <Select
                      id="form_stop_day"
                      name="form[stop][day]"
                      value="21"
                      variant="outlined"
                    >
                      {/* Options for days */}
                    </Select>
                    <Select
                      id="form_stop_year"
                      name="form[stop][year]"
                      value="2023"
                      variant="outlined"
                    >
                      {/* Options for years */}
                    </Select>
                  </fieldset>
                </Box>



                <Box mr={4}>

                  <div className="form-group">
                  <legend>User</legend>
                    {/* <label htmlFor="form_providerUser">User</label> */}
                    <Select
                      id="form_providerUser"
                      name="form[providerUser]"
                      value=""
                      variant="outlined"
                      style={{width:'90px'}}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="1">Demo Provider</MenuItem>
                      <MenuItem value="2">boby baislA</MenuItem>
                    </Select>
                  </div>
                </Box>

                <Box mr={4}>
                  <div className="form-group">
                  <legend>Event Name</legend>
                    {/* <label htmlFor="form_event">Event Name</label> */}
                    <Select
                      id="form_event"
                      name="form[event]"
                      value=""
                      variant="outlined"
                      style={{width:'90px'}}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="provider.email_template.created">
                        provider.email_template.created
                      </MenuItem>
                      <MenuItem value="provider.email_template.deleted">
                        provider.email_template.deleted
                      </MenuItem>
                      <MenuItem value="provider.email_template.modified">
                        provider.email_template.modified
                      </MenuItem>
                      <MenuItem value="provider.employee.created">
                        provider.employee.created
                      </MenuItem>
                    </Select>
                  </div>
                </Box>
              </Box>
              <br/>
              <Button
                type="submit"
                variant="contained"
                color="success"
               
              >
                Filter Results
              </Button>
              <input
                type="hidden"
                id="form__token"
                name="form[_token]"
                value="OLI7iix-ahp_FAh67hLy6ku3NuGIx1_Qc75F2cZdfoY"
              />
            </form>

            {/* <Typography variant="body1">4 total records found</Typography> */}

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <a
                      href="/providers/dashboard/reports/activity?sort=ph.created&direction=asc&page=1"
                      title="Date"
                    >
                      Date
                    </a>
                    <i className="fa fa-sort"></i>
                  </TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>
                    <a
                      href="/providers/dashboard/reports/activity?sort=ph.event&direction=asc&page=1"
                      title="Event"
                    >
                      Event
                    </a>
                    <i className="fa fa-sort"></i>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>07/18/2023 2:35AM</TableCell>
                  <TableCell>boby baislA</TableCell>
                  <TableCell>
                    <i className="fa fa-info-circle"></i>{" "}
                    provider.email_template.deleted
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>07/18/2023 2:35AM</TableCell>
                  <TableCell>boby baislA</TableCell>
                  <TableCell>
                    <i className="fa fa-info-circle"></i>{" "}
                    provider.email_template.modified
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>07/18/2023 2:35AM</TableCell>
                  <TableCell>boby baislA</TableCell>
                  <TableCell>
                    <i className="fa fa-info-circle"></i>{" "}
                    provider.email_template.created
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>07/18/2023 2:27AM</TableCell>
                  <TableCell>Demo Provider</TableCell>
                  <TableCell>
                    <i className="fa fa-info-circle"></i>{" "}
                    provider.employee.created
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default Reportset;
