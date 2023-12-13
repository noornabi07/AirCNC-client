// room data post in to the server

export const addRoom = async roomData => {

    const response = await fetch('https://air-cnc-server-one.vercel.app/rooms', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(roomData)
    });
    const data = await response.json();
    return data;
}

// Get All Rooms
export const getAllRooms = async () => {
    const response = await fetch('https://air-cnc-server-one.vercel.app/rooms')
    const data = await response.json();
    return data;
}

// get rooms by the user email
export const getRooms = async(email) =>{
    const response = await fetch(`https://air-cnc-server-one.vercel.app/rooms/${email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
    })
    const data = await response.json();
    return data;
}

// get describes single room by the id
export const getRoom = async(id) =>{
    const response = await fetch(`https://air-cnc-server-one.vercel.app/room/${id}`)
    const data = await response.json();
    return data;
}

// delete a room by user id
export const deleteRoom = async(id) =>{
    const response = await fetch(`https://air-cnc-server-one.vercel.app/rooms/${id}`, {
        method:'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}