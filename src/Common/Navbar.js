import React from 'react';
import {Link} from 'react-router-dom';
import Ecart from '../Components/Ecart';
import './Navbar.css';

function Navbar(){
    return(
        <div className="header">
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="nav-container">
                    <Link to="/" className="navbar-brand">
                        <span>Ecommerce Books</span>
                    </Link>
                </div>
                <div className="nav pull-right cart">
                    <Link to="/cart" className="activity-btn">
                        <span>Ecart</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;