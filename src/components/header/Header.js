import React, { useState } from "react";
import { Select, MenuItem } from '@mui/material';
import './header.css';

function Header({ onValueChange }) {
    const [valueSelected, setValueSelected] = useState("Table");

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setValueSelected(value);
        onValueChange(value);
    }

    return (
        <div className="header">
            <div className='header-title flex-start'>
                <Select
                    variant="outlined"
                    fullWidth
                    value={valueSelected}
                    onChange={handleSelectChange}
                >
                    <MenuItem value={"Table"}>Table</MenuItem>
                    <MenuItem value={"Event"}>Event</MenuItem>
                    <MenuItem value={"Course"}>Course</MenuItem>
                    <MenuItem value={"Ticket"}>Ticket</MenuItem>
                </Select>
            </div>
        </div>
    );
}

export default Header;
