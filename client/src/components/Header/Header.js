import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

function Header(){
   return(
      <header className="header">
         <nav className="header__nav">
            <Link to="/" className="link">
               <p className="nav__homepage">Home</p>
            </Link>
            <Link to="/location" className="link">
               <p className="nav__location">Location</p>
            </Link>

            <div className="nav__wrapper">
               <p className="nav__username">
                  User Name
               </p>
               <div className="nav__user-wrap-photo">
                  <img src=" " alt=" " className="nav__user-photo"/>
               </div>
            </div>
         </nav>
      </header>
   )
}
export default Header;