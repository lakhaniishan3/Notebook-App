import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const SignUp = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showCpassword, setShowCpassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:7000/api/auth/createuser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
        const json = await response.json()

        if (json.success) {
            //save the auth token and redirect page
            localStorage.setItem("token", json.AuthToken)
            navigate("/login");
            props.showAlerts("SignUp Successfully", "success ")

        } else {
            props.showAlerts("Invalid Details", "danger ")
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleCpasswordVisibility = () => {
        setShowCpassword(!showCpassword);
    };

    return (

        <div className="container my-3 p-4 rounded-5 border border-danger" style={{ width: "500px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>


            <h2 className='text-center text-primary py-3'>------------ SignUp ------------</h2>

            <form className="container border-black my-2 px-10" onSubmit={handleSubmit}>

                <label htmlFor="name" className="form-label my-2"><b>Name :</b></label>
                <input type="name" id="name" name="name" className="form-control border-black" onChange={onChange} />

                <label htmlFor="email" className="form-label my-2"><b>Email :</b></label>
                <input type="email" id="email" name="email" className="form-control border-black" onChange={onChange} />

                <label htmlFor="password" className="form-label my-2"><b>Password :</b></label>
                <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'} className="form-control border-black" id="password" name="password" onChange={onChange} minLength={5} required />
                    <button type="button" className="btn btn-success" onClick={togglePasswordVisibility} >{showPassword ? 'Hide' : 'Show'}</button>
                </div>

                <label htmlFor="cpassword" className="form-label my-2"><b>Confirm Password :</b></label>
                <div className="input-group">
                    <input type={showCpassword ? 'text' : 'password'} className="form-control border-black" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                    <button type="button" className="btn btn-success" onClick={toggleCpasswordVisibility} >{showCpassword ? 'Hide' : 'Show'}</button>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-success rounded-5 my-3"><b>Sign Up</b></button>
                </div>
            </form>

            <p className="m-3 mt-2 mb-2">
                <b>Already have account ?{" "}</b>
                <Link to={"/login"} className="text-decoration-none text-danger"><b>Login</b></Link>
            </p>
        </div >
    )
}

export default SignUp