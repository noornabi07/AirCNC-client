import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import MenuDropdown from './MenuDropdown';

const Navbar = () => {
    return (
        <div className='bg-white w-full fixed z-10 shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className='flex justify-between items-center gap-3 md:gap-3 flex-row'>
                        <Logo></Logo>
                        <Search></Search>
                        <MenuDropdown></MenuDropdown>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;