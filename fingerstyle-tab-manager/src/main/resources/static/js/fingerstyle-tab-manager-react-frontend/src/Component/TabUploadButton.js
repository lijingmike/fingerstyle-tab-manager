import React, { useState } from "react";
import TabUploadForm from "./TabUploadForm";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import axiosCall from "../Utils/axiosCall";

export default function TabUploadButton({ tabListChanged, setTabListChanged, tunings }) {
    const [open, setOpen] = useState(false);
    const emptyFormValues = {
      title: '',
      arranger: '',
      tuning: '',
      difficulty: '',
      file: null
    }
    const [formValues, setFormValues] = useState(emptyFormValues);

    function handleOpen() {
      setOpen(true);
    }

    function handleClose() {
      setOpen(false);
    }

    function handleUpload(event) {
      event.preventDefault();
      
      // create FormData object to hold the payload for the POST request
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("tuning", formValues.tuning);
      formData.append("arranger", formValues.arranger);
      formData.append("difficulty", formValues.difficulty);
      formData.append("file", formValues.file);
      console.log(JSON.stringify(formValues));

      axiosCall('POST', 'tabs', formData, (() => {
        // collapse the form
        setOpen(false);
        // empty the form
        setFormValues(emptyFormValues);
        // notify App.js to trigger a GET request to http://localhost:8080/tabs, refreshing data in the tabTable
        setTabListChanged(!tabListChanged);
      }))
    }

    const dialogContent = (
        <div>
          <DialogTitle>Upload Tab</DialogTitle>
          <DialogContent>
            <TabUploadForm formValues={formValues} setFormValues={setFormValues} tunings={tunings} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}><CloseIcon /></Button>
            <Button onClick={handleUpload}><UploadIcon /></Button>
          </DialogActions>
        </div>
    );

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Upload A New Tab
            </Button>
            <Dialog open={open} onClose={handleClose}>
                {dialogContent}
            </Dialog>
        </div>
    );
}