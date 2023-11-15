// room data post in to the server

export const addRoom = async roomData=>{

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