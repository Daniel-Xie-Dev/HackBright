import React from "react";
import Button from "react-bootstrap/Button";

import { BootstrapFill } from "react-bootstrap-icons/";

function HomeButton() {
    return (
        <div className="HomeButton">
            <Button as={"a"} variant="primary">
                <BootstrapFill />
            </Button>
        </div>
    );
}

export default HomeButton;
