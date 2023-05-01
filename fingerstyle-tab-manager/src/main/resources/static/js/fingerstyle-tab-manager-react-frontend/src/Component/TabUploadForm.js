import React from "react";
import { TextField, Button, ListItemText, ListItemIcon, MenuItem } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function TabUploadForm( {formValues, setFormValues, tunings} ) {
    function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues({...formValues, [name]: value});
    }

    function handleFileChange(event) {
        setFormValues({...formValues, file: event.target.files[0]});
    }

    return (
        <div>
            <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Title"
                fullWidth
                value={formValues.title}
                onChange={handleInputChange}
            />
            <TextField
                margin="dense"
                name="arranger"
                label="Arranger"
                fullWidth
                value={formValues.arranger}
                onChange={handleInputChange}
            />
            <TextField
                margin="dense"
                name="tuning"
                label="Tuning"
                fullWidth
                value={formValues.tuning}
                onChange={handleInputChange}
                select
            >
                {tunings.map(tuning => (
                    <MenuItem key={tuning.id} value={tuning.tuningName}>
                        <ListItemText>{tuning.tuningName}</ListItemText>
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                margin="dense"
                name="difficulty"
                label="Difficulty"
                fullWidth
                value={formValues.difficulty}
                onChange={handleInputChange}
                style={{ paddingBottom: '5px' }}
                select
            >
                <MenuItem value="Beginner">
                    <ListItemText>
                        Beginner
                    </ListItemText>
                    <ListItemIcon>
                        <StarIcon fontSize="small" />
                        <StarBorderIcon fontSize="small" />
                        <StarBorderIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem value="Intermediate">
                    <ListItemText>
                    Intermediate
                    </ListItemText>
                    <ListItemIcon>
                        <StarIcon fontSize="small" />
                        <StarIcon fontSize="small" />
                        <StarBorderIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem value="Advanced">
                    <ListItemText>
                    Advanced
                    </ListItemText>
                    <ListItemIcon>
                        <StarIcon fontSize="small" />
                        <StarIcon fontSize="small" />
                        <StarIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </TextField>
            <Button variant="outlined" component="label" style={{ textTransform: 'none' }}>
                {formValues.file ? formValues.file.name : 'Upload PDF File'}
                <input
                    type="file"
                    accept="application/pdf"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
        </div>
    );
}