import React from "react";
import logo from '../images/header-logo.svg'

export default function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <div>
          <img className="header__logo" src={logo} alt="Лого Mesto"/>
        </div>
        <div className="header__right">
          {props.email && <div className="header__email">{props.email}</div>}
          <div className="header__button">
            {props.children}
          </div>
        </div>
      </div>
      <div className="header__line"></div>
    </header>
  );
}
