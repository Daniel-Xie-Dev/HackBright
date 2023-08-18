import React from "react";
import "./SearchInput.css";
import Button from "react-bootstrap/Button";
import { Search } from "react-bootstrap-icons";

function SearchInput() {
    return (
        <div className="SearchInput">
            <input
                className="InputTag"
                placeholder="Search music, artists, and more!"
            ></input>
            <Button>
                <Search></Search>
            </Button>
        </div>
    );
}

export default SearchInput;
