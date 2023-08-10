import React from "react";
import Navbar from '../components/Navbar';

function Register() {
    return (
        <div className='mainPage'>
            <Navbar />
            <div className="col-sm-4 offset-sm-4 text-center formContainer my-5">
                <h2 className="my-4">Register</h2>
                <form action="/register" method="POST" className="needs-validation formAuth" >
                    <div className="form-group mb-3">
                        <label for="name" className="my-2">Name</label>
                        <input type="text" className="form-control" id="name" name="user[name]" spellCheck="false" required></input>
                        <div className="invalid-feedback">
                            Add your name!
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label for="email" className="my-2">Email</label>
                        <input type="email" className="form-control" id="email" name="user[email]" spellCheck="false" required></input>
                        <div className="invalid-feedback">
                            Add email!
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label for="username" className="my-2">Username</label>
                        <input type="text" className="form-control" id="username" name="user[username]" spellCheck="false" required></input>
                        <div className="invalid-feedback">
                            Add username!
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label for="password" className="my-2">Password</label>
                        <input type="password" className="form-control" id="password" name="user[password]" spellCheck="false" required></input>
                        <div className="invalid-feedback">
                            Add password!
                        </div>
                    </div>
                    <button className="btn btn-success mt-3">
                        Register
                    </button>
                    <div className="mt-3">Already have an account ? <a href="/login">Login</a></div>
                </form>
            </div>
        </div>
    )
}

export default Register;