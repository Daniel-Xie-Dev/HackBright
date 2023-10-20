import React, { useRef } from "react";
import "./searchbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
    const searchParamRef = useRef();
    const navigate = useNavigate();

    const handleKey = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const value = searchParamRef.current.value;
        searchParamRef.current.value = "";
        navigate(`/search/result/search/${value}`);
    };

    return (
        <div className="searchbar">
            <div class="input-box">
                <input
                    type="text"
                    placeholder="Search Music, Artists, Albums..."
                    list="music-list"
                    ref={searchParamRef}
                    onKeyDown={handleKey}
                />
                {/* <datalist id="music-list">
                    <option value="Taylor Swift">Taylor Swift</option>
                    <option value="Pokemon">Pokemon</option>
                </datalist> */}
                <button class="button" onClick={handleSearch}>
                    <span>
                        <AiOutlineSearch />
                    </span>
                </button>
            </div>
        </div>
    );
}
