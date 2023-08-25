import axios from "axios";
import React, { useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const headers = {
    "Content-Type": "application/json",
};

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["user"]);

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8080/api/v1/users/login",
                {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                },
                headers
            )
            .then((response) => {
                setCookies(
                    "user",
                    JSON.stringify({ id: response.data[1], email: response.data[2] })
                );
                console.log(window.URL);
                navigate("/");
                // console.log(response.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="Login">
            <form onSubmit={handleLogin}>
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
                <button type="submit">Sign In</button>
            </form>
            <a href="/register">Don't have an account?</a>
        </div>
    );
}

export default Login;
