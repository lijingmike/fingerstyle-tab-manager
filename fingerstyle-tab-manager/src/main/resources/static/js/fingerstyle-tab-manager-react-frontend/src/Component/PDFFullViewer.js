import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs, PDFViewer } from "react-pdf";
import { Card, CardMedia, Dialog, DialogContent, DialogTitle, Grid, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function PDFFullViewer ({ pdfData }) {
    const [open, setOpen] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }, [])

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    const handlePreviousPage = () => {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    };
  
    const handleNextPage = () => {
      if (pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    };
  
    
    return (
      <div>
        <Card>
          <CardMedia
            className="pdfviewer--media"
            image={`data:application/pdf;base64,${pdfData}`}
            title="PDF Thumbnail"
            onClick={handleOpen}
          />
        </Card>
  
        <Dialog
          fullWidth
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          aria-labelledby="pdf-viewer-dialog"
          classes="pdfviewer--dialogpaper"
        >
          <DialogTitle
            id="pdf-viewer-dialog"
            className="pdfviewer--dialogtitle"
          >
            PDF Viewer
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className="pdfviewer--dialogcontent">
            <Document
              file={`data:application/pdf;base64,${pdfData}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                pageNumber={pageNumber}
                scale={1.5}
                className="pdfviewer--page"
              />
            </Document>
          </DialogContent>
        </Dialog>
      </div>
    )
}