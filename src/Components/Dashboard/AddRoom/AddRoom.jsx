import React, { useState } from 'react';
import AddRoomForm from '../../Form/AddRoomForm';

const AddRoom = () => {
    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

    const handleSubmit = event =>{
        event.preventDefault()
        setLoading(true)
        const form = event.target;
        const location = form.location.value;
        const title = form.title.value;
        const from = dates.starDate;
        const to = dates.endDate;
        const price = form.price.value;
        const total_guest = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const category = form.category.value;

        const image = event.target.image.files[0];

        console.log(location);
    }

    const handleImageChange = image =>{
        setUploadButtonText(image.name);
    }
    return (
        <AddRoomForm handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} uploadButtonText={uploadButtonText}></AddRoomForm>
    );
};

export default AddRoom;