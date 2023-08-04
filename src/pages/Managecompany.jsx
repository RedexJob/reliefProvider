import React, { useState } from "react";
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
import Avatar from '@mui/material/Avatar';
import ImageIcon from "@mui/icons-material/Image";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import UserSettingsC from '../widgets/ManageCompnay/index'
export default function Managecompany() {


 
  return (
    <Page title="Manange Company">
      <Box mt={4}  style={{ overflowY: "auto", maxHeight: "500px" }}>
        <Grid container spacing={2} justifyContent="center">
       
       <UserSettingsC/>
        </Grid>
      </Box>
    </Page>
  );
}
