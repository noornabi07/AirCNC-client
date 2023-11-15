import React from 'react';
import Heading from '../Heading/Heading';

const Header = ({roomData}) => {
    return (
        <div>
            <Heading title={roomData.title} subtitle={roomData.location} center={false}></Heading>

            <div className='w-full md:h-[70vh] pt-4 overflow-hidden rounded-xl'>
                <img className='rounded-xl object-cover w-full' src={roomData.image} alt="header image" />
            </div>
        </div>

    );
};

export default Header;