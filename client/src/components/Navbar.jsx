import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className='Navbar_container'>
        <div className='links'>
          <Link className='link link_all' to={'/'}>ALL</Link>
          <Link className='link' to={'/People'}>People</Link>
          <Link className='link' to={'/Animal'}>Animal</Link>
          <Link className='link' to={'/Nature'}>Nature</Link>
          <Link className='link' to={'/Technology'}>Technology</Link>
          <Link className='link' to={'/Transport'}>Transport</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
