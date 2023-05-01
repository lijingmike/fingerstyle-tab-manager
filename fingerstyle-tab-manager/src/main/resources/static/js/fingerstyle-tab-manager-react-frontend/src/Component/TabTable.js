import React from "react";
import PDFPreview from "./PDFPreview";
import PDFFullViewer from "./PDFFullViewer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TabDeleteButton from "./TabDeleteButton";
import { Button } from "@mui/material";
import TabTableDifficultyIntoStarArray from "./TabTableDifficultyIntoStarArray";

export default function TabTable({ tabs, tabListChanged, setTabListChanged }){

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Arranger</TableCell>
                <TableCell align="left">Tuning</TableCell>
                <TableCell align="left">Upload Date</TableCell>
                <TableCell align="left">Difficulty</TableCell>
                <TableCell align="left">Preview</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tabs.map((tab) => (
                <TableRow
                  key={tab.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tab.id}
                  </TableCell>
                  <TableCell>
                    <div className="button-container">
                      <Button variant="contained" color="secondary">Edit</Button>
                    </div>
                    <div>
                      <Button variant="contained" color="secondary">View Details</Button>
                      <TabDeleteButton id={tab.id} tabListChanged={tabListChanged} setTabListChanged={setTabListChanged} />
                    </div>
                  </TableCell>
                  <TableCell align="left">{tab.title}</TableCell>
                  <TableCell align="left">{tab.arranger}</TableCell>
                  <TableCell align="left">{tab.tuning.tuningName}</TableCell>
                  <TableCell align="left">{tab.uploadDate}</TableCell>
                  {/* <TableCell align="left">{tab.difficulty}</TableCell> */}
                  <TableCell align="left"><TabTableDifficultyIntoStarArray difficulty={tab.difficulty} /></TableCell>
                  <TableCell align="left"><PDFPreview pdfData = {tab.pdfContent} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }