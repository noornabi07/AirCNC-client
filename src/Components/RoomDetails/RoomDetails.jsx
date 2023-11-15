import React, { useEffect, useState } from 'react';
import Container from '../Shared/Container';
import Header from '../Rooms/Header';
import RoomInfo from '../Rooms/RoomInfo';
import RoomReservation from '../Rooms/RoomReservation';
import { useLoaderData } from 'react-router-dom';

const RoomDetails = () => {
    const roomData = useLoaderData();
    console.log(roomData);
    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <Header roomData={roomData}></Header>
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        <RoomInfo roomData={roomData}></RoomInfo>
                        <div className='mb-10 md:col-span-3 order-first md:order-last'>
                            <RoomReservation roomData={roomData}></RoomReservation>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default RoomDetails;