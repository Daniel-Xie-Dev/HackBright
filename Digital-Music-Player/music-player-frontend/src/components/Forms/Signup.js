import React, { useRef } from "react";
import "./form.css";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [_, setCookies] = useCookies();

    const handleSignup = async (e) => {
        e.preventDefault();

        await axios
            .post(
                "http://localhost:8080/api/v1/users/register",
                {
                    username: usernameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                },
                { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                if (response.data) {
                    setCookies("user", response.data);
                }
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="form-main-container">
            <div className="signup form-container">
                <h1>Sign Up</h1>
                <form className="form-login-signup" onSubmit={handleSignup}>
                    <label for="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        ref={usernameRef}
                        required
                    />
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
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
                    {/* <label for="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required /> */}
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Have an account?{" "}
                    <a href="/login" id="login-link">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
}
