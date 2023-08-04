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

const DashboardA = () => {


  // to dynamic 
  localStorage.setItem('token', JSON.stringify('4011|VQIHsdWVxa2iZfBKVHi8cvGoxji63owHP5LGBKKY'));
  return (
    <Page title="Provider Dashboard">
      {/* <div key="next-patient">
                <NextPatient/>
            </div> */}

      <div key="doctor-overall-appointment">
        <DoctorOverallAppointment />
      </div>
      <div key="events-compact">
        <EventsCompactCalendar />
      </div>
      <div key="laboratory-tests">
        <LaboratoryTests />
      </div>
      <div key="daily-app-chart">
        <DailyAppointmentChart />
      </div>
      <div key="doctor-upcoming-appointments">
        <UpcomingAppointments />
      </div>

      {/* <div key="patients-pace">
                <PatientsPace/>
            </div> */}
      {/* <div key="recent-questions">
        <RecentQuestions />
      </div> */}
      {/* <div key="confirmed-diagnoses">
                <ConfirmedDiagnoses nav="tabs"/>
            </div> */}
    </Page>
  );
};

export default DashboardA;
