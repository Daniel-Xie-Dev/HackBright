import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

function User() {
    return (
        <div className="User">
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
                    <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default User;
