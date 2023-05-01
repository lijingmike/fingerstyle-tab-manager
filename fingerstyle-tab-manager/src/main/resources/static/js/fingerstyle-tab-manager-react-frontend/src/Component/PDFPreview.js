import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs, PDFViewer } from "react-pdf";
import { Card, CardMedia, Dialog, DialogContent, DialogTitle, Grid, IconButton, Modal, makeStyles } from "@mui/material";

export default function PDFPreview({ pdfData }) {
    const [open, setOpen] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function handleClose() {
        setOpen(false);
    };

    function handleOpen() {
        setOpen(true);
    };

    function onDocumentLoadSuccess({ numPages, page }) {
        setNumPages(numPages);
    }

    // configure the worker script file for pdfjs from CDN and allow pdf to be rendered properly
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    return (
        // <div>
        //     <Card onClick={handleOpen}>
        //         <Document file={`data:application/pdf;base64, ${pdfData}`} pageLayout='twoPageLeft' onLoadSuccess={onDocumentLoadSuccess}>
        //             <Page pageNumber={pageNumber} size='A8' wrap={false}/>
        //         </Document>
        //         <p>Page {pageNumber} of {numPages}</p>
        //         <button onClick={() => setPageNumber(pageNumber + 1)}>Next page</button>
        //     </Card>
        //     <Modal open={open} onClose={handleClose}>
        //     <div>
        //         <p>PDF content</p>
        //     </div>
        //     </Modal>
        // </div>
        <Card onClick={handleOpen} >
            <Document file={`data:application/pdf;base64, ${pdfData}`} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} scale={0.264583333} width={909} height={1287} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
        </Card>
    );
}