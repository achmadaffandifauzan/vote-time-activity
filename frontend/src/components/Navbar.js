import React from 'react';

const Navbar = () => {
    return (
        <nav id="nav" className="navbar navbar-expand-lg py-3 navbar-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand my-0 py-0" href="/movies">
                    <img src="/icons/3.svg" alt="Logo" height="35px" className="d-inline-block align-text-center"></img>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon color-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto">
                        <a className="nav-link navMenu" href="/movies">Home</a>
                    </div>
                    <div className="navbar-nav ms-auto">

                        <a className="nav-link navAuth" href="/login">
                            <span className="material-symbols-rounded me-1">
                                login
                            </span>
                            <span className="spanMaterialSymbol me-3">Login</span>
                        </a>
                        <a className="nav-link navAuth" href="/register">
                            <span className="material-symbols-rounded me-1">
                                app_registration
                            </span>
                            <span className="spanMaterialSymbol me-3">Register</span>
                        </a>
                        <a className="nav-link m-auto navAuth" href="/logout">
                            <span className="material-symbols-rounded me-1">
                                logout
                            </span>
                            <span className="spanMaterialSymbol me-3">Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;