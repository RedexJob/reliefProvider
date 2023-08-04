// components
import Page from '@layout/Page';
// import DoctorsList from '@widgets/DoctorsList';
import OrderView from  '@widgets/DoctorsList/Orderview'
const StaffList = () => {
    return (
        <Page title="Orders view">
            {/* <DoctorsList variant="staff" /> */}
            <OrderView variant="order view"/>
        </Page>
    )
}

export default StaffList;