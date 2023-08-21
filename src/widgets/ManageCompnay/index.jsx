// styled components
import {SettingsHeader} from '@widgets/ManageCompnay/style';
import {Divider} from '@components/Widget/style';

// components
import Widget from '@components/Widget';
import WidgetBody from '@components/Widget/WidgetBody';
import {Tab} from 'react-bootstrap'
import TabNav from '@ui/TabNav';
import TabNavItem from '@ui/TabNav/TabNavItem';
import Form from './Form';
import CompanyUsers from './Form/CompanyUsers'
import CompanyInfo from './Form/CompanyInfo';
import Appoiment from './Form/Appoiment';
import ShopMyCompany from './Form/ShopMyCompany';
import CouponDiscount from './Form/CouponDiscount'
import ThankYou from './Form/ThankYou';
import Sms from './Form/Sms';
import Thanks from './Form/Thanks'
import Tigger from './Form/Tigger';
const UserSettingsC = () => {
    return (
        <Widget name="UserSettings">
            <Tab.Container defaultActiveKey="patient" transition={true}>
                <SettingsHeader>
                    <div className="wrapper">
                   
                        <TabNav>
                            <TabNavItem eventKey="Information" title="Information" />
                            <TabNavItem eventKey="Users" title="Users" />
                            {/* <TabNavItem eventKey="Appoint" title="Appointment" /> */}
                            <TabNavItem eventKey="Shop" title="Shop" />
                            
                            <TabNavItem eventKey="CandD" title=" Coupons" />
                            <TabNavItem eventKey="Thank" title=" Thanks" />
                            <TabNavItem eventKey="Email" title="Email" />
                            <TabNavItem eventKey="Sms" title="Sms" />
                            <TabNavItem eventKey="tigger" title="Tigger" />
                         
                        </TabNav>
                    </div>
                    <Divider />
                </SettingsHeader>
                <WidgetBody>
                    <Tab.Content>
                        <Tab.Pane eventKey="Information">
                            {/* <Form type="patient" /> */}
                            <CompanyInfo/>
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey="Users">
                            <CompanyUsers/>
                            {/* <Form type="doctor" /> */}
                        </Tab.Pane>

                        <Tab.Pane eventKey="Appoint">
                            {/* <Form type="patient" /> */}
                           <Appoiment/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="Shop">
                           
                           <ShopMyCompany/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="Thank">
                           
                           <Thanks/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="CandD">
                           
                           <CouponDiscount/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Email">
                           
                           <ThankYou/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="Sms">
                           
                           <Sms/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="tigger">
                           
                           <Tigger/>
                        </Tab.Pane>
                    </Tab.Content>
                </WidgetBody>
            </Tab.Container>
        </Widget>
    )
}

export default UserSettingsC;