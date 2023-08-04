import React from "react";
import Page from "@layout/Page";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";
import Balance from "@widgets/Balance";

import UserSettings from '@widgets/UserSettings';
export default function Myaccount() {
  return (
    <Page title="My Account">
    <UserSettings/>
    </Page>
  );
}
