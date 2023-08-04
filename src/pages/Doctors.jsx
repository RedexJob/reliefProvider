// components
import Page from '@layout/Page';
import DoctorsList from '@widgets/DoctorsList';

const Doctors = () => {
    return (
        <Page title="Find Orders">
            <DoctorsList variant="doctor"/>
            
        </Page>
    )
}

export default Doctors;