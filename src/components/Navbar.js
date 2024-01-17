import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/login');
    }


    // use highlight active page 
    let location = useLocation();   

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-2 rounded-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link> 
                        </li>
                    </ul>


                    {!localStorage.getItem("token") ? <form className="d-flex">
                        <Link className="btn btn-success mx-1 rounded-3" aria-label="Login button" to="/login">
                            <b>Login</b>
                        </Link>
                        <Link className="btn btn-primary mx-1 rounded-3" aria-label="Signup button" to="/signup">
                            <b>SignUp</b>
                        </Link>
                    </form>
                        :
                        <button className="btn btn-danger mx-1 rounded-3" aria-label="Logout button" onClick={handleLogout}><b>Logout</b></button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
  