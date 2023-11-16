import React from 'react';
import DatePicker from './DatePicaker';
import Button from '../Button/Button';

const RoomReservation = ({ roomData }) => {
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex items-center flex-row gap-1 p-4'>
                <div className='text-2xl font-semibold'>$ {roomData.price}</div>
                <div className='font-light text-neutral-600'>night</div>
            </div>
            <hr />
            <div className='flex justify-center'><DatePicker></DatePicker></div>

            <hr />
            <div className='p-4'>
                <Button label="Reserve"></Button>
            </div>
            <div className='flex p-4 flex-row items-center justify-between text-lg font-semibold'>
                <div>Total:</div>
                <div>$ {roomData.price}</div>
            </div>
        </div>
    );
};

export default RoomReservation;