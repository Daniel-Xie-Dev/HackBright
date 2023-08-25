import axios from "axios";
import React, { useRef } from "react";

const headers = {
    "Content-Type": "application/json",
};

function Register() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleRegister = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8080/api/v1/users/register",
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                },
                headers
            )
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    };

    return (
        <div className="Register">
            <form onSubmit={handleRegister}>
                <label>Email: </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    ref={emailRef}
                ></input>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    ref={passwordRef}
                ></input>
                <button type="submit">Sign Up</button>
            </form>

            <a href="/login">Already have an account?</a>
        </div>
    );
}

export default Register;
