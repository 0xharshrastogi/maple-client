import React from 'react';
import logo from '../../assets/img/logo.svg';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-3 px-2 navbar md:px-9">
      <h3 className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-12 sm:h-14" />
        <span className="text-2xl sm:text-4xl text-red-600 font-bold">Mapple</span>
      </h3>
      <div className="space-x-3 sm:space-x-10">
        <Button>Login</Button>
        <Button type="secondary">Signup</Button>
      </div>
    </nav>
  );
};

export default Navbar;
