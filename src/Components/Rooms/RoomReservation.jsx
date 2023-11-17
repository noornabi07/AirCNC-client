import React, { useContext, useState } from 'react';
import DatePicker from './DatePicaker';
import Button from '../Button/Button';
import { AuthContext } from '../../Provider/AuthProvider';
import BookingModal from '../Modal/BookingModal';
import { formatDistance } from 'date-fns'

const RoomReservation = ({ roomData }) => {
    const { user, role } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () =>{
        setIsOpen(false)
    }

    // formate distance with calculation
    const totalPrice = parseFloat(formatDistance(
        new Date(roomData.to),
        new Date(roomData.from)
        ).split(' ')[0]) * roomData.price;

    const [value, setValue] = useState({
        startDate: new Date(roomData?.from),
        endDate: new Date(roomData?.to),
        key: 'selection'
    })

        // booking state
    const [bookingInfo, setBookingInfo] = useState({
        guest: {name: user?.displayName, image: user?.photoURL, email: user?.email},
        host: roomData.host.email,
        location: roomData.location,
        price: totalPrice,
        to: value.endDate,
        from: value.startDate,
        title: roomData.title,
    })

    const handleSelect = () =>{
        setValue({...value})
    }

    const modalHandler = () =>{
        console.log(bookingInfo);
    }

    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex items-center flex-row gap-1 p-4'>
                <div className='text-2xl font-semibold'>$ {roomData.price}</div>
                <div className='font-light text-neutral-600'>night</div>
            </div>
            <hr />
            <div className='flex justify-center'><DatePicker value={value} handleSelect={handleSelect}></DatePicker></div>

            <hr />
            <div className='p-4'>
                <Button onClick={() => setIsOpen(true)} disabled={roomData.host.email === user?.email} label="Reserve"></Button>
            </div>
            <div className='flex p-4 flex-row items-center justify-between text-lg font-semibold'>
                <div>Total:</div>
                <div>$ {totalPrice}</div>
            </div>

            <BookingModal closeModal={closeModal} modalHandler={modalHandler} bookingInfo={bookingInfo} isOpen={isOpen}></BookingModal>
        </div>
    );
};

export default RoomReservation;