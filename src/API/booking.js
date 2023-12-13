// add a bookings

export const addBooking = async(bookingData) =>{
    const response = await fetch('https://air-cnc-server-one.vercel.app/bookings', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })

    const data = await response.json();
    return data;
}


// update a rooms status
export const updateStatus = async(id, status) =>{
    const response = await fetch(`https://air-cnc-server-one.vercel.app/rooms/status/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status})
    })

    const data = await response.json();
    return data;

}

// get my bookings by the user email
export const getBookings = async(email) =>{
    const response = await fetch(`https://air-cnc-server-one.vercel.app/bookings?email=${email}`)
    const bookings = await response.json();
    return bookings;
}

// get managebooking by the user email from host
export const getHostBookings = async(email) =>{
    const response = await fetch(`https://air-cnc-server-one.vercel.app/manageBookings?email=${email}`);
    const booking = await response.json();
    return booking;
}

// Delete a booking from the databse
export const deleteBooking = async id =>{
    const response = await fetch(`https://air-cnc-server-one.vercel.app/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
    
}