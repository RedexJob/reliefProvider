// styled components
import { Header } from "@components/Widget/style";
import React from "react";
// components
import Widget from "@components/Widget";
import WidgetBody from "@components/Widget/WidgetBody";
import DeleteIcon from "@mui/icons-material/Delete";
// hooks
import { useState, useRef, useEffect } from "react";
import useGenderFilter from "@hooks/useGenderFilter";
import InfiniteScroll from "react-infinite-scroll-component";
// data placeholder
import { patients } from "@db/patients";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Appoiment() {
  return (
    <>
      <Widget name="PatientsList">
        <WidgetBody style={{ padding: 0 }}>
          <Typography variant="h6" style={{marginLeft:'15px'}} >Appointment Types</Typography>
          <div className="card-body">
            <Table sx={{ minWidth: 650 }} className="table table-bordered">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 150, maxWidth: "25%" }}>
                    <TableSortLabel active={false} direction="asc">
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={false} direction="asc">
                      Length (in minutes)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>W</TableCell>
                  <TableCell>5</TableCell>

                  <TableCell>
                    <Button variant="contained" color="success">
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                        variant="outlined"
                        style={{ color: "red", marginLeft: "5px" }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <br />
          </div>
        </WidgetBody>
      </Widget>
    </>
  );
}

export default Appoiment;
