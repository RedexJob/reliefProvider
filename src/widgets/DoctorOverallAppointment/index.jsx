// styling
import styled from "styled-components/macro";
import { colors } from "@styles/vars";

// components
import Widget from "@components/Widget";
import WidgetNav from "@components/Widget/WidgetNav";
import WidgetBody from "@components/Widget/WidgetBody";
import LabeledProgress from "@ui/LabeledProgress";
import ScrollContainer from "react-indiana-drag-scroll";
import BoltIcon from '@mui/icons-material/Bolt';
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// hooks
import useArrayNav from "@hooks/useArrayNav";
import { useRef, useEffect } from "react";
import { useTheme } from "styled-components";
import { useState } from "react";
import axios from "axios";

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  overflow-x: scroll;
  padding: 0 24px;
  user-select: none;
`;

const DoctorOverallAppointment = () => {
  const { theme } = useTheme();
  const listRef = useRef(null);

  const drawLabels = () => {
    const labels = [];
    for (let i = 0; i < data[index].length; i++) {
      labels.push(`${8 + i}:00`);
    }
    return labels;
  };

  const data = [
    [37, 12, 58, 20, 0, 10, 15, 44, 19, 68, 50],
    [20, 55, 44, 31, 75, 0, 0, 59, 84, 20, 10],
    [80, 50, 30, 60, 40, 20, 50, 65, 85, 0, 40],
  ];

  const { index, navigate } = useArrayNav(data);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, 0);
    }
  }, [index]);

  const [provider, setProviders] = useState("");

  useEffect(() => {
    
    const items = JSON.parse(localStorage.getItem("token"));
    // Fetch data from the API
    axios
      .get("https://medical.studiomyraa.com/api/product_statics_orders/1",{   headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${items}`,
      },})
      .then((response) => {

        console.log(response.data.result,'resppppppppppppp')
        setProviders(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
      });
  }, []);

  console.log(provider,'provider')
  return (
    <Widget name="DoctorOverallAppointment" shadow={true}>
      <WidgetNav
        title="New orders today        "
        style={{ paddingBottom: 17 }}
        handler={navigate}
      />
      <WidgetBody sidePadding={true} style={{ paddingBottom: 20 }}>
        {/* <List innerRef={listRef} as={ScrollContainer} activationDistance={5} component="ul">
                    {
                        data[index].map((item, i) => {
                            return (
                                <LabeledProgress
                                    key={drawLabels()[i]}
                                    label={drawLabels()[i]}
                                    value={item}
                                    color={theme === 'light' ? colors.azure : colors.blue}/>
                            )
                        })
                    }
                </List> */}
        <div
          style={{
            position: "absolute",
            margin: "-17px",
            top: "50%",
            left: "50%",
          }}
        >
          <Badge badgeContent={provider} color="primary">
            <NotificationsActiveIcon
              color="action"
              style={{ width: "50px", height: "50px" }}
            />
          </Badge>
        </div>
      </WidgetBody>
    </Widget>
  );
};

export default DoctorOverallAppointment;
