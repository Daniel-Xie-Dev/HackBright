import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useCookies } from "react-cookie";

function User() {
    const [cookies, setCookies] = useCookies(["user"]);

    const handleUserClick = (e) => {
        e.preventDefault();
        if (!cookies.user) {
            window.location.href = "/login";
        }
    };

    const handleLogout = (e) => {
        setCookies("user", "");
        // console.log(Cookies.get("user"));
    };
    return (
        <div className="User" onClick={handleUserClick}>
            <Dropdown>
                <Dropdown.Toggle as={ButtonGroup} id="user-dropdown">
                    <PersonCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Tracks</Dropdown.Item>
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>History</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default User;
