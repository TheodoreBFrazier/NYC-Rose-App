import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


import { Icon, TextField } from "@mui/material";

import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

var textFieldStyle = {
    width: '350px'
}



const API = process.env.REACT_APP_API_URL;

const SearchBar = () => {

    const [resources, setResources] = useState([])

    useEffect(() => {
        axios.get(API + "/resources")
            .then((response) => {
                console.log(response)
                setResources(response.data.result);
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const [searchInput, setSeachInput] = useState("")

    const handleChange = (event) => {
        event.preventDefault()
        setSeachInput(event.target.value)
    };

    if (searchInput.length > 0) {
        resources.filter((resource) => {
            return resource.resource_category.match(searchInput)
        })
    }

    return (
        <div className="resources-searchbar">
            <TextField
                style={textFieldStyle}
                id="filled_basic"
                label="Search"
                type="search"
                placeholder="Search here"
                onChance={handleChange}
                value={searchInput}

                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>
                        </InputAdornment>
                    )

                }}


            />

        </div>
    )
}

export default SearchBar