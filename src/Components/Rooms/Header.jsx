import React from 'react';
import Heading from '../Heading/Heading';

const Header = () => {
    return (
        <div>
            <Heading title="Valuvana Bali - Owl Bambo House" subtitle="Sidemen, Indonesia" center={false}></Heading>

            <div className='w-full md:h-[70vh] pt-4 overflow-hidden rounded-xl'>
                <img className='rounded-xl object-cover w-full' src="https://a0.muscache.com/im/pictures/4f70b681-a792-4530-8c52-f2a8d262942d.jpg" alt="header image" />
            </div>
        </div>

    );
};

export default Header;