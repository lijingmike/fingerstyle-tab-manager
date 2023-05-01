import { Button } from "@mui/material";
import axiosCall from "../Utils/axiosCall";

export default function TabDeleteButton({ id, tabListChanged, setTabListChanged }) {

    function handleDelete() {
        axiosCall('DELETE', `tabs/${id}`, null, (() => {
            // notify App.js to trigger a GET request to http://localhost:8080/tabs, refreshing data in the tabTable
            setTabListChanged(!tabListChanged);
        }))
    }

    return (
        <Button className="custom-button" variant="contained" color="secondary" onClick={handleDelete} >
            Delete
        </Button>
    )
}