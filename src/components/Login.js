import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:7000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            //save the auth token and redirect page
            localStorage.setItem("token", json.AuthToken)
            props.showAlerts("Login Successfully", "success ")
            navigate("/");

        } else {
            props.showAlerts("Invalid Credentials", "danger")
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (

        <div className="container my-3 p-4 rounded-5 border border-danger" style={{ width: "500px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

            <h2 className='text-center text-primary py-3'>------------- Login -------------</h2>

            <form className="container border-black my-2 px-10" onSubmit={handleSubmit}>

                <label htmlFor="email" className="form-label my-2"><b>Email :</b></label>
                <input type="email" id="email" name="email" className="form-control border-black" value={credentials.email} onChange={onChange} />

                <label htmlFor="password" className="form-label my-2"><b>Password :</b></label>
                <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'} className="form-control border-black" id="password" name="password" value={credentials.password} onChange={onChange} />
                    <button type="button" className="btn btn-success" onClick={togglePasswordVisibility} >{showPassword ? 'Hide' : 'Show'}</button>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-success rounded-5 my-3"><b>Login</b></button>
                </div>
            </form>

            <p className="m-3 mt-2 mb-2">
                <b>Don't have account ?{" "}</b>
                <Link to={"/signup"} className="text-decoration-none text-danger"><b>SignUp</b></Link>
            </p>
        </div >
    )
}

export default Login