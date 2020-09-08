import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav style={{ marginBottom: '30px' }} className='black'>
            <div className="nav-wrapper">
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><Link to='login'>Login</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
