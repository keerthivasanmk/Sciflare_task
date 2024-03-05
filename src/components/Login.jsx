// Dependencies
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Images
import eyeOn from "../images/eye-on.svg";
import eyeOff from "../images/eye-off.svg";
import loginPattern from "../images/login-pattern.png";

export default function Home() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Form Validation logic
        let errors = {};
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
            errors.email = "Email address is invalid";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (Object.keys(errors).length === 0) {
            setErrors({});
            navigate('/dashboard');
        } else {
            setErrors(errors);
        }
    };

    return (
        <main>
            <div className="login-container">
                <div className="left">
                    <div>
                        <h1>Login</h1>
                        <form onSubmit={handleLogin}>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </div>
                            <div className="email">
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                <span
                                    className="eye-icon"
                                    onClick={() => { setIsShowPassword(!isShowPassword) }}
                                >
                                    <img src={isShowPassword ? eyeOn : eyeOff} alt={"eyeIcon"} />
                                </span>
                                {errors.password && (
                                    <div className="error">{errors.password}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="submit"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
                <div className={'right-layout'}>
                    <img src={loginPattern} alt="pattern" />
                </div>
            </div>
        </main>
    );
}