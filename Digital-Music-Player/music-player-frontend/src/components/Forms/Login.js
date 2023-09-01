import React, { useRef } from "react";
import "./form.css";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Login() {
    const usernameOrEmailRef = useRef();
    const passwordRef = useRef();
    const [_, setCookies] = useCookies();

    const handleLogin = async (e) => {
        e.preventDefault();
        await axios
            .post(
                "http://localhost:8080/api/v1/users/login",
                {
                    username: usernameOrEmailRef.current.value,
                    email: usernameOrEmailRef.current.value,
                    password: passwordRef.current.value,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                console.log(response);
                if (response.data) {
                    setCookies("user", response.data);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="form-main-container">
            <div className="form-container" id="login-form">
                <h1>Login</h1>
                <form className="form-login-signup" onSubmit={handleLogin}>
                    <label htmlFor="username">Username or Email</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        ref={usernameOrEmailRef}
                        required
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <a href="/signup" id="signup-link">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
