// styled components
import { SettingsHeader } from "@widgets/UserSettings/style";
import { Divider } from "@components/Widget/style";

// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import { Tab } from "react-bootstrap";
import TabNav from "@ui/TabNav";
import TabNavItem from "@ui/TabNav/TabNavItem";
import Form from "./Form";
import Profile from "./Form/Profile";
import SecurityChange from './Form/SecurityChange'
const UserSettings = () => {
  return (
    <Widget name="UserSettings">
      <Tab.Container defaultActiveKey="patient" transition={true}>
        <SettingsHeader>
          <div className="wrapper">
            <h2 className="title">Your account</h2>
            <TabNav>
              <TabNavItem eventKey="patient" title="Profile" />
              <TabNavItem eventKey="auth" title="auth" />
              {/* <TabNavItem eventKey="doctorsada" title="notification" /> */}
            </TabNav>
          </div>
          <Divider />
        </SettingsHeader>
        <WidgetBody>
          <Tab.Content>
            <Tab.Pane eventKey="patient">
              <Profile />
            </Tab.Pane>
            <Tab.Pane eventKey="auth">
              {/* <Form type="doctor" /> */}
              <SecurityChange/>
            </Tab.Pane>
          </Tab.Content>
        </WidgetBody>
      </Tab.Container>
    </Widget>
  );
};

export default UserSettings;
