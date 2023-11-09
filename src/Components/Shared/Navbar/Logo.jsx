import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/logo.png'

const Logo = () => {
    return <Link to="/"><img className='hidden md:block' src={logoImg} width='100' height="100" alt="logo img" /></Link>
};

export default Logo;