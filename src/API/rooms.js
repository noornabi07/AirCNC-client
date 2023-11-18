// room data post in to the server

export const addRoom = async roomData => {

    const response = await fetch('http://localhost:5000/rooms', {
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
    const response = await fetch('http://localhost:5000/rooms')
    const data = await response.json();
    return data;
}

// get rooms by the user email
export const getRooms = async(email) =>{
    const response = await fetch(`http://localhost:5000/rooms/${email}`)
    const data = await response.json();
    return data;
}

// get describes single room by the id
export const getRoom = async(id) =>{
    const response = await fetch(`http://localhost:5000/room/${id}`)
    const data = await response.json();
    return data;
}

// delete a room by user id
export const deleteRoom = async(id) =>{
    const response = await fetch(`http://localhost:5000/rooms/${id}`, {
        method:'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}