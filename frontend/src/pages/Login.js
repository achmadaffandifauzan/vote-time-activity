import React from 'react';
import Navbar from '../components/Navbar';

function Login() {
  return (
    <div className='mainPage'>
    <Navbar />
    <div className="col-sm-4 offset-sm-4 text-center formContainer my-5">
    <h2 className="my-4">Login</h2>
    <form action="/login" method="POST" className="formAuth needs-validation">
        <div className="form-group mb-3">
            <label htmlFor="username" className="my-2">Username</label>
            <input type="text" className="form-control" id="username" name="username" spellCheck="false" required></input>
            <div className="invalid-feedback">
                Input username!
            </div>
        </div>
        <div className="form-group mb-3">
            <label htmlFor="password" className="my-2">Password</label>
            <input type="password" className="form-control" id="password" name="password" spellCheck="false" required></input>
            <div className="invalid-feedback">
                Input password!
            </div>
        </div>
        <button className="btn btn-success mt-4">
            Login
        </button>
    </form>
    <div className="mt-3">Don't have an account ? <a href="/register">Register</a></div>
</div>
</div>
  );
}

export default Login;